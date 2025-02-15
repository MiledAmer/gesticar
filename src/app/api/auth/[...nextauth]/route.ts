import { authOptions } from "~/server/auth";
import NextAuth from "next-auth";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = NextAuth(authOptions) as NextApiHandler;

export { handler as GET, handler as POST };
