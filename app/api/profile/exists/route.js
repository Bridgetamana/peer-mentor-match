import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function GET() {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ profile: null }, { status: 401 })

    const profile = await prisma.userProfile.findFirst({
        where: { email: session.user.email },
        select: { role: true, completed: true },
    })

    return NextResponse.json({ profile: profile ?? null }, { status: 200 })
}
