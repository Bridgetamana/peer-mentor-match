import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function POST(_req, { params }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const id = Number(params.id)
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const item = await prisma.matchRequest.findUnique({ where: { id } })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (item.tutorId !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (item.status !== 'pending') return NextResponse.json({ error: 'Not pending' }, { status: 400 })

    const updated = await prisma.matchRequest.update({ where: { id }, data: { status: 'rejected' } })
    return NextResponse.json({ request: updated }, { status: 200 })
  } catch (e) {

    return NextResponse.json({ error: 'Internal error', detail: process.env.NODE_ENV !== 'production' ? String(e?.message || e) : undefined }, { status: 500 })
  }
}
