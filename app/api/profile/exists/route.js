import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function GET() {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ profile: null }, { status: 401 })

    const userId = session.user.id
    const profile = await prisma.userProfile.findUnique({
        where: { userId },
        select: { role: true, completed: true },
    })

    return NextResponse.json({ profile: profile ?? null }, { status: 200 })
}
