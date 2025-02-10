import { db } from "~/server/db";
import { compare } from "bcrypt-ts";
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { Agency, Role } from "@prisma/client";
declare module "next-auth" {
  interface Session {
    user: {
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
      role: Role | unknown;
      id?: string;
      agency: Agency;
    } & DefaultSession["user"];
  }
}

const getUserByEmail = async (email: string) => {
  return await db.user.findFirst({ where: { email } });
};

const providers = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "email", type: "text", placeholder: "jsmith@yopmail.com" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials.password) {
      throw new Error("Email or Password Missing");
    }

    const user = await getUserByEmail(credentials.email);

    if (!user) {
      throw new Error("No user found");
    }

    const match = await compare(credentials.password, user.password ?? "");
    if (!match) {
      throw new Error("Invalid credentials.");
    }
    return user;
  },
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [providers],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.email) {
          session.user.email = token.email;
        }
        if (token.role) {
          session.user.role = token.role;
        }
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.agency = token.agency as Agency;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
        include: { agency: true },
      });

      if (!dbUser) return token;

      token.name = dbUser.firstname + " " + dbUser.lastname;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.role = dbUser.role;
      token.agency = dbUser.agency;
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
  logger: {
    // error(code, metadata) {
    //   console.error(code, metadata);
    // },
    // warn(code) {
    //   console.warn(code);
    // },
    // debug(code, metadata) {
    //   console.debug(code, metadata);
    // },
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
