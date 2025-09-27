import Image from "next/image";
import Link from "next/link";
import HeroImage from "../../../public/hero-image.avif";

export default function Hero() {
  return (
    <div className="text-center mb-20">
      <div className="inline-block px-2 py-1 font-medium bg-accent text-sm mb-6 box-shadow">
        Join the Learning Revolution
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 uppercase">
        Find Your Perfect
        <br />
        <span className="">Study Partner</span>
      </h1>
      <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
        Connect with peers who share your academic goals. Get help when you need
        it, share your knowledge when you can.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
        <Link href="/auth/signup" className="btn-primary">
          Get Started
        </Link>
        <Link
          href="/auth/signin"
          className="font-semibold py-2 px-4 text-lg inline-flex items-center gap-1 justify-center hover:text-muted group"
        >
          Sign In
          <svg
            className="group-hover:translate-x-1.5 transition-transform duration-200 ease-in"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
      <div className="mt-8 box-shadow">
        <Image src={HeroImage} alt="" width={900} />
      </div>
    </div>
  );
}
