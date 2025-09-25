export default function RoleSelector({ onRoleSelect }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-center mb-8">How can we help you today?</h2>
      
      <div className="space-y-4">
        <button
          onClick={() => onRoleSelect('learner')}
          className="w-full p-6 text-left border border-[--border] rounded-lg hover:border-[--foreground] transition-colors bg-[--input-bg]"
        >
          <h3 className="font-medium text-lg mb-2 text-[--foreground]">I need help with a subject</h3>
          <p className="text-[--muted]">Connect with peers who can help you learn</p>
        </button>
        
        <button
          onClick={() => onRoleSelect('tutor')}
          className="w-full p-6 text-left border border-[--border] rounded-lg hover:border-[--foreground] transition-colors bg-[--input-bg]"
        >
          <h3 className="font-medium text-lg mb-2 text-[--foreground]">I can help others learn</h3>
          <p className="text-[--muted]">Share your knowledge and help fellow students</p>
        </button>
      </div>
    </div>
  );
}