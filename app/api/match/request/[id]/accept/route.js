import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function POST(_req, { params }) {
  try {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const id = Number(params.id)
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const item = await prisma.matchRequest.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (item.tutorEmail !== session.user.email) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (item.status !== 'pending') return NextResponse.json({ error: 'Not pending' }, { status: 400 })

    const updated = await prisma.$transaction(async (tx) => {
      const req = await tx.matchRequest.update({ where: { id }, data: { status: 'accepted' } })
      await tx.connection.upsert({
        where: { learnerEmail_tutorEmail: { learnerEmail: item.learnerEmail, tutorEmail: item.tutorEmail } },
        create: { learnerEmail: item.learnerEmail, tutorEmail: item.tutorEmail },
        update: {},
      })
      return req
    })

    return NextResponse.json({ request: updated }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
