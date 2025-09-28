'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelector from '../components/RoleSelector';
import LearnerForm from '../components/LearnerForm';
import TutorForm from '../components/TutorForm';
import Logo from "../../public/peermatch-logo.png"
import Image from 'next/image';
import Loading from '../components/loading';

export default function Onboarding() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleProfileSubmit = (profile) => {
    console.log('Profile submitted:', profile);

    localStorage.setItem('userProfile', JSON.stringify(profile));

    router.push(`/dashboard/${profile.role}`);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  if (!user) {
    return <Loading />;
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
          Welcome, {user.name}!
        </h2>
        <p className="text-muted mb-6">Select the option that best describes your current needs</p>


        {!selectedRole && (
          <RoleSelector onRoleSelect={handleRoleSelect} />
        )}

        {selectedRole === 'learner' && (
          <LearnerForm
            onSubmit={handleProfileSubmit}
            onBack={handleBack}
          />
        )}

        {selectedRole === 'tutor' && (
          <TutorForm
            onSubmit={handleProfileSubmit}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}