'use client';

import { useState } from 'react';
import RoleSelector from './components/RoleSelector';
import LearnerForm from './components/LearnerForm';
import TutorForm from './components/TutorForm';

export default function Home() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleProfileSubmit = (profile) => {
    setUserProfile(profile);
    console.log('Profile submitted:', profile);
  };

  return (
    <div className="min-h-screen bg-[--background] text-[--foreground]">
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold mb-3 text-[--foreground]">
            Peer Learning Matchmaker
          </h1>
          <p className="text-[--muted] text-lg">
            Connect with peers for collaborative learning
          </p>
        </div>

        {!selectedRole && (
          <RoleSelector onRoleSelect={handleRoleSelect} />
        )}

        {selectedRole === 'learner' && !userProfile && (
          <LearnerForm onSubmit={handleProfileSubmit} onBack={() => setSelectedRole(null)} />
        )}

        {selectedRole === 'tutor' && !userProfile && (
          <TutorForm onSubmit={handleProfileSubmit} onBack={() => setSelectedRole(null)} />
        )}

        {userProfile && (
          <div className="text-center py-8">
            <h2 className="text-xl font-medium mb-4">Finding your matches...</h2>
            <p className="text-[--muted]">Matching algorithm will be implemented here</p>
          </div>
        )}
      </main>
    </div>
  );
}
