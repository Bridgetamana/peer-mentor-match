import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth(async function middleware(req) {
  const { nextUrl, cookies } = req
  const isOnboarding = nextUrl.pathname.startsWith("/onboarding")
  const isDashboard = nextUrl.pathname.startsWith("/dashboard")
  if (!req.auth && (isOnboarding || isDashboard)) {
    const url = new URL("/auth/signin", nextUrl)
    url.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search)
    return NextResponse.redirect(url)
  }
  let profile
  const cookie = cookies.get("pm_profile")
  if (cookie?.value) {
    try {
      const parsed = JSON.parse(cookie.value)
      if (parsed?.uid && req.auth?.user?.id && parsed.uid === req.auth.user.id) {
        profile = { role: parsed.role, completed: parsed.completed }
      }
    } catch { }
  }

  if (isOnboarding && profile?.completed) {
    const target = profile.role === "tutor" ? "/dashboard/tutor" : "/dashboard/learner"
    return NextResponse.redirect(new URL(target, nextUrl))
  }

  if (isDashboard && !profile?.completed) {
    return NextResponse.redirect(new URL("/onboarding", nextUrl))
  }

  if (isDashboard && profile?.completed) {
    const wantsTutor = nextUrl.pathname.startsWith("/dashboard/tutor")
    const wantsLearner = nextUrl.pathname.startsWith("/dashboard/learner")
    if (wantsTutor && profile.role !== "tutor") {
      return NextResponse.redirect(new URL("/dashboard/learner", nextUrl))
    }
    if (wantsLearner && profile.role !== "learner") {
      return NextResponse.redirect(new URL("/dashboard/tutor", nextUrl))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/onboarding/:path*",
    "/dashboard/:path*",
  ],
}