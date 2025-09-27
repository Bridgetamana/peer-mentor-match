import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: process.env.NODE_ENV !== "production",
    providers: [
        Google
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl + "/onboarding"
        },
        async session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub
            }
            return session
        },
    },
})