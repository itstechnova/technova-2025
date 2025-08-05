import React from "react";
import MultiCheckbox from "../hacker/MultiCheckbox";
import CheckOff from "../checkOff";

interface VolunteerRoleFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formError?: string | null;
  onBack?: () => void;
}

const onboardingOptions = [
  "Yes I will attend an onboarding session.",
  "If I'm unable to attend a session, I will watch the recorded onboarding material afterwards.",
];

const areaOfInterestOptions = [
  "Workshop Assistant",
  "Food Bearer",
  "Setup + Cleanup",
  "Ceremonies",
  "Community Events",
  "Check-in + Swag",
  "Tech Support",
];

function VolunteerRoleForm({
  data,
  setData,
  handleChange,
  handleSubmit,
  formError,
  onBack = () => {},
}: VolunteerRoleFormProps) {
  const updateData = (newData: any) => {
    setData((prev: any) => {
      const updated = { ...prev, ...newData };
      sessionStorage.setItem("volunteerRoleData", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-10 md:p-24 flex flex-col h-full bg-navPrimary relative">
      {/* Background SVG graphic */}
      <div className="absolute inset-0 z-7 pointer-events-none">
        <img
          src="/themed_assets/mentor-form.svg"
          alt="Volunteer Forms Graphic Background"
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
            Volunteer Role & Availability Questions
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

          {/* Why you want to be a volunteer */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Why do you want to volunteer at TechNova 2025? (word limit: 200)
            </span>
            <textarea
              name="volunteer_interest"
              value={data.volunteer_interest || ""}
              onChange={(e) => {
                handleChange(e);
                updateData({ volunteer_interest: e.target.value });
              }}
              className="p-2 border rounded min-h-[100px]"
              placeholder="start typing... "
            />
          </div>

          {/* Area of interest */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Which areas are you interested in helping out with (select ALL
              that apply)? 
            </span>
            <MultiCheckbox
              options={areaOfInterestOptions}
              selected={data.area_of_interest}
              onChange={(selected) =>
                updateData({ area_of_interest: selected })
              }
            />
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
              <button
                type="button"
                onClick={onBack}
                className="w-20 h-11 text-xl rounded-xl bg-gray-100 text-gray-800 shadow-sm shadow-navSecondary hover:bg-gray-200"
              >
                ←
              </button>
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

export default VolunteerRoleForm;
