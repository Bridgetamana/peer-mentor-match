import CTA from "./CTA";
import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import Testimonial from "./Testimonial";
import Why from "./WhySection";

export default function LandingPage() {
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
