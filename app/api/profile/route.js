import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

function normalizeProfile(body) {
    const role = body?.role === "tutor" ? "tutor" : body?.role === "learner" ? "learner" : undefined
    if (!role) return null
    return { role, completed: true }
}

export async function GET() {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ profile: null }, { status: 401 })

    const userId = session.user.id
    const db = await prisma.userProfile.findUnique({
        where: { userId },
        select: { role: true, completed: true },
    })
    if (!db) return NextResponse.json({ profile: null }, { status: 200 })

    const res = NextResponse.json({ profile: db }, { status: 200 })
    res.cookies.set("pm_profile", JSON.stringify({ ...db, uid: userId }), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 180,
        secure: process.env.NODE_ENV === "production",
    })
    return res
}

export async function POST(request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

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

        const existing = await prisma.userProfile.findUnique({ where: { userId: session.user.id }, select: { role: true, completed: true } })
        if (existing?.completed && existing.role !== normalized.role) {
            return NextResponse.json({ error: "Profile already completed" }, { status: 409 })
        }

        await prisma.userProfile.upsert({
            where: { userId: session.user.id },
            create: { userId: session.user.id, role: normalized.role, completed: true, data: body },
            update: { role: normalized.role, completed: true, data: body },
        })

        const res = NextResponse.json({ ok: true, profile: normalized })
        res.cookies.set("pm_profile", JSON.stringify({ ...normalized, uid: session.user.id }), {
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
