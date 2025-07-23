import React, { useEffect } from "react";
import Image from "next/image";
import ShortAnswerQuestion from "../shortanswerq";
import CheckOff from "../checkOff";
import AvailabilityGrid from "./AvailabilityGrid";

interface MentorAboutYouFormProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const genderIdentityOptions = [
  "Female",
  "Male",
  "Non-binary",
  "Prefer not to say",
  "Other:",
];
const mentorInPersonOptions = ["Yes!", "No", "Maybe"];
const tshirtSizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

function MentorAboutYouForm({
  data,
  setData,
  handleChange,
  handleSubmit,
}: MentorAboutYouFormProps) {
  const [availability, setAvailability] = React.useState<boolean[][]>(
    data.availability ?? Array.from({ length: 10 }, () => Array(3).fill(false))
  );

  useEffect(() => {
    if (Array.isArray(data.availability)) {
      setAvailability(data.availability);
    }
  }, [data.availability]);

  const updateData = (newData: any) => {
    setData((prev: any) => {
      const updated = { ...prev, ...newData };
      sessionStorage.setItem("mentorAboutYouData", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
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
          <h1 className="text-5xl font-semibold text-textSecondary">
            Let’s get to know you better! 🌷
          </h1>
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          <div className="grid grid-cols-2 gap-10 w-full">
            <ShortAnswerQuestion
              question="What's your first name?"
              name="first_name"
              id="first_name"
              placeholder="ex. Jane"
              value={data.first_name}
              onChange={(e) => {
                handleChange(e);
                updateData({ first_name: e.target.value });
              }}
            />
            <ShortAnswerQuestion
              question="What's your last name?"
              name="last_name"
              id="last_name"
              placeholder="ex. Smith"
              value={data.last_name}
              onChange={(e) => {
                handleChange(e);
                updateData({ last_name: e.target.value });
              }}
            />
          </div>
          <ShortAnswerQuestion
            question="What's your phone number?"
            name="phone_number"
            id="phone_number"
            placeholder="ex. 226-111-1111"
            value={data.phone_number}
            onChange={(e) => {
              handleChange(e);
              updateData({ phone_number: e.target.value });
            }}
          />

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
          />

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What’s your gender identity?
            </span>
            <div className="flex flex-col gap-2 mt-2">
              {genderIdentityOptions.map((gender) => (
                <CheckOff
                  key={gender}
                  label={gender}
                  name="gender_identity"
                  value={gender}
                  checked={data.gender_identity === gender}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ gender_identity: e.target.value });
                  }}
                  otherValue={
                    gender === "Other:" ? data.gender_identity_other : undefined
                  }
                  onOtherChange={
                    gender === "Other:"
                      ? (val) =>
                          updateData({
                            gender_identity: "Other:",
                            gender_identity_other: val,
                          })
                      : undefined
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Are you able to mentor in person in Waterloo for the duration of
              the hackathon (Sep. 27-29)?
            </span>
            <span className="text-base font-semibold">
              Note:
              <span className="font-normal">
                {" "}
                All volunteers must be in person; mentors are highly recommended
                to be in person.
              </span>
            </span>
            <div className="flex flex-col gap-2 mt-2">
              {mentorInPersonOptions.map((option) => (
                <CheckOff
                  key={option}
                  label={option}
                  name="in_person_option"
                  value={option}
                  checked={data.in_person_option === option}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ in_person_option: e.target.value });
                  }}
                />
              ))}
            </div>
          </div>

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
                The supply for sizes vary, in the event there are no XS, mentors
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
                  name="tshirt_size"
                  value={size}
                  checked={data.tshirt_size === size}
                  onChange={(e) => {
                    handleChange(e);
                    updateData({ tshirt_size: e.target.value });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Availability section */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              Please indicate the times you are NOT AVAILABLE during the event
              (all times in EDT).
            </span>
            <span className="text-base font-semibold">
              Note:
              <span className="font-normal">
                {" "}
                These are to gauge availability and are not binding!
              </span>
            </span>
            <AvailabilityGrid
              availability={availability}
              setAvailability={setAvailability}
              updateData={updateData}
            />
          </div>
        </div>
        <div className="pb-36 flex justify-end pt-10 pr-10">
          <button
            type="submit"
            className="bg-buttonSecondary px-8 py-3 text-white text-xl 
                     rounded-xl shadow-sm"
          >
            →
          </button>
        </div>
      </form>
    </div>
  );
}

export default MentorAboutYouForm;
