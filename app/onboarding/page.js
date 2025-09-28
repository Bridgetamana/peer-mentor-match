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
          />
        )}

        {selectedRole === 'tutor' && (
          <TutorForm
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}