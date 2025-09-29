import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function GET() {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ connections: [] }, { status: 401 })

    const email = session.user.email
    const cons = await prisma.connection.findMany({
        where: { OR: [{ learnerEmail: email }, { tutorEmail: email }] },
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ connections: cons }, { status: 200 })
}
