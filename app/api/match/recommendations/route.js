import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

function scoreTutor(learnerData, tutorData) {
  const subject = learnerData?.subject
  const tutorSubjects = Array.isArray(tutorData?.subjects) ? tutorData.subjects : []
  const availability = learnerData?.availability
  const tAvail = tutorData?.availability
  const experience = tutorData?.experienceLevel
  const schoolMatch = learnerData?.school && tutorData?.school && learnerData.school === tutorData.school
  const urgent = learnerData?.urgency && ['soon', 'urgent', 'asap'].includes(String(learnerData.urgency).toLowerCase())

  const s = subject && tutorSubjects.includes(subject) ? 1 : 0
  const a = tAvail === 'flexible' || (availability && tAvail && availability === tAvail) ? 1 : 0
  const e = experience === 'expert' ? 1 : experience === 'comfortable' ? 0.5 : 0.25
  const sc = schoolMatch ? 1 : 0
  const u = urgent && e >= 0.5 ? 1 : 0
  const score = 5 * s + 2 * a + 1 * e + 1 * sc + 1 * u
  return score
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ recommendations: [] }, { status: 401 })

  const me = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
    select: { role: true, completed: true, data: true },
  })
  if (!me?.completed || me.role !== 'learner') {
    return NextResponse.json({ recommendations: [] }, { status: 200 })
  }

  const tutors = await prisma.userProfile.findMany({
    where: { role: 'tutor', completed: true },
    select: { userId: true, data: true },
  })

  const scored = tutors
    .map((t) => ({
      userId: t.userId,
      data: t.data || {},
      score: scoreTutor(me.data || {}, t.data || {}),
    }))
    .sort((a, b) => b.score - a.score)

  return NextResponse.json({ recommendations: scored }, { status: 200 })
  } catch (e) {

    return NextResponse.json({ error: 'Internal error', detail: process.env.NODE_ENV !== 'production' ? String(e?.message || e) : undefined }, { status: 500 })
  }
}
