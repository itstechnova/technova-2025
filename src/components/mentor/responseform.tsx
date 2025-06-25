import React from "react";
import Image from "next/image";
import SubmitButton from "../submitButton";
import MultiCheckbox from "../hacker/MultiCheckbox";
import CheckOff from "../checkOff";

interface MentorRoleFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const onboardingOptions = [
  "Yes I will attend an onboarding session.",
  "If I'm unable to attend a session, I will watch the recorded onboarding material afterwards.",
];

const hackathonExperienceOptions = [
  "Attended a hackathon as a hacker.",
  "Attended a hackathon as a mentor.",
  "Never been to a hackathon before.",
  "Other:",
];

const roleOptions = [
  "Industry professional",
  "Upper year post-secondary student.",
  "Other:",
];

const experienceAreasOptions = [
  "Design, UI/UX",
  "Frontend",
  "Backend",
  "Infrastructure",
  "Mobile Development",
  "Data Science, Machine Learning",
  "Project Development and Ideation",
  "Pitch Development",
  "Hardware/Internet of Things",
  "General Hacker Support",
  "Game Development",
  "Other:",
];

const additionalRolesOptions = [
  "Workshop Host: creating & hosting a tech/career-related workshop (one-hour commitment during hackathon weekend).",
  "Workshop Mentor: mentoring a technical workshop (one-hour commitment during hackathon weekend).",
  "Community Lead: leading & engaging in an activity (one-hour commitment during hackathon weekend).",
  "Resume Critiquer: providing feedback for hacker resumes (one-hour commitment during hackathon weekend).",
  "Panel Speaker: sharing personal experiences in a student panel (one-hour commitment, during hackathon weekend).",
  "Judge (Sunday September 29th @12-5pm).",
  "I'm open to any role, as long as I am available!",
];

const referralSourceOptions = [
  "LinkedIn",
  "Facebook",
  "Word of Mouth",
  "Email/Mailing List",
  "University Student Organization/Club",
  "Corporate Opportunity",
  "Other:",
];

const volunteerOptions = [
  "Yes!",
  "No",
];

function MentorRoleForm({
  data,
  setData,
  handleChange,
  handleSubmit,
}: MentorRoleFormProps) {
  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
      {/* Background SVG graphic */}
      <div className="absolute inset-0 z-7 pointer-events-none">
        <img
          src="/hackerformsgraphic.svg"
          alt="Mentor Forms Graphic Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-5 bg-gradient-to-b from-backgroundSecondary to-navPrimary" />
      <div className="pb-5 relative z-10">
        <div className="flex gap-2 items-center pb-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-semibold text-textSecondary">
              Mentor Role & Availability Questions 
            </h1>

          </div>

        
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
                            All mentors and volunteers must go over onboarding materials regarding logistics and conduct around mid August. Do you agree to attend an onboarding session?
            </span>
            <div className="flex flex-col gap-4">
              {onboardingOptions.map((option) => (
                <CheckOff
                  key={option}
                  label={option}
                  name="onboarding"
                  value={option}
                  checked={data.onboarding === option}
                  onChange={(e) =>
                    setData((prev: any) => ({ ...prev, onboarding: e.target.value }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              I have...
            </span>
            <MultiCheckbox
              options={hackathonExperienceOptions}
              selected={data.hackathonExperience}
              onChange={(selected) =>
                setData((prev: any) => ({ ...prev, hackathonExperience: selected }))
              }
              otherValue={data.hackathonExperienceOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({ ...prev, hackathonExperienceOther: val }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Please upload your resume. Note: Please provide a .docx or .pdf file (10MB maximum)
            </span>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleChange}
              name="resume"
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Please list any other links you'd like to share!
            </span>
            <span className="text-sm text-gray-600">ex. LinkedIn, Portfolio, Website, etc.</span>
            <textarea
              name="additionalLinks"
              value={data.additionalLinks || ""}
              onChange={handleChange}
              className="p-2 border rounded min-h-[100px]"
              placeholder="Enter your links here..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              I am a...
            </span>
            <div className="flex flex-col gap-4">
              {roleOptions.map((option) => (
                <CheckOff
                  key={option}
                  label={option}
                  name="role"
                  value={option}
                  checked={data.role === option}
                  onChange={(e) =>
                    setData((prev: any) => ({ ...prev, role: e.target.value }))
                  }
                  otherValue={data.roleOther}
                  onOtherChange={(val) =>
                    setData((prev: any) => ({ ...prev, roleOther: val }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Which of the following areas do you have experience in?
            </span>
            <span className="text-sm text-gray-600">
              Experience can be from work, projects, or mentorship! Please select as many as applicable, and select the ones you'd be comfortable mentoring hackers in.
            </span>
            <MultiCheckbox
              options={experienceAreasOptions}
              selected={data.experienceAreas}
              onChange={(selected) =>
                setData((prev: any) => ({ ...prev, experienceAreas: selected }))
              }
              otherValue={data.experienceAreasOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({ ...prev, experienceAreasOther: val }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Are there any specific areas you want to provide mentorship in?
            </span>
            <span className="text-sm text-gray-600">
              Note: This can be a specific coding language, a tech stack, any design softwares, etc. 
            </span>
            <textarea
              name="specificMentorship"
              value={data.specificMentorship || ""}
              onChange={handleChange}
              className="p-2 border rounded min-h-[100px]"
              placeholder="ex. Java, Figma, etc."
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Beyond mentoring with us, are you interested in helping out with any of the following (select ALL that apply):
            </span>
            <span className="text-sm text-gray-600">
              Note: this is not binding and we will not assign all to you, we are just gauging potential distributions. We will follow-up with you if there is a good fit!
            </span>
            <MultiCheckbox
              options={additionalRolesOptions}
              selected={data.additionalRoles}
              onChange={(selected) =>
                setData((prev: any) => ({ ...prev, additionalRoles: selected }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Where did you hear about our mentorship opportunity?
            </span>
            <MultiCheckbox
              options={referralSourceOptions}
              selected={data.referralSource}
              onChange={(selected) =>
                setData((prev: any) => ({ ...prev, referralSource: selected }))
              }
              otherValue={data.referralSourceOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({ ...prev, referralSourceOther: val }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              If there is a specific organization or TechNova organizer that led you to this opportunity, please specify!
            </span>

            <textarea
              name="specificReferral"
              value={data.specificReferral || ""}
              onChange={handleChange}
              className="p-2 border rounded min-h-[100px]"
              placeholder="ex. name, etc.."
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Are you interested in participating as a volunteer if not chosen as a mentor?
            </span>
            <div className="flex flex-col gap-4">
              {volunteerOptions.map((option) => (
                <CheckOff
                  key={option}
                  label={option}
                  name="volunteerInterest"
                  value={option}
                  checked={data.volunteerInterest === option}
                  onChange={(e) =>
                    setData((prev: any) => ({ ...prev, volunteerInterest: e.target.value }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Any additional comments?
            </span>
            <textarea
              name="additionalComments"
              value={data.additionalComments || ""}
              onChange={handleChange}
              className="p-2 border rounded min-h-[100px]"
              placeholder="ex. specific availability, questions, ideas, etc."
            />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <SubmitButton>Submit</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default MentorRoleForm;