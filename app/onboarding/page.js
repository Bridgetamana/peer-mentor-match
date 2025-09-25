'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelector from '../components/RoleSelector';
import LearnerForm from '../components/LearnerForm';
import TutorForm from '../components/TutorForm';

export default function Onboarding() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/signin');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleProfileSubmit = (profile) => {
    console.log('Profile submitted:', profile);

    // Save profile to localStorage (replace with Supabase)
    localStorage.setItem('userProfile', JSON.stringify(profile));

    // Redirect to appropriate dashboard
    router.push(`/dashboard/${profile.role}`);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    router.push('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600">
            Let&apos;s set up your profile to find the perfect learning matches
          </p>
        </div>

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