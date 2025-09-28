"use server"

import { signIn, signOut } from "@/auth"
import { redirect } from "next/navigation"

export async function googleSignIn() {
    await signIn("google", { redirectTo: "/onboarding" })
}

export async function logout() {
    await signOut({ redirect: false }) 
    redirect("/")
}