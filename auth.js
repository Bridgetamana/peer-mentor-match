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
        jwt({ token }) {
            return token
        },
        session({ session, token }) {
            if (session.user) session.user.id = token.sub
            return session
        },
    },
})