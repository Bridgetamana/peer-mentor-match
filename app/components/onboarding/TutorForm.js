import { useState } from "react";

export default function TutorForm({ onSubmit, onBack, submitting }) {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    subjects: [],
    experienceLevel: "comfortable",
    availability: "",
    contactMethod: "email",
    intro: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.subjects.length === 0) {

      return;
    }
    onSubmit({ ...formData, role: "tutor" });
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
        ? formData.subjects.filter((s) => s !== subject)
        : [...formData.subjects, subject]
    });
  };

  const subjects = [
    { id: "math", label: "Mathematics" },
    { id: "science", label: "Science (Physics, Chemistry, Biology)" },
    { id: "programming", label: "Programming & Computer Science" },
    { id: "languages", label: "Languages & Literature" },
    { id: "other", label: "Other" }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="box-shadow bg-accent hover:bg-accent/80 !p-2 font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M15 6C15 6 9 10.4 9 12c0 1.6 6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <div className="!max-w-none !mb-0 font-bold text-lg">
          Share Your Expertise
        </div>
      </div>

      <div className="box-shadow bg-background p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-medium mb-4">
              School / University <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="e.g., University of Lagos"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-4">
              Your name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-4">
              Subjects you can help with <span className="text-primary">*</span>
            </label>
            <div className="grid grid-cols-1 gap-4">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => handleSubjectToggle(subject.id)}
                  className={`p-4 text-left font-medium transition-all ${formData.subjects.includes(subject.id)
                    ? "bg-primary border-2 border-foreground text-background shadow-[6px_4px_#0d090a]"
                    : "box-shadow bg-background hover:bg-accent/10"
                    }`}
                >
                  <div className="font-bold text-lg">{subject.label}</div>
                  {formData.subjects.includes(subject.id) && (
                    <div className="text-sm font-medium mt-1">✓ Selected</div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium mb-4">
              Your experience level <span className="text-primary">*</span>
            </label>
            <div className="grid gap-4">
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <input
                  type="radio"
                  name="experienceLevel"
                  value="learning"
                  checked={formData.experienceLevel === "learning"}
                  onChange={handleChange}
                  className="mr-4 scale-125"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">Still learning</div>
                  <div className="text-muted">I understand the basics and can help others get started</div>
                </div>
              </label>
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <input
                  type="radio"
                  name="experienceLevel"
                  value="comfortable"
                  checked={formData.experienceLevel === "comfortable"}
                  onChange={handleChange}
                  className="mr-4 scale-125"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">Comfortable</div>
                  <div className="text-muted">Solid understanding, can explain concepts well</div>
                </div>
              </label>
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <input
                  type="radio"
                  name="experienceLevel"
                  value="expert"
                  checked={formData.experienceLevel === "expert"}
                  onChange={handleChange}
                  className="mr-4 scale-125"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">Expert</div>
                  <div className="text-muted">Advanced knowledge and teaching experience</div>
                </div>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium mb-4">
              When are you available? <span className="text-primary">*</span>
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
            >
              <option value="">Choose availability</option>
              <option value="mornings">Mornings</option>
              <option value="afternoons">Afternoons</option>
              <option value="evenings">Evenings</option>
              <option value="weekends">Weekends</option>
              <option value="flexible">I&apos;m flexible</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-4">
              How should students contact you? <span className="text-primary">*</span>
            </label>
            <select
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
            >
              <option value="email">📧 Email</option>
              <option value="phone">📱 Phone/Text</option>
              <option value="in-app">💬 In-app chat</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-4">
              Short introduction <span className="text-muted">(optional)</span>
            </label>
            <textarea
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              className="w-full p-4 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="Tell learners a bit about your experience or approach"
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={!!submitting}
            className="btn-primary w-full !text-xl !py-4 !font-bold !bg-success disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting…' : 'Start Helping Students'}
          </button>
        </form>
      </div>
    </div>
  );
}