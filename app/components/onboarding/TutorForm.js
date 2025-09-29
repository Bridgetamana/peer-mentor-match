import { useState } from "react";
import { TextBox, TextArea } from '@progress/kendo-react-inputs';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { RadioButton } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Label } from '@progress/kendo-react-labels';
import { Checkbox } from '@progress/kendo-react-inputs';

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

  const handleSubjectChange = (e) => {
    setFormData({
      ...formData,
      subjects: e.target.value || []
    });
  };

  const subjectOptions = [
    { text: "Mathematics", value: "math" },
    { text: "Science (Physics, Chemistry, Biology)", value: "science" },
    { text: "Programming & Computer Science", value: "programming" },
    { text: "Languages & Literature", value: "languages" },
    { text: "Other", value: "other" }
  ];

  const experienceOptions = [
    { text: "Still learning", value: "learning" },
    { text: "Comfortable", value: "comfortable" },
    { text: "Expert", value: "expert" }
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
          className="box-shadow bg-accent hover:bg-accent/80 !p-2 font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M15 6C15 6 9 10.4 9 12c0 1.6 6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Button>
        <div className="!max-w-none !mb-0 font-bold text-lg">
          Tell us about your expertise
        </div>
      </div>

      <div className="box-shadow bg-background p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Label className="block text-lg font-medium mb-4">
              Your Name <span className="text-primary">*</span>
            </Label>
            <TextBox
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full !p-3 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="e.g., John Doe"
            />
          </div>

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
              What subjects can you help with? <span className="text-primary">*</span>
            </Label>
            <MultiSelect
              data={subjectOptions}
              textField="text"
              dataItemKey="value"
              value={formData.subjects}
              onChange={handleSubjectChange}
              className="w-full !p-3 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              placeholder="Select subjects you can help with"
            />
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              Experience Level <span className="text-primary">*</span>
            </Label>
            <div className="grid gap-4">
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <RadioButton
                  name="experienceLevel"
                  value="learning"
                  checked={formData.experienceLevel === "learning"}
                  onChange={handleChange}
                  className="mr-4"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">Still Learning</div>
                  <div className="text-muted">I&apos;m studying this subject but can help others</div>
                </div>
              </label>
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <RadioButton
                  name="experienceLevel"
                  value="comfortable"
                  checked={formData.experienceLevel === "comfortable"}
                  onChange={handleChange}
                  className="mr-4"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">Comfortable</div>
                  <div className="text-muted">I have good knowledge and can explain concepts</div>
                </div>
              </label>
              <label className="box-shadow bg-background p-4 cursor-pointer hover:bg-accent/10 transition-colors">
                <RadioButton
                  name="experienceLevel"
                  value="expert"
                  checked={formData.experienceLevel === "expert"}
                  onChange={handleChange}
                  className="mr-4"
                />
                <div className="inline-block">
                  <div className="font-bold text-lg">Expert</div>
                  <div className="text-muted">I have advanced knowledge or professional experience</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              When are you available? <span className="text-primary">*</span>
            </Label>
            <DropDownList
              data={availabilityOptions}
              textField="text"
              dataItemKey="value"
              value={availabilityOptions.find(item => item.value === formData.availability)}
              onChange={(e) => handleChange({ target: { name: 'availability', value: e.target.value?.value || '' } })}
              className="w-full box-shadow !p-3 !rounded-none border-2 border-foreground !bg-background focus:bg-accent/20 font-medium transition-color"
            />
          </div>

          <div>
            <Label className="block text-lg font-medium mb-4">
              How should students contact you? <span className="text-primary">*</span>
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
              Brief intro <span className="text-muted">(optional)</span>
            </Label>
            <TextArea
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              className="w-full !p-3 border-2 border-foreground bg-background focus:bg-accent/20 font-medium transition-colors"
              rows={4}
              placeholder="e.g., Hi! I'm a Computer Science student who loves helping others understand programming concepts..."
            />
          </div>

          <Button
            type="submit"
            disabled={!!submitting}
            themeColor="primary"
            className="w-full !text-xl !bg-primary !py-4 !font-bold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting…' : 'Start Helping Students'}
          </Button>
        </form>
      </div>
    </div>
  );
}