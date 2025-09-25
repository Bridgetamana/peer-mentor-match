export default function RoleSelector({ onRoleSelect }) {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose Your Learning Journey</h2>
                <p className="text-gray-600">Select the option that best describes your current needs</p>
            </div>

            <div className="grid gap-6">
                <button
                    onClick={() => onRoleSelect('learner')}
                    className="card w-full p-8 text-left bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-700 transition-colors">I need help with a subject</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">Connect with knowledgeable peers who can help you understand difficult concepts and improve your grades</p>
                            <div className="mt-4 inline-flex items-center text-blue-600 font-medium">
                                Find a tutor
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-500"></div>
                </button>

                <button
                    onClick={() => onRoleSelect('tutor')}
                    className="card w-full p-8 text-left bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-400 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                >
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-700 transition-colors">I can help others learn</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">Share your expertise and help fellow students succeed while building your teaching skills and reputation</p>
                            <div className="mt-4 inline-flex items-center text-green-600 font-medium">
                                Become a tutor
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-200 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-500"></div>
                </button>
            </div>
        </div>
    );
}