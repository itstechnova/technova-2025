import React from "react";
import SubmitButton from "../submitButton";
import MultiCheckbox from "../hacker/MultiCheckbox";
import CheckOff from "../checkOff";
import { Button } from "../base-ui/button";
interface MentorRoleFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleResumeUpload: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | Promise<void>;
  formError?: string | null;
  onBack?: () => void;
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

const volunteerOptions = ["Yes!", "No"];

function MentorRoleForm({
  data,
  setData,
  handleChange,
  handleSubmit,
  handleResumeUpload,
  formError,
  onBack = () => {},
}: MentorRoleFormProps) {
  const updateData = (newData: any) => {
    setData((prev: any) => {
      const updated = { ...prev, ...newData };
      sessionStorage.setItem("mentorRoleData", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-10 md:p-24 flex flex-col h-full bg-navPrimary relative">
      {/* Background SVG graphic */}
      <div className="absolute inset-0 z-7 pointer-events-none">
        <img
          src="/mentorFormGraphic.svg"
          alt="Mentor Forms Graphic Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="fixed inset-x-0 top-0 h-1/3 pointer-events-none z-0
                 bg-gradient-to-b from-backgroundTertiary to-transparent"
      />
      <div className="pb-5 relative z-10">
        <div className="flex gap-2 items-center pb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary">
            Mentor Role & Availability Questions
          </h1>
        </div>
      </div>
      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          {/* Onboarding */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              All mentors and volunteers must go over onboarding materials
              regarding logistics and conduct around mid August. Do you agree to
              attend an onboarding session?*
            </span>
            <div className="flex flex-col gap-4">
              {onboardingOptions.map((option) => (
                <CheckOff
                  key={option}
                  label={option}
                  name="onboarding"
                  value={option}
                  checked={data.onboarding === option}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ onboarding: e.target.value });
                  }}
                />
              ))}
            </div>
          </div>
          {/* Hackathon Experience */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">I have...*</span>
            <MultiCheckbox
              options={hackathonExperienceOptions}
              selected={data.hackathon_experience}
              onChange={(selected) =>
                updateData({ hackathon_experience: selected })
              }
              otherValue={data.hackathon_experience_other}
              onOtherChange={(val) => updateData({ hackathon_experience: val })}
            />
          </div>
          {/* Resume Upload */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Please upload your resume. Note: Please provide a .docx or .pdf
              file (10MB maximum)*
            </span>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => {
                handleResumeUpload(e);
                updateData({ resume: e.target.value });
              }}
              name="resume"
              className="p-2 border rounded"
            />

            {data.resume && typeof data.resume === "string" && (
              <a
                href={data.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View uploaded resume
              </a>
            )}
          </div>
          {/* Additional Links */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Please list any other links you'd like to share!
            </span>
            <span className="text-sm text-gray-600">
              ex. LinkedIn, Portfolio, Website, etc.
            </span>
            <textarea
              name="additional_links"
              value={data.additional_links || ""}
              onChange={(e) => {
                handleChange(e);
                updateData({ additional_links: e.target.value });
              }}
              className="p-2 border rounded min-h-[100px]"
              placeholder="Enter your links here..."
            />
          </div>
          {/* Role */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">I am a...*</span>
            <div className="flex flex-col gap-4">
              {roleOptions.map((option) => (
                <CheckOff
                  key={option}
                  label={option}
                  name="role"
                  value={option}
                  checked={data.role === option}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ role: e.target.value });
                  }}
                  otherValue={data.role_other}
                  onOtherChange={(val) => updateData({ role_other: val })}
                />
              ))}
            </div>
          </div>
          {/* Experience Areas */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Which of the following areas do you have experience in?*
            </span>
            <span className="text-sm text-gray-600">
              Experience can be from work, projects, or mentorship! Please
              select as many as applicable, and select the ones you'd be
              comfortable mentoring hackers in.
            </span>
            <MultiCheckbox
              options={experienceAreasOptions}
              selected={data.experience_areas}
              onChange={(selected) =>
                updateData({ experience_areas: selected })
              }
              otherValue={data.experience_areas_other}
              onOtherChange={(val) =>
                updateData({ experience_areas_other: val })
              }
            />
          </div>
          {/* Specific Mentorship */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Are there any specific areas you want to provide mentorship in?*
            </span>
            <span className="text-sm text-gray-600">
              Note: This can be a specific coding language, a tech stack, any
              design softwares, etc.
            </span>
            <textarea
              name="specific_mentorship"
              value={data.specific_mentorship || ""}
              onChange={(e) => {
                handleChange(e);
                updateData({ specific_mentorship: e.target.value });
              }}
              className="p-2 border rounded min-h-[100px]"
              placeholder="ex. Java, Figma, etc."
            />
          </div>
          {/* Additional Roles */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Beyond mentoring with us, are you interested in helping out with
              any of the following (select ALL that apply):*
            </span>
            <span className="text-sm text-gray-600">
              Note: this is not binding and we will not assign all to you, we
              are just gauging potential distributions. We will follow-up with
              you if there is a good fit!
            </span>
            <MultiCheckbox
              options={additionalRolesOptions}
              selected={data.additional_roles}
              onChange={(selected) =>
                updateData({ additional_roles: selected })
              }
            />
          </div>
          {/* Referral Source */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Where did you hear about our mentorship opportunity?
            </span>
            <MultiCheckbox
              options={referralSourceOptions}
              selected={data.referral_source}
              onChange={(selected) => updateData({ referral_source: selected })}
              otherValue={data.referral_source_other}
              onOtherChange={(val) =>
                updateData({ referral_source_other: val })
              }
            />
          </div>
          {/* Specific Referral */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              If there is a specific organization or TechNova organizer that led
              you to this opportunity, please specify!
            </span>
            <textarea
              name="specific_referral"
              value={data.specific_referral || ""}
              onChange={(e) => {
                handleChange(e);
                updateData({ specific_referral: e.target.value });
              }}
              className="p-2 border rounded min-h-[100px]"
              placeholder="ex. name, etc.."
            />
          </div>
          {/* Volunteer Interest */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Are you interested in participating as a volunteer if not chosen
              as a mentor?*
            </span>
            <div className="flex flex-col gap-4">
              {volunteerOptions.map((option) => (
                <CheckOff
                  key={option}
                  label={option}
                  name="volunteer_interest"
                  value={option}
                  checked={data.volunteer_interest === option}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ volunteer_interest: e.target.value });
                  }}
                />
              ))}
            </div>
          </div>
          {/* Additional Comments */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Any additional comments?
            </span>
            <textarea
              name="additional_comments"
              value={data.additional_comments || ""}
              onChange={(e) => {
                handleChange(e);
                updateData({ additional_comments: e.target.value });
              }}
              className="p-2 border rounded min-h-[100px]"
              placeholder="ex. specific availability, questions, ideas, etc."
            />
          </div>
        </div>
        <div className="mt-10">
          {formError && <p className="text-red-500">{formError}</p>}
          <div className="flex justify-between items-center mt-2">
            {onBack && (
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={onBack}
              >
                ←
              </Button>
            )}
            <button
              type="submit"
              className="px-8 py-2 text-xl rounded-xl bg-gradient-to-r from-navSecondary to-navSecondaryHover bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-300 text-white shadow-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MentorRoleForm;
