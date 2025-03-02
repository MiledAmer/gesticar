import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (token) return true;
      return true;
    },
  },
});
export const config = {
  matcher: ["/((?!login).*)"],
};
