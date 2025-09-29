import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import LandingPage from '../components/landing-page/Index'
import OnboardingClient from './OnboardingClient'
import { redirect } from 'next/navigation'

export default async function Onboarding() {
  const session = await auth()
  if (!session) return <LandingPage />

  const profile = await prisma.userProfile.findFirst({
    where: { 
      email: session.user.email,
      completed: true 
    },
    select: { completed: true, role: true }
  })
  if (profile?.completed) {
    redirect(profile.role === 'tutor' ? '/dashboard/tutor' : '/dashboard/learner')
  }

  return <OnboardingClient userName={session.user.name || 'there'} />
}