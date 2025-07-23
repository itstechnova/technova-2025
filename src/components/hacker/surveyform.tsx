import React, { useEffect } from "react";
import SubmitButton from "../submitButton";
import MultiCheckbox from "./MultiCheckbox";

interface HackerSurveyFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formError: string | null;
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
  formError,
}: HackerSurveyFormProps) {
  useEffect(() => {
    const savedData = sessionStorage.getItem("hackerSurveyData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, [setData]);

  const updateData = (newData: any) => {
    setData((prev: any) => {
      const updated = { ...prev, ...newData };
      sessionStorage.setItem("hackerSurveyData", JSON.stringify(updated));
      console.log("Updated data:", updated);
      return updated;
    });
  };

  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
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
              selected={data.career_sessions}
              onChange={(selected) => updateData({ career_sessions: selected })}
              otherValue={data.career_sessions_other}
              onOtherChange={(val) =>
                updateData({ career_sessions_other: val })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What community sessions would you be most interested in attending?{" "}
            </span>
            <MultiCheckbox
              options={communitySessionsOptions}
              selected={data.community_sessions}
              onChange={(selected) =>
                updateData({ community_sessions: selected })
              }
              otherValue={data.community_sessions_other}
              onOtherChange={(val) =>
                updateData({ community_sessions_other: val })
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
              selected={data.technical_sessions}
              onChange={(selected) =>
                updateData({ technical_sessions: selected })
              }
              otherValue={data.technical_sessions_other}
              onOtherChange={(val) =>
                updateData({ technical_sessions_other: val })
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
              selected={data.themed_sessions}
              onChange={(selected) => updateData({ themed_sessions: selected })}
              otherValue={data.themed_sessions_other}
              onOtherChange={(val) =>
                updateData({ themed_sessions_other: val })
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
              selected={data.tech_industries}
              onChange={(selected) => updateData({ tech_industries: selected })}
              otherValue={data.tech_industries_other}
              onOtherChange={(val) =>
                updateData({ tech_industries_other: val })
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
              selected={data.tech_fields}
              onChange={(selected) => updateData({ tech_fields: selected })}
              otherValue={data.tech_fields_other}
              onOtherChange={(val) => updateData({ tech_fields_other: val })}
            />
          </div>
        </div>
        <div className="flex flex-col mt-24 gap-2 items-end">
          {formError && <p className="text-red-500">{formError}</p>}
          <SubmitButton>→</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default HackerSurveyForm;
