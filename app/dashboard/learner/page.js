'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LearnerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    // Check authentication and profile
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('userProfile');

    if (!userData || !profileData) {
      router.push('/auth/signin');
      return;
    }

    const profile = JSON.parse(profileData);
    if (profile.role !== 'learner') {
      router.push('/dashboard/tutor');
      return;
    }

    setUser({ ...JSON.parse(userData), ...profile });
  }, [router]);

  // Mock data - replace with Supabase queries
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
    // Create session in Supabase
    alert(`Session booked with ${tutor.name} at ${slot}!`);
    setShowBooking(false);
    setSelectedTutor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  if (showBooking && selectedTutor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Book Session</h1>
              </div>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="card bg-white p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {selectedTutor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedTutor.name}</h3>
                <p className="text-gray-600">{selectedTutor.subjects.join(', ')}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{selectedTutor.rating} ({selectedTutor.totalSessions} sessions)</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">About {selectedTutor.name.split(' ')[0]}</h4>
              <p className="text-gray-600">{selectedTutor.bio}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">Available Time Slots</h4>
              <div className="grid gap-3">
                {selectedTutor.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleBookSession(selectedTutor, slot)}
                    className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer"
                  >
                    <div className="font-medium text-gray-900">{slot}</div>
                    <div className="text-sm text-gray-600">60 minutes session</div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Learner Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Learning Streak</p>
                <p className="text-2xl font-bold text-gray-900">7 days</p>
              </div>
            </div>
          </div>

          <div className="card bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sessions Completed</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="card bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.6</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
            <div className="card bg-white p-6">
              {upcomingSessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{session.subject} with {session.tutorName}</h3>
                    <p className="text-gray-600">{session.date} at {session.time}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Tutors */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Tutors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedTutors.map(tutor => (
              <div key={tutor.id} className="card bg-white p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {tutor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{tutor.name}</h3>
                    <p className="text-sm text-gray-600">{tutor.experienceLevel}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tutor.subjects.map(subject => (
                      <span key={subject} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{tutor.rating}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    🔥 {tutor.streak} day streak
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{tutor.bio}</p>

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