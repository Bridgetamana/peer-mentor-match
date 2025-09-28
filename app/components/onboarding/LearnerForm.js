import { useState } from "react";

export default function LearnerForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    subject: "",
    specificTopic: "",
    urgency: "this-week",
    availability: "",
    school: "",
    contactMethod: "email",
    learningGoal: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, role: "learner" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          Tell us what you need help with
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
              Subject / Course <span className="text-primary">*</span>
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-4 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
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
            <label className="block text-lg font-medium mb-4">
              Specific topic <span className="text-muted">(optional)</span>
            </label>
            <input
              type="text"
              name="specificTopic"
              value={formData.specificTopic}
              onChange={handleChange}
              className="w-full p-4 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="e.g., Calculus, Organic Chemistry, React.js"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-4">
              When do you need help? <span className="text-primary">*</span>
            </label>
            <div className="grid gap-4">
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="urgent"
                  checked={formData.urgency === "urgent"}
                  onChange={handleChange}
                  className="mr-4 scale-125"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">ASAP (within 2 days)</div>
                  <div className="text-muted">Upcoming test or deadline</div>
                </div>
              </label>
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="this-week"
                  checked={formData.urgency === "this-week"}
                  onChange={handleChange}
                  className="mr-4 scale-125"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">This week</div>
                  <div className="text-muted">I&apos;d like help soon</div>
                </div>
              </label>
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <input
                  type="radio"
                  name="urgency"
                  value="flexible"
                  checked={formData.urgency === "flexible"}
                  onChange={handleChange}
                  className="mr-4 scale-125"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">Flexible</div>
                  <div className="text-muted">Ongoing study support</div>
                </div>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium mb-4">
              Preferred availability <span className="text-primary">*</span>
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
              How should your study partner contact you? <span className="text-primary">*</span>
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
              What’s your learning goal? <span className="text-muted">(optional)</span>
            </label>
            <input
              type="text"
              name="learningGoal"
              value={formData.learningGoal}
              onChange={handleChange}
              className="w-full p-4 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="e.g., Pass Calculus 101, improve my coding skills"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full !text-xl !py-4 !font-bold"
          >
            Find My Study Partner
          </button>
        </form>
      </div>
    </div>
  );
}
