'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '@/app/components/loading';
import Image from 'next/image';
import Logo from '../../../public/peermatch-logo.png'
import TeachingProfile from './components/TeachingProfile';
import { EmptyState } from './components/EmptyState';
import AvailabilityEditor from './components/AvailabilityEditor';

export default function TutorDashboard() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [learners, setLearners] = useState([]);
  const [loadingLearners, setLoadingLearners] = useState(true);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

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
        if (!cancelled) setProfile(data.profile);
      } catch (err) {
        if (!cancelled) setProfileError(err.message || 'Unable to load profile');
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    }
    async function loadLearners() {
      try {
        setLoadingLearners(true);
        const res = await fetch('/api/profile/list?role=learner', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load learners');
        const data = await res.json();
        if (!cancelled) setLearners(data.profiles || []);
      } catch (err) {
        if (!cancelled) setLearners([]);
      } finally {
        if (!cancelled) setLoadingLearners(false);
      }
    }
    async function loadRequests() {
      try {
        setLoadingRequests(true)
        const res = await fetch('/api/match/request?box=incoming', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to load requests')
        const data = await res.json()
        if (!cancelled) setRequests(data.requests || [])
      } catch (e) {
        if (!cancelled) setRequests([])
      } finally {
        if (!cancelled) setLoadingRequests(false)
      }
    }
    loadProfile();
    loadLearners();
    loadRequests();
    return () => { cancelled = true; };
  }, [status]);


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
          <TeachingProfile loading={profileLoading} error={profileError} profile={profile} />

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

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Match Requests</h2>
            <div className="space-y-4 mb-8">
              {loadingRequests ? (
                <EmptyState title="Loading requests…" />
              ) : requests.length === 0 ? (
                <EmptyState title="No requests right now." />
              ) : (
                requests.map(r => (
                  <div key={r.id} className="box-shadow bg-background p-6 border-2 border-foreground">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">New request</div>
                        <div className="text-sm text-muted">Subject: {r.subject || '—'}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={async () => {
                          await fetch(`/api/match/request/${r.id}/accept`, { method: 'POST' })
                          setRequests(prev => prev.filter(i => i.id !== r.id))
                        }} className="btn-primary !bg-success">Accept</button>
                        <button onClick={async () => {
                          await fetch(`/api/match/request/${r.id}/reject`, { method: 'POST' })
                          setRequests(prev => prev.filter(i => i.id !== r.id))
                        }} className="box-shadow bg-accent">Reject</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <h2 className="text-xl font-bold mb-4">Learners</h2>
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Upcoming Sessions</h2>
              <div className="box-shadow bg-background p-6 mb-8">
                <EmptyState title="No upcoming sessions." message="When learners book you, your sessions will show here." />
              </div>
              {loadingLearners ? (
                <EmptyState title="Loading learners…" />
              ) : learners.length === 0 ? (
                <EmptyState title="No learners yet." message="When learners sign up and request help, they will appear here." />
              ) : (
                learners.map(l => {
                  const d = l.data || {};
                  const n = d.name || 'Learner';
                  const initials = (n.trim()[0] || 'L').toUpperCase();
                  const tutorSubjects = Array.isArray(profile?.data?.subjects) ? profile.data.subjects : [];
                  const matched = d.subject ? tutorSubjects.includes(d.subject) : false;
                  return (
                    <div key={l.userId} className={`box-shadow bg-background p-6 border-2 ${matched ? 'border-primary' : 'border-foreground'}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-accent border-2 border-foreground flex items-center justify-center">
                          <span className="font-bold text-sm">{initials}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{n}</h3>
                          {d.subject && <p className="text-sm text-muted">{d.subject}{matched ? ' • Matched' : ''}</p>}
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        {d.specificTopic && <div><span className="text-muted">Topic:</span> <span className="font-medium">{d.specificTopic}</span></div>}
                        {d.urgency && <div><span className="text-muted">Urgency:</span> <span className="font-medium">{d.urgency}</span></div>}
                        {d.availability && <div><span className="text-muted">Availability:</span> <span className="font-medium">{AVAILABILITY_LABELS[d.availability] || d.availability}</span></div>}
                        {d.contactMethod && <div><span className="text-muted">Preferred Contact:</span> <span className="font-medium">{CONTACT_LABELS[d.contactMethod] || d.contactMethod}</span></div>}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button className="btn-primary !bg-accent">Message</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <AvailabilityEditor
            profile={profile}
            loading={profileLoading}
            labels={AVAILABILITY_LABELS}
            onUpdated={(p) => setProfile(p)}
          />
        </div>
      </main>
    </div>
  );
}