import { useState } from 'react';

export default function LearnerForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    specificTopic: '',
    urgency: 'this-week',
    contactMethod: 'email'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, role: 'learner' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="text-[--muted] hover:text-[--foreground] mr-4"
        >
          ← Back
        </button>
        <h2 className="text-xl font-medium">Tell us what you need help with</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">
              Your name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-[--input-bg] border border-[--border] rounded-lg focus:outline-none focus:border-[--foreground] text-[--foreground] placeholder-[--muted]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Subject you need help with <span className="text-red-400">*</span>
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-4 bg-[--input-bg] border border-[--border] rounded-lg focus:outline-none focus:border-[--foreground] text-[--foreground]"
            >
              <option value="">Choose a subject</option>
              <option value="math">Mathematics</option>
              <option value="science">Science (Physics, Chemistry, Biology)</option>
              <option value="programming">Programming & Computer Science</option>
              <option value="languages">Languages & Literature</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Specific topic <span className="text-[--muted]">(optional)</span>
            </label>
            <input
              type="text"
              name="specificTopic"
              value={formData.specificTopic}
              onChange={handleChange}
              className="w-full p-4 bg-[--input-bg] border border-[--border] rounded-lg focus:outline-none focus:border-[--foreground] text-[--foreground] placeholder-[--muted]"
              placeholder="e.g., Calculus, Organic Chemistry, React.js"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              When do you need help? <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center p-4 bg-[--input-bg] border border-[--border] rounded-lg cursor-pointer hover:border-[--muted] transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="urgent"
                  checked={formData.urgency === 'urgent'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">ASAP (within 2 days)</div>
                  <div className="text-sm text-[--muted]">I have an upcoming test or deadline</div>
                </div>
              </label>
              <label className="flex items-center p-4 bg-[--input-bg] border border-[--border] rounded-lg cursor-pointer hover:border-[--muted] transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="this-week"
                  checked={formData.urgency === 'this-week'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">This week</div>
                  <div className="text-sm text-[--muted]">I&apos;d like help soon but it&apos;s not urgent</div>
                </div>
              </label>
              <label className="flex items-center p-4 bg-[--input-bg] border border-[--border] rounded-lg cursor-pointer hover:border-[--muted] transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="flexible"
                  checked={formData.urgency === 'flexible'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Flexible</div>
                  <div className="text-sm text-[--muted]">I&apos;m looking for ongoing study support</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              How should tutors contact you? <span className="text-red-400">*</span>
            </label>
            <select
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              required
              className="w-full p-4 bg-[--input-bg] border border-[--border] rounded-lg focus:outline-none focus:border-[--foreground] text-[--foreground]"
            >
              <option value="email">Email</option>
              <option value="phone">Phone/Text</option>
              <option value="discord">Discord</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[--foreground] text-[--background] py-4 px-6 rounded-lg hover:opacity-90 transition-opacity font-medium text-lg"
        >
          Find My Study Partner
        </button>
      </form>
    </div>
  );
}