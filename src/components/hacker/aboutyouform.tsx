import React, { useEffect } from "react";
import Image from "next/image";
import ShortAnswerQuestion from "../shortanswerq";
import SubmitButton from "../submitButton";
import CheckOff from "../checkOff";
import UniversityDropdown from "./UniversityDropdown";
import MultiCheckbox from "./MultiCheckbox";

interface HackerAboutYouFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const tshirtSizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const levelOfStudyOptions = [
  "Less than Secondary / High School",
  "Secondary / High School",
  "Undergraduate University (2 year - community college or similar)",
  "Undergraduate University (3+ year)",
  "Graduate University (Masters, Professional, Doctoral, etc)",
  "Code School / Bootcamp",
  "Other Vocational / Trade Program or Apprenticeship",
  "Post Doctorate",
  "I'm not currently a student",
  "Prefer not to answer",
  "Other:",
];
const graduatingYearOptions = [
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031+",
  "Other:",
];
const hackathonCountOptions = ["This will be my first!", "1", "2", "3", "4+"];
const wordOfMouthOptions = [
  "Facebook",
  "Instagram",
  "Discord",
  "Slack",
  "Twitter",
  "Linkedin",
  "Math mailing list",
  "Engineering mailing list",
  "Orientation mailing list",
  "Word of mouth",
  "Other:",
];

function HackerAboutYouForm({
  data,
  setData,
  handleChange,
  handleSubmit,
}: HackerAboutYouFormProps) {
  const updateData = (newData: any) => {
    setData((prev: any) => {
      const updated = { ...prev, ...newData };
      sessionStorage.setItem("hackerAboutYouData", JSON.stringify(updated));
      console.log(updated);
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
          <h1 className="text-5xl font-semibold text-textSecondary">
            Let's get to know you better!
          </h1>
          <Image
            src="/themed_assets/sunflower.svg"
            alt="sunflower"
            width={40}
            height={40}
          />
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          <div className="grid grid-cols-2 gap-10 w-full">
            <ShortAnswerQuestion
              question="What's your first name?"
              name="firstName"
              id="firstName"
              placeholder="ex. Jane"
              value={data.firstName}
              onChange={(e) => {
                handleChange(e);
                updateData({ firstName: e.target.value });
              }}
              required
            />
            <ShortAnswerQuestion
              question="What's your last name?"
              name="lastName"
              id="lastName"
              placeholder="ex. Smith"
              value={data.lastName}
              onChange={(e) => {
                handleChange(e);
                updateData({ lastName: e.target.value });
              }}
              required
            />
          </div>

          {/* Pronouns */}
          <ShortAnswerQuestion
            question="What are your pronouns?"
            name="pronouns"
            id="pronouns"
            placeholder="ex. she/her/hers (all lowercase)"
            value={data.pronouns}
            onChange={(e) => {
              handleChange(e);
              updateData({ pronouns: e.target.value });
            }}
            required
          />

          {/* T-shirt size section */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Using the sizing guide below, what t-shirt size are you (unisex
              sizing)?
            </span>
            <span className="text-base font-semibold">
              Disclaimer:
              <span className="font-normal">
                {" "}
                The supply for sizes vary, in the event there are no XS, hackers
                will be sent a S.
              </span>
            </span>
            <Image
              src="/sizingchart.svg"
              alt="sizing chart"
              className="w-auto my-2"
              width={800}
              height={160}
            />
            <span className="text-base">*Measurements given in inches.</span>
            <div className="flex flex-col gap-2 mt-2">
              {tshirtSizeOptions.map((size) => (
                <CheckOff
                  key={size}
                  label={size}
                  name="tshirtSize"
                  value={size}
                  checked={data.tshirtSize === size}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ tshirtSize: e.target.value });
                  }}
                  required
                />
              ))}
            </div>
          </div>

          {/* Level of study section */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What is your current level of study?
            </span>
            <span className="text-base font-semibold">
              Note:
              <span className="font-normal">
                {" "}
                If you are in between levels, what level will you be going into
                in the Fall 2025 term?
              </span>
            </span>
            <div className="flex flex-col gap-2 mt-2">
              {levelOfStudyOptions.map((level) => (
                <CheckOff
                  key={level}
                  label={level}
                  name="levelOfStudy"
                  value={level}
                  checked={data.levelOfStudy === level}
                  onChange={(e) => {
                    handleChange(e);
                    if (level === "Other:") {
                      updateData({ levelOfStudy: "Other:" });
                    } else {
                      updateData({
                        levelOfStudy: e.target.value,
                        levelOfStudyOther: "",
                      });
                    }
                  }}
                  otherValue={
                    level === "Other:" ? data.levelOfStudyOther : undefined
                  }
                  onOtherChange={
                    level === "Other:"
                      ? (val) => updateData({ levelOfStudyOther: val })
                      : undefined
                  }
                  required
                />
              ))}
            </div>
          </div>

          {/* Graduating Year */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What year will you be graduating? 
            </span>
            <span className="font-normal">
              (Based on the education level you had selected above)
            </span>

            <div className="flex flex-col gap-2 mt-2">
              {graduatingYearOptions.map((year) => (
                <CheckOff
                  key={year}
                  label={year}
                  name="graduatingYear"
                  value={year}
                  checked={data.graduatingYear === year}
                  onChange={(e) => {
                    handleChange(e);
                    if (year === "Other:") {
                      updateData({ graduatingYear: "Other:" });
                    } else {
                      updateData({
                        graduatingYear: e.target.value,
                        graduatingYearOther: "",
                      });
                    }
                  }}
                  otherValue={
                    year === "Other:" ? data.graduatingYearOther : undefined
                  }
                  onOtherChange={
                    year === "Other:"
                      ? (val) => updateData({ graduatingYearOther: val })
                      : undefined
                  }
                  required
                />
              ))}
            </div>
          </div>

          {/* University section */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Please select which institution you are/will be attending in Fall
              2025.
            </span>
            <UniversityDropdown
              value={data.university}
              otherValue={data.universityOther}
              onChange={(e) => {
                handleChange(e);
                if (e.target.value === "Other:") {
                  updateData({ university: "Other:" });
                } else {
                  updateData({
                    university: e.target.value,
                    universityOther: "",
                  });
                }
              }}
              onOtherChange={(val) => updateData({ universityOther: val })}
              required
            />
          </div>

          <ShortAnswerQuestion
            question="What program are you in?"
            note="If in Highschool, what is your program of interest?"
            name="major"
            id="major"
            placeholder="ex. Systems Design Engineering"
            value={data.major}
            onChange={(e) => {
              handleChange(e);
              updateData({ major: e.target.value });
            }}
            required
          />

          {/* Hackathon count section */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              How many hackathons have you been to?
            </span>
            <div className="flex flex-col gap-2">
              {hackathonCountOptions.map((count) => (
                <CheckOff
                  key={count}
                  label={count}
                  name="hackathonCount"
                  value={count}
                  checked={data.hackathonCount === count}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ hackathonCount: e.target.value });
                  }}
                  required
                />
              ))}
            </div>
          </div>

          {/* How did you hear about us? */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              How did you hear about us?
            </span>
            <MultiCheckbox
              options={wordOfMouthOptions}
              selected={data.hearAboutUs}
              onChange={(selected) => updateData({ hearAboutUs: selected })}
              otherValue={data.hearAboutUsOther}
              onOtherChange={(val) => updateData({ hearAboutUsOther: val })}
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

export default HackerAboutYouForm;
