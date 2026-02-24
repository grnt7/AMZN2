import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // 1. Ensure the names match your .env / Vercel keys exactly
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,      // Changed from GOOGLE_CLIENT_ID
      clientSecret: process.env.GOOGLE_SECRET, // Changed from GOOGLE_CLIENT_SECRET
    }),
  ],
  
  // 2. YOU MUST ADD THIS LINE TO FIX THE [NO_SECRET] ERROR
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)