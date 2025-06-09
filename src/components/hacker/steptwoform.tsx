import React from "react";
import SubmitButton from "../submitButton";
import CheckOff from "../checkOff";

interface HackerStepTwoFormProps {
  data: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function HackerStepTwoForm({
  data,
  handleChange,
  handleSubmit,
}: HackerStepTwoFormProps) {
  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
      {/* Background SVG graphic */}
      <div className="absolute inset-0 z-7 pointer-events-none">
        <img
          src="/goose.svg"
          alt="Goose Graphic Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-5 bg-gradient-to-b from-backgroundSecondary to-navPrimary" />
      <div className="pb-5 relative z-10">
        <div className="pb-10">
          <h1 className="text-5xl font-semibold text-textSecondary">
            MLH Requirements
          </h1>
          <br></br>
          <br></br>
          <p>
            We are currently in the process of partnering with MLH. The
            following 3 checkboxes are for this partnership. If we do not end up
            partnering with MLH, your information will not be shared. All
            hackers MUST agree to the first two checkboxes however, the third
            checkbox is optional.
          </p>
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          {/* First MLH Requirement */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              "I have read and agree to the{" "}
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                className="underline font-bold text-base"
              >
                MLH Code of Conduct
              </a>
              ."
            </span>
            <div className="flex flex-col gap-2 mt-2">
              <CheckOff
                type="checkbox"
                key="requirement1"
                label="I agree!"
                name="mandatoryRequirement1"
                value="agree"
                checked={data.mandatoryRequirement1 === "agree"}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Second MLH Requirement */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              “I authorize you to share my application/registration information
              with Major League Hacking for event administration, ranking, and
              MLH administration in-line with the{" "}
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                className="underline font-bold text-base"
              >
                MLH Privacy Policy
              </a>
              . I further agree to the terms of both the{" "}
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                className="underline font-bold text-base"
              >
                MLH Contest Terms and Conditions
              </a>{" "}
              and the{" "}
              <a
                href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                className="underline font-bold text-base"
              >
                MLH Privacy Policy
              </a>
              .”
            </span>
            <div className="flex flex-col gap-2 mt-2">
              <CheckOff
                type="checkbox"
                key="requirement2"
                label="I agree!"
                name="mandatoryRequirement2"
                value="agree"
                checked={data.mandatoryRequirement2 === "agree"}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Third MLH Requirement */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              “I authorize MLH to send me occasional emails about relevant
              events, career opportunities, and community announcements."
              (Optional)
            </span>
            <div className="flex flex-col gap-2 mt-2">
              <CheckOff
                type="checkbox"
                key="requirement3"
                label="I agree!"
                name="optional"
                value="agree"
                checked={data.optional === "agree"}
                onChange={handleChange}
              />
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

export default HackerStepTwoForm;
