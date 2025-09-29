'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Loading from '@/app/components/loading';
import Image from 'next/image';
import Logo from '../../../public/peermatch-logo.png'

export default function LearnerDashboard() {
  const { data: session, status } = useSession();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const recommendedTutors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      subjects: ['Mathematics', 'Physics'],
      streak: 15,
      rating: 4.8,
      totalSessions: 42,
      experienceLevel: 'Expert',
      bio: 'Math tutor with 3+ years experience. Specializes in calculus and algebra.',
      availableSlots: ['Today 3:00 PM', 'Tomorrow 2:00 PM', 'Friday 4:00 PM']
    },
    {
      id: 2,
      name: 'Mike Chen',
      subjects: ['Programming', 'Computer Science'],
      streak: 23,
      rating: 4.9,
      totalSessions: 67,
      experienceLevel: 'Expert',
      bio: 'CS student passionate about helping others learn programming.',
      availableSlots: ['Today 5:00 PM', 'Tomorrow 1:00 PM', 'Saturday 10:00 AM']
    },
    {
      id: 3,
      name: 'Emma Davis',
      subjects: ['Chemistry', 'Biology'],
      streak: 8,
      rating: 4.7,
      totalSessions: 28,
      experienceLevel: 'Comfortable',
      bio: 'Pre-med student who loves teaching science concepts.',
      availableSlots: ['Tomorrow 3:00 PM', 'Friday 2:00 PM', 'Sunday 11:00 AM']
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      tutorName: 'Sarah Johnson',
      subject: 'Mathematics',
      date: 'Today',
      time: '3:00 PM',
      status: 'confirmed'
    }
  ];

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
    loadProfile()
    return () => { active = false }
  }, [])

  if (status === 'loading') {
    return <Loading />
  }
  const userName = session?.user?.name || 'Learner'

  if (showBooking && selectedTutor) {
    return (
      <div className="min-h-screen bg-background">
        <header className="px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className='flex items-center gap-4'>
              <button onClick={() => setShowBooking(false)} className="box-shadow bg-accent hover:bg-accent/80 !p-2 font-medium">← Back</button>
              <div className="text-2xl font-bold">Book Session</div>
            </div>
            <button onClick={handleLogout} className="btn-primary !bg-accent">Logout</button>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="box-shadow bg-background p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-success border-2 border-foreground flex items-center justify-center">
                <span className="text-foreground font-bold text-xl">
                  {selectedTutor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedTutor.name}</h3>
                <p className="text-muted">{selectedTutor.subjects.join(', ')}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span>★</span>
                  <span className="text-sm text-muted">{selectedTutor.rating} ({selectedTutor.totalSessions} sessions)</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">About {selectedTutor.name.split(' ')[0]}</h4>
              <p className="text-muted">{selectedTutor.bio}</p>
            </div>

            <div>
              <h4 className="font-medium mb-4">Available Time Slots</h4>
              <div className="grid gap-3">
                {selectedTutor.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleBookSession(selectedTutor, slot)}
                    className="box-shadow bg-background p-4 text-left hover:bg-accent/10 transition-colors"
                  >
                    <div className="font-medium">{slot}</div>
                    <div className="text-sm text-muted">60 minutes session</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="box-shadow bg-background p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center border-2 border-foreground">
                📚
              </div>
              <div>
                <p className="text-sm text-muted">Learning Streak</p>
                <p className="text-2xl font-bold !leading-none">7 days</p>
              </div>
            </div>
          </div>

          <div className="box-shadow bg-background p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-success flex items-center justify-center border-2 border-foreground">
                ✅
              </div>
              <div>
                <p className="text-sm text-muted">Sessions Completed</p>
                <p className="text-2xl font-bold !leading-none">12</p>
              </div>
            </div>
          </div>

          <div className="box-shadow bg-background p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent flex items-center justify-center border-2 border-foreground">
                ⭐
              </div>
              <div>
                <p className="text-sm text-muted">Average Rating</p>
                <p className="text-2xl font-bold !leading-none">4.6</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Learning Profile</h2>
          <div className="box-shadow bg-background p-6">
            {loadingProfile ? (
              <div>Loading your preferences…</div>
            ) : !profile?.data ? (
              <div className="text-muted">We couldn&apos;t find your onboarding details yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted">School</div>
                  <div className="font-medium">{profile.data.school || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted">Subject</div>
                  <div className="font-medium capitalize">{profile.data.subject || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted">Specific Topic</div>
                  <div className="font-medium">{profile.data.specificTopic || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted">Urgency</div>
                  <div className="font-medium">{profile.data.urgency || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted">Availability</div>
                  <div className="font-medium">{profile.data.availability || '—'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted">Preferred Contact</div>
                  <div className="font-medium">{profile.data.contactMethod || '—'}</div>
                </div>
                <div className="sm:col-span-2">
                  <div className="text-sm text-muted">Learning Goal</div>
                  <div className="font-medium">{profile.data.learningGoal || '—'}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {upcomingSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
            <div className="box-shadow bg-background p-6">
              {upcomingSessions.map(session => (
                <div key={session.id} className="flex flex-col sm:flex-row justify-between p-4 border-2 border-foreground">
                  <div>
                    <h3 className="font-medium">{session.subject} with {session.tutorName}</h3>
                    <p className="text-muted">{session.date} at {session.time}</p>
                  </div>
                  <span className="px-3 py-1 bg-success text-background text-sm font-bold border-2 border-foreground inline-flex justify-center mt-2 max-w-30">
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-4">Recommended Tutors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTutors.map(tutor => (
              <div key={tutor.id} className="box-shadow bg-background p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-success border-2 border-foreground flex items-center justify-center">
                    <span className="font-bold">
                      {tutor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">{tutor.name}</h3>
                    <p className="text-sm text-muted">{tutor.experienceLevel}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tutor.subjects.map(subject => (
                      <span key={subject} className="px-2 py-1 bg-accent text-foreground text-sm border-2 border-foreground">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></span>
                    <span>{tutor.rating}</span>
                  </div>
                  <div className="text-sm text-muted flex items-center gap-2">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg></span>
                    <span>{tutor.streak} day streak</span>
                  </div>
                </div>

                <p className="text-muted text-sm mb-4">{tutor.bio}</p>

                <button
                  onClick={() => {
                    setSelectedTutor(tutor);
                    setShowBooking(true);
                  }}
                  className="btn-primary w-full"
                >
                  Book Session
                </button>
              </div>
            ))}
            {recommendedTutors.length === 0 && (
              <div className="box-shadow bg-background p-6 col-span-full text-center">
                <div className="font-medium">No recommendations yet</div>
                <div className="text-muted text-sm">Once we learn more about your preferences, tutors will appear here.</div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}