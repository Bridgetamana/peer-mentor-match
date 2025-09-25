'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TutorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication and profile
    const userData = localStorage.getItem('user');
    const profileData = localStorage.getItem('userProfile');

    if (!userData || !profileData) {
      router.push('/auth/signin');
      return;
    }

    const profile = JSON.parse(profileData);
    if (profile.role !== 'tutor') {
      router.push('/dashboard/learner');
      return;
    }

    setUser({ ...JSON.parse(userData), ...profile });
  }, [router]);

  // Mock data - replace with Supabase queries
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
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div>Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tutor Dashboard</h1>
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
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teaching Streak</p>
                <p className="text-2xl font-bold text-gray-900">15 days</p>
              </div>
            </div>
          </div>

          <div className="card bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
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
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </div>

          <div className="card bg-white p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">$340</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Sessions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                <div key={session.id} className="card bg-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {session.learnerName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{session.learnerName}</h3>
                        <p className="text-sm text-gray-600">{session.learnerLevel} level</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {session.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subject:</span>
                      <span className="font-medium">{session.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Topic:</span>
                      <span className="font-medium">{session.topic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{session.date} at {session.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="btn-primary flex-1">
                      Join Session
                    </button>
                    <button className="btn-secondary">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions & Reviews */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Reviews</h2>
            <div className="space-y-4">
              {recentSessions.map(session => (
                <div key={session.id} className="card bg-white p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {session.learnerName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.learnerName}</h3>
                      <p className="text-sm text-gray-600">{session.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < session.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{session.subject}</span>
                  </div>

                  <p className="text-gray-600 text-sm italic">&quot;{session.feedback}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Available Slots */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Available Slots</h2>
          <div className="card bg-white p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableSlots.map((slot, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg text-center">
                  <div className="font-medium text-gray-900">{slot}</div>
                  <div className="text-sm text-gray-600 mt-1">Available</div>
                </div>
              ))}
            </div>
            <button className="btn-primary mt-4">
              Manage Availability
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}