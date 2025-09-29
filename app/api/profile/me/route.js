import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function GET() {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ profile: null }, { status: 401 })
    const profile = await prisma.userProfile.findUnique({
        where: { userId: session.user.id },
        select: { role: true, completed: true, data: true },
    })
    return NextResponse.json({ profile }, { status: 200 })
}