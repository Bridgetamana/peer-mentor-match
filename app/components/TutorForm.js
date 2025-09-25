import { useState } from 'react';

export default function TutorForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    subjects: [],
    experienceLevel: 'comfortable',
    contactMethod: 'email'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.subjects.length === 0) {
      alert('Please select at least one subject you can help with.');
      return;
    }
    onSubmit({ ...formData, role: 'tutor' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubjectToggle = (subject) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.includes(subject)
        ? formData.subjects.filter(s => s !== subject)
        : [...formData.subjects, subject]
    });
  };

  const subjects = [
    { id: 'math', label: 'Mathematics' },
    { id: 'science', label: 'Science (Physics, Chemistry, Biology)' },
    { id: 'programming', label: 'Programming & Computer Science' },
    { id: 'languages', label: 'Languages & Literature' },
    { id: 'other', label: 'Other' }
  ];

  return (
    <div>
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="text-[--muted] hover:text-[--foreground] mr-4"
        >
          ← Back
        </button>
        <h2 className="text-xl font-medium">Share your expertise</h2>
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
              Subjects you can help with <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 gap-3">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => handleSubjectToggle(subject.id)}
                  className={`p-4 text-left border rounded-lg transition-colors ${
                    formData.subjects.includes(subject.id)
                      ? 'border-[--foreground] bg-[--foreground] text-[--background]'
                      : 'border-[--border] bg-[--input-bg] hover:border-[--muted] text-[--foreground]'
                  }`}
                >
                  <div className="font-medium">{subject.label}</div>
                  {formData.subjects.includes(subject.id) && (
                    <div className="text-sm opacity-80 mt-1">✓ Selected</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Your experience level <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 gap-3">
              <label className="flex items-center p-4 bg-[--input-bg] border border-[--border] rounded-lg cursor-pointer hover:border-[--muted] transition-colors">
                <input
                  type="radio"
                  name="experienceLevel"
                  value="learning"
                  checked={formData.experienceLevel === 'learning'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Still learning</div>
                  <div className="text-sm text-[--muted]">I understand the basics and can help others get started</div>
                </div>
              </label>
              <label className="flex items-center p-4 bg-[--input-bg] border border-[--border] rounded-lg cursor-pointer hover:border-[--muted] transition-colors">
                <input
                  type="radio"
                  name="experienceLevel"
                  value="comfortable"
                  checked={formData.experienceLevel === 'comfortable'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Comfortable</div>
                  <div className="text-sm text-[--muted]">I have solid understanding and can explain concepts well</div>
                </div>
              </label>
              <label className="flex items-center p-4 bg-[--input-bg] border border-[--border] rounded-lg cursor-pointer hover:border-[--muted] transition-colors">
                <input
                  type="radio"
                  name="experienceLevel"
                  value="expert"
                  checked={formData.experienceLevel === 'expert'}
                  onChange={handleChange}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Expert</div>
                  <div className="text-sm text-[--muted]">I have advanced knowledge and teaching experience</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              How should students contact you? <span className="text-red-400">*</span>
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
          Start Helping Students
        </button>
      </form>
    </div>
  );
}