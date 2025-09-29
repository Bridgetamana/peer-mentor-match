import { useState } from "react";
import { TextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { RadioButton } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Label } from '@progress/kendo-react-labels';

export default function LearnerForm({ onSubmit, onBack, submitting }) {
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

  const subjectOptions = [
    { text: "Choose a subject", value: "" },
    { text: "Mathematics", value: "math" },
    { text: "Science (Physics, Chemistry, Biology)", value: "science" },
    { text: "Programming & Computer Science", value: "programming" },
    { text: "Languages & Literature", value: "languages" },
    { text: "Other", value: "other" }
  ];

  const availabilityOptions = [
    { text: "Choose availability", value: "" },
    { text: "Mornings", value: "mornings" },
    { text: "Afternoons", value: "afternoons" },
    { text: "Evenings", value: "evenings" },
    { text: "Weekends", value: "weekends" },
    { text: "I&apos;m flexible", value: "flexible" }
  ];

  const contactOptions = [
    { text: "📧 Email", value: "email" },
    { text: "📱 Phone/Text", value: "phone" },
    { text: "💬 In-app chat", value: "in-app" }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={onBack}
          className="box-shadow bg-accent hover:bg-accent/80 !p-2 font-medium !flex items-center !gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M15 6C15 6 9 10.4 9 12c0 1.6 6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Button>
        <div className="!max-w-none !mb-0 font-bold text-lg">
          Tell us what you need help with
        </div>
      </div>

      <div className="box-shadow bg-background p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Label className="block text-lg font-medium mb-4">
              School / University <span className="text-primary">*</span>
            </Label>
            <TextBox
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              className="w-full !p-3 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="e.g., University of Lagos"
            />
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              Subject / Course <span className="text-primary">*</span>
            </Label>
            <DropDownList
              data={subjectOptions}
              textField="text"
              dataItemKey="value"
              value={subjectOptions.find(item => item.value === formData.subject)}
              onChange={(e) => handleChange({ target: { name: 'subject', value: e.target.value?.value || '' } })}
              className="box-shadow w-full !p-3 !rounded-none border-2 border-foreground !bg-background focus:bg-accent/20 font-medium transition-color"
            />
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              Specific topic <span className="text-muted">(optional)</span>
            </Label>
            <TextBox
              name="specificTopic"
              value={formData.specificTopic}
              onChange={handleChange}
              className="w-full !p-3 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="e.g., Calculus, Organic Chemistry, React.js"
            />
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              When do you need help? <span className="text-primary">*</span>
            </Label>
            <div className="grid gap-4">
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <RadioButton
                  name="urgency"
                  value="urgent"
                  checked={formData.urgency === "urgent"}
                  onChange={handleChange}
                  className="mr-4"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">ASAP (within 2 days)</div>
                  <div className="text-muted">Upcoming test or deadline</div>
                </div>
              </label>
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <RadioButton
                  name="urgency"
                  value="this-week"
                  checked={formData.urgency === "this-week"}
                  onChange={handleChange}
                  className="mr-4"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">This week</div>
                  <div className="text-muted">I&apos;d like help soon</div>
                </div>
              </label>
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <RadioButton
                  name="urgency"
                  value="flexible"
                  checked={formData.urgency === "flexible"}
                  onChange={handleChange}
                  className="mr-4"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">Flexible</div>
                  <div className="text-muted">Ongoing study support</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              Preferred availability <span className="text-primary">*</span>
            </Label>
            <DropDownList
              data={availabilityOptions}
              textField="text"
              dataItemKey="value"
              value={availabilityOptions.find(item => item.value === formData.availability)}
              onChange={(e) => handleChange({ target: { name: 'availability', value: e.target.value?.value || '' } })}
              className="w-full box-shadow w-full !p-3 !rounded-none border-2 border-foreground !bg-background focus:bg-accent/20 font-medium transition-color"
            />
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              How should your study partner contact you? <span className="text-primary">*</span>
            </Label>
            <DropDownList
              data={contactOptions}
              textField="text"
              dataItemKey="value"
              value={contactOptions.find(item => item.value === formData.contactMethod)}
              onChange={(e) => handleChange({ target: { name: 'contactMethod', value: e.target.value?.value || '' } })}
              className="box-shadow w-full !p-3 !rounded-none border-2 border-foreground !bg-background focus:bg-accent/20 font-medium transition-color"
            />
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              What&apos;s your learning goal? <span className="text-muted">(optional)</span>
            </Label>
            <TextBox
              name="learningGoal"
              value={formData.learningGoal}
              onChange={handleChange}
              className="w-full !p-3 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="e.g., Pass Calculus 101, improve my coding skills"
            />
          </div>

          <Button
            type="submit"
            disabled={!!submitting}
            themeColor="primary"
            className="w-full !text-xl !py-4 !font-bold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting…' : 'Find My Study Partner'}
          </Button>
        </form>
      </div>
    </div>
  );
}