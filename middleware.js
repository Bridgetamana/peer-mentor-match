export { auth as middleware } from "@/auth"
export const config = {
  matcher: [
    "/onboarding/:path*",
    "/dashboard/:path*",
  ],
}