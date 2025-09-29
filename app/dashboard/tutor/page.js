'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '@/app/components/loading';
import Image from 'next/image';
import Logo from '../../../public/peermatch-logo.png'

export default function TutorDashboard() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

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
    expert: 'Expert'
  };
  const AVAILABILITY_LABELS = {
    mornings: 'Mornings',
    afternoons: 'Afternoons',
    evenings: 'Evenings',
    weekends: 'Weekends',
    flexible: "I'm flexible"
  };
  const CONTACT_LABELS = {
    email: 'Email',
    phone: 'Phone/Text',
    'in-app': 'In-app chat'
  };

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      if (status !== 'authenticated') return;
      setProfileLoading(true);
      setProfileError(null);
      try {
        const res = await fetch('/api/profile/me', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        if (!cancelled) setProfile(data);
      } catch (err) {
        if (!cancelled) setProfileError(err.message || 'Unable to load profile');
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    }
    loadProfile();
    return () => { cancelled = true; };
  }, [status]);

  const upcomingSessions = [
    {
      id: 1,
      learnerName: 'Alex Thompson',
      subject: 'Mathematics',
      topic: 'Calculus Derivatives',
      date: 'Today',
      time: '3:00 PM',
      status: 'confirmed',
      learnerLevel: 'Beginner'
    },
    {
      id: 2,
      learnerName: 'Maria Garcia',
      subject: 'Physics',
      topic: 'Quantum Mechanics',
      date: 'Tomorrow',
      time: '2:00 PM',
      status: 'confirmed',
      learnerLevel: 'Intermediate'
    }
  ];

  const recentSessions = [
    {
      id: 3,
      learnerName: 'John Doe',
      subject: 'Mathematics',
      date: 'Yesterday',
      rating: 5,
      feedback: 'Excellent tutor! Very patient and clear explanations.'
    },
    {
      id: 4,
      learnerName: 'Sarah Wilson',
      subject: 'Physics',
      date: '2 days ago',
      rating: 4,
      feedback: 'Good session, helped me understand the concepts better.'
    }
  ];

  const availableSlots = [
    'Today 5:00 PM',
    'Tomorrow 1:00 PM',
    'Friday 4:00 PM',
    'Saturday 10:00 AM'
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  };

  if (status === 'loading') {
    return <Loading />
  }

  const userName = session?.user?.name || 'Tutor'

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className='flex items-center gap-4'>
            <div className='w-36'><Image src={Logo} alt="" /></div>
          </div>
          <button onClick={handleLogout} className="">Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className='mb-4'>
          <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
          <p className="text-muted">Welcome back, {userName}!</p>
        </div>

        <section className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 box-shadow bg-background p-6">
            <h2 className="text-xl font-bold mb-4">Your Teaching Profile</h2>
            {profileLoading ? (
              <p className="text-muted">Loading your teaching profile…</p>
            ) : profileError ? (
              <p className="text-primary">{profileError}</p>
            ) : profile?.data ? (
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-muted">Name</span><span className="font-medium">{profile.data.name || userName}</span></div>
                <div className="flex justify-between"><span className="text-muted">School</span><span className="font-medium">{profile.data.school || '—'}</span></div>
                <div className="flex justify-between"><span className="text-muted">Experience</span><span className="font-medium">{EXPERIENCE_LABELS[profile.data.experienceLevel] || '—'}</span></div>
                <div className="flex justify-between"><span className="text-muted">Availability</span><span className="font-medium">{AVAILABILITY_LABELS[profile.data.availability] || '—'}</span></div>
                <div className="flex justify-between"><span className="text-muted">Contact</span><span className="font-medium">{CONTACT_LABELS[profile.data.contactMethod] || '—'}</span></div>
                <div>
                  <div className="text-muted mb-1">Subjects</div>
                  <div className="flex flex-wrap gap-2">
                    {(profile.data.subjects || []).length > 0 ? (
                      profile.data.subjects.map((s, i) => (
                        <span key={i} className="px-2 py-1 text-sm border-2 border-foreground bg-accent font-medium">{SUBJECT_LABELS[s] || s}</span>
                      ))
                    ) : (
                      <span className="text-muted">No subjects listed</span>
                    )}
                  </div>
                </div>
                {profile.data.intro ? (
                  <div>
                    <div className="text-muted mb-1">Introduction</div>
                    <p className="text-sm">{profile.data.intro}</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-muted">We couldn&apos;t find your profile details. Try reloading.</p>
            )}
          </div>

          <div className="box-shadow bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent flex items-center justify-center border-2 border-foreground">💼</div>
              <div>
                <p className="text-sm text-muted">Status</p>
                <p className="text-2xl font-bold">{profile?.completed ? 'Active' : 'Pending'}</p>
              </div>
            </div>
            <p className="text-sm text-muted mt-2">Your profile controls what learners see when booking you.</p>
          </div>
        </section>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="box-shadow bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent flex items-center justify-center border-2 border-foreground">🔥</div>
              <div>
                <p className="text-sm text-muted">Teaching Streak</p>
                <p className="text-2xl font-bold">15 days</p>
              </div>
            </div>
          </div>

          <div className="box-shadow bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success flex items-center justify-center border-2 border-foreground">👥</div>
              <div>
                <p className="text-sm text-muted">Total Students</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </div>

          <div className="box-shadow bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent flex items-center justify-center border-2 border-foreground">⭐</div>
              <div>
                <p className="text-sm text-muted">Average Rating</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
            </div>
          </div>

          <div className="box-shadow bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent flex items-center justify-center border-2 border-foreground">💰</div>
              <div>
                <p className="text-sm text-muted">This Month</p>
                <p className="text-2xl font-bold">$340</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingSessions.length === 0 ? (
                <div className="box-shadow bg-background p-6">
                  <p className="text-muted">No upcoming sessions yet.</p>
                  <p className="text-sm text-muted">When learners book you, sessions will appear here.</p>
                </div>
              ) : upcomingSessions.map(session => (
                <div key={session.id} className="box-shadow bg-background p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent border-2 border-foreground flex items-center justify-center">
                        <span className="font-bold text-sm">
                          {session.learnerName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{session.learnerName}</h3>
                        <p className="text-sm text-muted">{session.learnerLevel} level</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-success text-background text-sm font-bold border-2 border-foreground">
                      {session.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted">Subject:</span>
                      <span className="font-medium">{session.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Topic:</span>
                      <span className="font-medium">{session.topic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Time:</span>
                      <span className="font-medium">{session.date} at {session.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="btn-primary flex-1">
                      Join Session
                    </button>
                    <button className="btn-primary !bg-accent">Message</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
            <div className="space-y-4">
              {recentSessions.length === 0 ? (
                <div className="box-shadow bg-background p-6">
                  <p className="text-muted">No reviews yet.</p>
                  <p className="text-sm text-muted">After you complete sessions, feedback from learners will appear here.</p>
                </div>
              ) : recentSessions.map(session => (
                <div key={session.id} className="box-shadow bg-background p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-success border-2 border-foreground flex items-center justify-center">
                      <span className="font-bold text-sm">
                        {session.learnerName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{session.learnerName}</h3>
                      <p className="text-sm text-muted">{session.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">
                        {i < session.rating ? '★' : '☆'}
                      </span>
                    ))}
                    <span className="text-sm text-muted ml-2">{session.subject}</span>
                  </div>

                  <p className="text-muted text-sm italic">&quot;{session.feedback}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Your Available Slots</h2>
          <div className="box-shadow bg-background p-6">
            {availableSlots.length === 0 ? (
              <div className="p-6">
                <p className="text-muted">You haven&apos;t added any availability yet.</p>
                <p className="text-sm text-muted">Add your available times so learners can book you.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {availableSlots.map((slot, index) => (
                  <div key={index} className="p-4 border-2 border-foreground text-center">
                    <div className="font-medium">{slot}</div>
                    <div className="text-sm text-muted mt-1">Available</div>
                  </div>
                ))}
              </div>
            )}
            <button className="btn-primary mt-4">Manage Availability</button>
          </div>
        </div>
      </main>
    </div>
  );
}