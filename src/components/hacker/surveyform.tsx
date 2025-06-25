import React from "react";
import Image from "next/image";
import SubmitButton from "../submitButton";
import MultiCheckbox from "./MultiCheckbox";

interface HackerSurveyFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const careerSessionsOptions = [
  "Building your personal website.",
  "Starting your design portfolio",
  "How to pitch yourself/How to network/Personal branding",
  "LinkedIn 101",
  "Resume Writing and/or Resume feedback session",
  "How to pitch your project",
  "Getting an internship/Interview prepping",
  "How to make the most out of your internship",
  "Other:",
];

const communitySessionsOptions = [
  "Speed friending",

  "Speed team-finding",
  "Team bonding",
  "Virtual socials/meetups (eg. high schoolers, first years, LGBTQIA+, BIPOC, etc)",
  "Game nights",
  "Mentorship panel",
  "Other:",
];

const technicalSessionsOptions = [
  "Python",
  "Java",
  "Web development (eg. HTML/CSS/React)",
  "Mobile development (iOS/Android apps)",
  "UI/UX design (eg. Figma)",
  "Databases",
  "API’s",
  "Git",
  "Artificial Intelligence/Machine Learning",
  "Game development",
  "Chrome extensions",
  "Discord bots",
  "Data Science",
  "Project Management",
  "Networking",
  "Other:",
];

const themedSessionsOptions = [
  "Accessibility & tech",
  "Finding your place in tech",
  "Sponsored Ask Me Anything (AMA) panels",
  "Diversity, Equity & Inclusion",
  "Other:",
];

const techIndustriesOptions = [
  "Big Data",
  "Cryptocurrencies (Bitcoin, etc.)",
  "Web development (eg. HTML/CSS/React)",
  "E-commerce",
  "Internet of Things",
  "Finance Tech [FinTech]",
  "Business Intelligence",
  "Artificial Intelligence/Machine Learning",
  "Robotics",
  "Autonomous Vehicles",
  "AR/VR",
  "Healthcare",
  "Mobile Development",
  "Data Science",
  "Quant",
  "Human-Computer Interaction",
  "Bioinformatics",
  "Game Development",
  "Other:",
];

const techFieldsOptions = [
  "General software engineering",
  "Full stack",
  "Backend",
  "Frontend",
  "Infrastructure",
  "Data engineering",
  "Mobile",
  "Data science/Machine learning",
  "Hardware/Embedded",
  "UI/UX design",
  "Product/Project/Program management",
  "Game Development",
  "Automation/QA",
  "Other:",
];

function HackerSurveyForm({
  data,
  setData,
  handleChange,
  handleSubmit,
}: HackerSurveyFormProps) {
  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
      {/* Background SVG graphic */}
      <div className="absolute inset-0 z-7 pointer-events-none">
        <img
          src="/hackerformsgraphic.svg"
          alt="Hacker Forms Graphic Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-5 bg-gradient-to-b from-backgroundSecondary to-navPrimary" />
      <div className="pb-5 relative z-10">
        <div className="flex gap-2 items-center pb-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-semibold text-textSecondary">
              What Would You Like to See at the Event? 🎉{" "}
            </h1>
            <span>
              Please note these are an early list so we cannot guarantee they
              will be at the event. However, you can help us figure out which
              ones you’d find most helpful! List any ideas you have in the other
              sections too!
            </span>
          </div>
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What career sessions would be most useful to you? (Choose your top
              5)
            </span>
            <MultiCheckbox
              options={careerSessionsOptions}
              selected={data.careerSessions}
              onChange={(selected) =>
                setData((prev: any) => ({ ...prev, careerSessions: selected }))
              }
              otherValue={data.careerSessionsOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({ ...prev, careerSessionsOther: val }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What community sessions would you be most interested in attending?{" "}
            </span>
            <MultiCheckbox
              options={communitySessionsOptions}
              selected={data.communitySessions}
              onChange={(selected) =>
                setData((prev: any) => ({
                  ...prev,
                  communitySessions: selected,
                }))
              }
              otherValue={data.communitySessionsOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({
                  ...prev,
                  communitySessionsOther: val,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What "Intro to ..." technical sessions would you be most
              interested in attending? (Choose your top 5)
            </span>
            <MultiCheckbox
              options={technicalSessionsOptions}
              selected={data.technicalSessions}
              onChange={(selected) =>
                setData((prev: any) => ({
                  ...prev,
                  technicalSessions: selected,
                }))
              }
              otherValue={data.technicalSessionsOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({
                  ...prev,
                  technicalSessionsOther: val,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Which themed technology sessions would you be most interested in
              attending?
            </span>
            <MultiCheckbox
              options={themedSessionsOptions}
              selected={data.themedSessions}
              onChange={(selected) =>
                setData((prev: any) => ({
                  ...prev,
                  themedSessionsOptions: selected,
                }))
              }
              otherValue={data.themedSessionsOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({ ...prev, themedSessionsOther: val }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What technology industries would you be most interested in
              learning about at the event? (Choose your top 5){" "}
            </span>
            <MultiCheckbox
              options={techIndustriesOptions}
              selected={data.techIndustries}
              onChange={(selected) =>
                setData((prev: any) => ({ ...prev, techIndustries: selected }))
              }
              otherValue={data.techIndustriesOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({ ...prev, techIndustriesOther: val }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What field(s) would you be interested in learning about at
              TechNova? (Choose your top 5){" "}
            </span>
            <MultiCheckbox
              options={techFieldsOptions}
              selected={data.techFields}
              onChange={(selected) =>
                setData((prev: any) => ({ ...prev, techFields: selected }))
              }
              otherValue={data.techFieldsOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({ ...prev, techFieldsOther: val }))
              }
            />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <SubmitButton>→</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default HackerSurveyForm;
