
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { InvalidAccountActive, InvalidEmailPasswordError } from "./utils/error";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: "http://localhost:8000/api/v1/auth/login",
          body: {
            username: credentials.email,
            password: credentials.password
          }
        })

        if (!res.statusCode) {
          return {
            _id:res.data?.user?._id,
            name:res.data?.user?.name,
            email:res.data?.user?.email,
            access_token:res.data?.access_token
          }
        }

        else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError()
        }

        else if (res.statusCode === 400) {
          throw new InvalidAccountActive()
        } else {
          return {
            error: "Internal server error",
            code: 0
          }
        }


      },
    }),

  ],
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.user = (user as IUser)
      }
      return token
    },
    session({ session, token }) {
      (session.user as IUser) = token.user
      return session
    },
  },
})