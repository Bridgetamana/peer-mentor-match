'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Loading from '@/app/components/loading';
import Image from 'next/image';
import Logo from '../../../public/peermatch-logo.png'
// import StatCard from '@/app/dashboard/components/StatCard';
import LearningProfile from './components/LearningProfile';
import RecommendedTutors from './components/RecommendedTutors';
import BookingView from './components/BookingView';

export default function LearnerDashboard() {
  const { data: session, status } = useSession();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [tutors, setTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  const SUBJECT_LABELS = {
    math: 'Mathematics',
    science: 'Science (Physics, Chemistry, Biology)',
    programming: 'Programming & Computer Science',
    languages: 'Languages & Literature',
    other: 'Other'
  };
  const EXPERIENCE_LABELS = {
    learning: 'Still learning',
    comfortable: 'Comfortable',
    expert: 'Expert',
  };
  const AVAILABILITY_LABELS = {
    mornings: 'Mornings',
    afternoons: 'Afternoons',
    evenings: 'Evenings',
    weekends: 'Weekends',
    flexible: "I'm flexible",
  };

  const handleBookSession = (tutor, slot) => {
    console.log('Booking session with', tutor.name, 'at', slot);
    alert(`Session booked with ${tutor.name} at ${slot}!`);
    setShowBooking(false);
    setSelectedTutor(null);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  };

  useEffect(() => {
    let active = true
    async function loadProfile() {
      try {
        setLoadingProfile(true)
        const res = await fetch('/api/profile/me', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to load profile')
        const json = await res.json()
        if (active) setProfile(json.profile)
      } catch {
        if (active) setProfile(null)
      } finally {
        if (active) setLoadingProfile(false)
      }
    }
    async function loadTutors() {
      try {
        setLoadingTutors(true)
        const res = await fetch('/api/profile/list?role=tutor', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to load tutors')
        const json = await res.json()
        if (active) setTutors(json.profiles || [])
      } catch {
        if (active) setTutors([])
      } finally {
        if (active) setLoadingTutors(false)
      }
    }
    loadProfile()
    loadTutors()
    return () => { active = false }
  }, [])

  if (status === 'loading') {
    return <Loading />
  }
  const userName = session?.user?.name || 'Learner'

  if (showBooking && selectedTutor) {
    return (
      <BookingView
        tutor={selectedTutor}
        onBack={() => setShowBooking(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className='w-36'><Image src={Logo} alt="" /></div>
          <button onClick={handleLogout} className="btn-primary !bg-accent">Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className='mb-4'>
          <h1 className="text-2xl font-bold">Learner Dashboard</h1>
          <p className="text-muted">Welcome back, {userName}!</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Learning Profile</h2>
          <LearningProfile loading={loadingProfile} profile={profile} />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
          <div className="box-shadow bg-background p-6">
            <div className="text-muted">No upcoming sessions yet.</div>
            <div className="text-sm text-muted">When you book a tutor, your sessions will show up here.</div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Recommended Tutors</h2>
          <RecommendedTutors
            tutors={tutors}
            loading={loadingTutors}
            subjectLabels={SUBJECT_LABELS}
            experienceLabels={EXPERIENCE_LABELS}
            availabilityLabels={AVAILABILITY_LABELS}
            onSelect={(tutor) => { setSelectedTutor(tutor); setShowBooking(true); }}
          />
        </div>
      </main>
    </div>
  );
}