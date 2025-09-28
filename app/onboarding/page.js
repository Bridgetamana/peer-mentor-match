'use client';

import { useState } from 'react';
import { useSession } from "next-auth/react"
import RoleSelector from '../components/onboarding/RoleSelector';
import LearnerForm from '../components/onboarding/LearnerForm';
import TutorForm from '../components/onboarding/TutorForm';
import Logo from "../../public/peermatch-logo.png"
import Image from 'next/image';
import Loading from '../components/loading';
import LandingPage from '../components/landing-page/Index';

export default function Onboarding() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (status === "loading") {
    return <Loading />
  }
  if (!session) {
    return <LandingPage />
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  const handleSubmit = async (payload) => {
    if (submitting) return
    try {
      setSubmitting(true)
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to save profile')
      const { profile } = await res.json()
      if (profile?.role === 'tutor') {
        window.location.href = '/dashboard/tutor'
      } else {
        window.location.href = '/dashboard/learner'
      }
    } catch (e) {
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-4">
        <div className='w-36'>
          <Image src={Logo} alt='' />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold font-roboto-condensed">
          Welcome, {session.user.name}!
        </h2>
        <p className="text-muted mb-6">Select the option that best describes your current needs</p>


        {!selectedRole && (
          <RoleSelector onRoleSelect={handleRoleSelect} />
        )}

        {selectedRole === 'learner' && (
          <LearnerForm
            onBack={handleBack}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}

        {selectedRole === 'tutor' && (
          <TutorForm
            onBack={handleBack}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
      </main>
    </div>
  );
}