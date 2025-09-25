'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            🌱 Join the Learning Revolution
          </div>
          <h1 className="text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Find Your Perfect
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Study Partner
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Connect with peers who share your academic goals. Get help when you need it, 
            share your knowledge when you can.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 rounded-full no-underline"
            >
              Get Started 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/auth/signin"
              className="btn-secondary text-lg px-10 py-4 inline-flex items-center gap-2 rounded-full no-underline"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">Three simple steps to connect with your ideal study partner</p>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-200 to-emerald-200"></div>
            
            <div className="card text-center relative bg-white border-2 border-green-100 hover:border-green-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Create Your Profile</h3>
              <p className="text-gray-600 leading-relaxed">Tell us about your subjects, experience level, and what you&apos;re looking for</p>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-100 rounded-full opacity-50"></div>
            </div>
            
            <div className="card text-center relative bg-white border-2 border-emerald-100 hover:border-emerald-300">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Get Matched</h3>
              <p className="text-gray-600 leading-relaxed">Our algorithm finds peers with complementary skills and schedules</p>
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-100 rounded-full opacity-50"></div>
            </div>
            
            <div className="card text-center relative bg-white border-2 border-green-100 hover:border-green-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Start Learning</h3>
              <p className="text-gray-600 leading-relaxed">Connect with your matches and begin collaborative study sessions</p>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-100 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Why Choose Peer Learning?</h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">Discover the benefits that make peer learning the future of education</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Matching</h3>
                  <p className="text-gray-600">Get paired with peers based on subjects, experience levels, and learning goals</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>
            </div>
            
            <div className="card bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Track Progress</h3>
                  <p className="text-gray-600">Build learning streaks and see your improvement over time</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-200 rounded-full opacity-20"></div>
            </div>
            
            <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Peer Reviews</h3>
                  <p className="text-gray-600">Rate your study sessions and build a reputation in the community</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-18 h-18 bg-yellow-200 rounded-full opacity-20"></div>
            </div>
            
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Community First</h3>
                  <p className="text-gray-600">Learn together, grow together in a supportive peer environment</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-14 h-14 bg-blue-200 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">Join thousands of students already using peer learning to achieve their goals</p>
            <Link
              href="/auth/signup"
              className="bg-white text-green-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-green-50 transition-all duration-200 transform hover:scale-105 cursor-pointer inline-flex items-center gap-2 shadow-lg no-underline"
            >
              Create Your Profile
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
        </div>
      </main>
    </div>
  );
}