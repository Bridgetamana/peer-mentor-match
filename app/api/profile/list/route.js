import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function GET(request) {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ profiles: [] }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    if (!role || !['learner', 'tutor'].includes(role)) {
        return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    const profiles = await prisma.userProfile.findMany({
        where: { role },
        select: { userId: true, role: true, completed: true, data: true },
        orderBy: { userId: 'asc' }
    })

    return NextResponse.json({ profiles })
}
