import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: ({ user }) => {
      if (
        user.email !== "j.moya.jt@gmail.com" &&
        user.email !== "keilly95.kegv@gmail.com"
      ) {
        return false;
      }

      return true;
    },
  },
};
