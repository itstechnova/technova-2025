import React from "react";
import Image from "next/image";
import SubmitButton from "../submitButton";
import CheckOff from "../checkOff";
import MultiCheckbox from "./MultiCheckbox";

interface HackerDemographicFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ethnicityOptions = [
  "Hispanic/Latinx",
  "Black/African Descent",
  "Indigenous",
  "Middle Eastern",
  "Native Hawaiian/Pacific Islander",
  "East Asian",
  "Southeast Asian",
  "South Asian",
  "Central Asian",
  "White or Caucasian",
  "Other:",
];

const genderOptions = ["Female", "Male", "Non-binary", "Other:"];

const minorityCategoriesOptions = [
  "LGBTQIA2S+",
  "Immigrant",
  "BIPOC",
  "Indigenous person",
  "Person with a disability (visible/invisible)",
  "First-Generation college student",
  "Person from a low-income household",
];

const firstToPursueTechOptions = ["Yes", "No"];

const timeStudyingTechOptions = ["Less than 1 year", "1-2 years", "3+ years"];

function HackerDemographicForm({
  data,
  setData,
  handleChange,
  handleSubmit,
}: HackerDemographicFormProps) {
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
              Demographic Questions 🗺️
            </h1>
            <p>
              One of our most important team pillars is diversity and we would
              like to better understand the backgrounds of our applicants in
              order to gain insight into how to improve accessibility as an
              organization. The following questions have no effect on your
              application other than being used for statistical purposes to
              better forward our event's mission. 💡
            </p>
            <p>
              Your information will be kept confidential in accordance with our
              <a href="https://mlh.io/privacy" className="underline ml-1">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What is your ethnicity? Select all that apply.
            </span>
            <MultiCheckbox
              options={ethnicityOptions}
              selected={data.ethnicity}
              onChange={(selected) =>
                setData((prev: any) => ({ ...prev, ethnicity: selected }))
              }
              otherValue={data.ethnicityOther}
              onOtherChange={(val) =>
                setData((prev: any) => ({ ...prev, ethnicityOther: val }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What’s your gender identity?
            </span>
            <div className="flex flex-col gap-2">
              {genderOptions.map((option) => (
                <CheckOff
                  key={option}
                  name="gender"
                  value={option}
                  label={option}
                  checked={data.gender === option}
                  onChange={handleChange}
                  otherValue={
                    option === "Other:" ? data.genderOther : undefined
                  }
                  onOtherChange={
                    option === "Other:"
                      ? (val) =>
                          setData((prev: any) => ({
                            ...prev,
                            genderOther: val,
                          }))
                      : undefined
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Are any of the following categories relevant to you? Please select
              all that apply.
            </span>
            <MultiCheckbox
              options={minorityCategoriesOptions}
              selected={data.minorityCategories}
              onChange={(selected) =>
                setData((prev: any) => ({
                  ...prev,
                  minorityCategories: selected,
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              If you are pursuing technology, are you the first in your
              immediate family to pursue tech?
            </span>
            <div className="flex flex-col gap-2">
              {firstToPursueTechOptions.map((choice) => (
                <CheckOff
                  key={choice}
                  name="firstToPursueTech"
                  value={choice}
                  label={choice}
                  checked={data.firstToPursueTech === choice}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              How long have you been studying, working, or self-learning in tech
              (if applicable)?
            </span>
            <div className="flex flex-col gap-2">
              {timeStudyingTechOptions.map((time) => (
                <CheckOff
                  key={time}
                  name="timeStudyingTech"
                  value={time}
                  label={time}
                  checked={data.timeStudyingTech === time}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <SubmitButton>→</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default HackerDemographicForm;
