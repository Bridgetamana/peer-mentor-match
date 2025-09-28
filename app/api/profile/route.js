import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { auth } from "@/auth"

function normalizeProfile(body) {
    const role = body?.role === "tutor" ? "tutor" : body?.role === "learner" ? "learner" : undefined
    if (!role) return null
    return { role, completed: true }
}

export async function GET() {
    const session = await auth()
    if (!session) return NextResponse.json({ profile: null }, { status: 401 })

    const cookie = cookies().get("pm_profile")
    if (!cookie) return NextResponse.json({ profile: null }, { status: 200 })
    try {
        const stored = JSON.parse(cookie.value)
        if (stored.uid && stored.uid !== session.user?.id) {
            return NextResponse.json({ profile: null }, { status: 200 })
        }
        const { uid, ...profile } = stored
        return NextResponse.json({ profile }, { status: 200 })
    } catch {
        return NextResponse.json({ profile: null }, { status: 200 })
    }
}

export async function POST(request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Basic CSRF protection: ensure same-origin POSTs
        const origin = request.headers.get('origin')
        const { origin: selfOrigin } = new URL(request.url)
        if (origin && origin !== selfOrigin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 })
        }

        const body = await request.json()
        const normalized = normalizeProfile(body)
        if (!normalized) {
            return NextResponse.json({ error: "Invalid profile payload" }, { status: 400 })
        }

        const existing = cookies().get("pm_profile")
        if (existing?.value) {
            try {
                const parsed = JSON.parse(existing.value)
                if (parsed?.completed && parsed?.uid === session.user.id && parsed?.role !== normalized.role) {
                    return NextResponse.json({ error: "Profile already completed" }, { status: 409 })
                }
            } catch { }
        }

        const toStore = { ...normalized, uid: session.user.id }
        const res = NextResponse.json({ ok: true, profile: normalized })
        res.cookies.set("pm_profile", JSON.stringify(toStore), {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 180,
            secure: process.env.NODE_ENV === "production",
        })
        return res
    } catch (e) {
        return NextResponse.json({ error: "Bad Request" }, { status: 400 })
    }
}
