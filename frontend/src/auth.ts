
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { pages } from "next/dist/build/templates/app-page";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(">>check",credentials);
        
        let user = null

        // user={
        //   _id:"123",
        //   username:"tuan",
        //   email:"tuan@gmail.com",
        //   isVerify:"1",
        //   type:"cc",
        //   role:"cc"
        // }
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with their profile data
        return user
      },
    }),

  ],
  pages:{
    signIn:"/auth/login"
  }
})