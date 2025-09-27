'use client';
import Link from 'next/link';
import Hero from './components/landing-page/Hero';
// import HowItWorks from './components/landing-page/HowItWorks';
import Why from './components/landing-page/WhySection';
import ProblemSection from './components/landing-page/ProblemSection';
import CTA from './components/landing-page/CTA';
import Testimonial from './components/landing-page/Testimonial';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 py-20">
        <Hero />
        <ProblemSection />
        {/* <HowItWorks /> */}
        <Why />
        <Testimonial />
        <CTA />
      </main>
    </div>
  );
}