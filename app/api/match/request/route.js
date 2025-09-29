import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const me = await prisma.userProfile.findFirst({ where: { email: session.user.email }, select: { role: true } })
    if (me?.role !== 'learner') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    const { tutorEmail, subject, note } = body || {}
    if (!tutorEmail || typeof tutorEmail !== 'string') return NextResponse.json({ error: 'tutorEmail required' }, { status: 400 })

    const tutor = await prisma.userProfile.findFirst({ where: { email: tutorEmail }, select: { role: true } })
    if (!tutor || tutor.role !== 'tutor') return NextResponse.json({ error: 'Invalid tutor' }, { status: 400 })

    const reqItem = await prisma.matchRequest.create({
      data: { learnerEmail: session.user.email, tutorEmail, subject: subject || null, note: note || null },
    })
    return NextResponse.json({ request: reqItem }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const box = searchParams.get('box') || 'incoming'

    if (!prisma.matchRequest) {
      return NextResponse.json({ error: 'Prisma client is out of date. Please run prisma generate and restart the dev server.' }, { status: 500 })
    }

    let where
    if (box === 'incoming') where = { tutorEmail: session.user.email }
    else if (box === 'outgoing') where = { learnerEmail: session.user.email }
    else return NextResponse.json({ error: 'Invalid box' }, { status: 400 })

    const items = await prisma.matchRequest.findMany({ where, orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ requests: items }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
