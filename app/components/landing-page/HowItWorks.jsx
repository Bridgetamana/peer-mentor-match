export default function HowItWorks() {
    return (
      <div className="mb-20">
        <h2 className="section-title">How It Works</h2>
        <p className="section-desc">
          Three simple steps to connect with your ideal study partner
        </p>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="card text-center relative bg-white border-2 border-green-100 hover:border-green-300">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Create Your Profile
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Tell us about your subjects, experience level, and what
              you&apos;re looking for
            </p>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-100 rounded-full opacity-50"></div>
          </div>

          <div className="card text-center relative bg-white border-2 border-emerald-100 hover:border-emerald-300">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Get Matched
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our algorithm finds peers with complementary skills and schedules
            </p>
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-100 rounded-full opacity-50"></div>
          </div>

          <div className="card text-center relative bg-white border-2 border-green-100 hover:border-green-300">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Start Learning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with your matches and begin collaborative study sessions
            </p>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-100 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    );
}