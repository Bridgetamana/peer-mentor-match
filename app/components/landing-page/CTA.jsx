import Link from "next/link";

export default function CTA() {
  return (
    <section className="box-shadow bg-primary text-center p-6 md:p-12 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto-condensed">
        Ready to Start Learning?
      </h2>
      <p className="mb-8 text-lg max-w-2xl mx-auto">
        Join thousands of students already using peer learning to achieve their
        goals
      </p>
      <Link
        href="/auth/signin"
        className="box-shadow bg-accent text-foreground px-8 py-2 text-lg font-bold cursor-pointer inline-flex items-center gap-2 shadow-lg no-underline group"
      >
        Get Started
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="group-hover:translate-x-1.5 transition-transform duration-200 ease-in"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M18.5 12L4.99997 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </section>
  );
}
