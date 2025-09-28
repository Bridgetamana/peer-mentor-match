'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Loading from '@/app/components/loading';
import Image from 'next/image';
import Logo from '../../../public/peermatch-logo.png'

export default function LearnerDashboard() {
  const { data: session, status } = useSession();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

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
          <div className='flex items-center gap-4'>
            <div className='w-36'><Image src={Logo} alt="" /></div>
            <div>
              <h1 className="text-2xl font-bold">Learner Dashboard</h1>
              <p className="text-muted">Welcome back, {userName}!</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-primary !bg-accent">Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="box-shadow bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent flex items-center justify-center border-2 border-foreground">
                📚
              </div>
              <div>
                <p className="text-sm text-muted">Learning Streak</p>
                <p className="text-2xl font-bold">7 days</p>
              </div>
            </div>
          </div>

          <div className="box-shadow bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success flex items-center justify-center border-2 border-foreground">
                ✅
              </div>
              <div>
                <p className="text-sm text-muted">Sessions Completed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>

          <div className="box-shadow bg-background p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent flex items-center justify-center border-2 border-foreground">
                ⭐
              </div>
              <div>
                <p className="text-sm text-muted">Average Rating</p>
                <p className="text-2xl font-bold">4.6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
            <div className="box-shadow bg-background p-6">
              {upcomingSessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-4 border-2 border-foreground">
                  <div>
                    <h3 className="font-medium">{session.subject} with {session.tutorName}</h3>
                    <p className="text-muted">{session.date} at {session.time}</p>
                  </div>
                  <span className="px-3 py-1 bg-success text-background text-sm font-bold border-2 border-foreground">
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
                  <div className="w-12 h-12 bg-success border-2 border-foreground flex items-center justify-center">
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
                    <span>★</span>
                    <span className="text-sm text-muted">{tutor.rating}</span>
                  </div>
                  <div className="text-sm text-muted">
                    🔥 {tutor.streak} day streak
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
          </div>
        </div>
      </main>
    </div>
  );
}