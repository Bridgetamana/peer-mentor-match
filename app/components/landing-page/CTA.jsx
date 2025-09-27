import Link from "next/link";

export default function CTA() {
  return (
    <div className="box-shadow bg-primary text-center p-6 md:p-12 max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
      <p className="mb-8 text-lg max-w-2xl mx-auto">
        Join thousands of students already using peer learning to achieve their
        goals
      </p>
      <Link
        href="/auth/signup"
        className="box-shadow bg-accent text-foreground px-8 py-2 text-lg font-bold cursor-pointer inline-flex items-center gap-2 shadow-lg no-underline"
      >
        Create Your
        <svg
          className="w-5 h-5"
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
  );
}
