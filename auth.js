import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import "next-auth/jwt"

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: !!process.env.AUTH_DEBUG,
    providers: [
        Google
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: { strategy: "jwt" },
    callbacks: {
        jwt({ token, user }) {
            if (user) { 
                token.id = user.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id
            return session
        },
    },
})