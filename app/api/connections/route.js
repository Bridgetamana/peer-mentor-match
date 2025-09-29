import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ connections: [] }, { status: 401 })

  const uid = session.user.id
  const cons = await prisma.connection.findMany({
    where: { OR: [{ learnerId: uid }, { tutorId: uid }] },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json({ connections: cons }, { status: 200 })
}
