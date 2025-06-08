import React from "react";
import Image from "next/image";
import ShortAnswerQuestion from "../shortanswerq";
import CheckOff from "../checkOff";
import AvailabilityGrid from "./AvailabilityGrid";

interface HackerStepOneFormProps {
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
  "Perfer not to say",
  "Other:",
];
const mentorInPersonOptions = ["Yes!", "No", "Maybe"];
const tshirtSizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

function MentorStepOneForm({
  data,
  setData,
  handleChange,
  handleSubmit,
}: HackerStepOneFormProps) {
  const initialAvailability = Array.from({ length: 10 }, () =>
    Array(3).fill(false)
  );
  const [availability, setAvailability] = React.useState<boolean[][]>(
    Array.from({ length: 10 }, () => Array(3).fill(false))
  );

  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
      {/* Background SVG graphic */}
      <div className="absolute inset-0 z-7 pointer-events-none">
        {/* TODO: Crop the svg to fit the screen better */}
        <img
          src="/mentorFormGraphic.svg"
          alt="Hacker Forms Graphic Background"
          className="w-full h-full object-cover"
        />
        <div
          className="fixed inset-x-0 top-0 h-1/3 pointer-events-none z-0
                   bg-gradient-to-b from-backgroundTertiary to-transparent"
        />
      </div>
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
              name="firstName"
              id="firstName"
              placeholder="ex. Jane"
              value={data.firstName}
              onChange={handleChange}
            />
            <ShortAnswerQuestion
              question="What's your last name?"
              name="lastName"
              id="lastName"
              placeholder="ex. Smith"
              value={data.lastName}
              onChange={handleChange}
            />
          </div>
          <ShortAnswerQuestion
            question="What's your phone number?"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="ex. 226-111-1111"
            value={data.phoneNumber}
            onChange={handleChange}
          />

          <ShortAnswerQuestion
            question="What are your pronouns?"
            name="pronouns"
            id="pronouns"
            placeholder="ex. she/her/hers (all lowercase)"
            value={data.pronouns}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-2">
            <span className="font-bold text-base">
              What’s your gender identity?
            </span>
            <div className="flex flex-col gap-2 mt-2">
              {genderIdentityOptions.map((gender) => (
                <label key={gender} className="flex items-end gap-2 w-full">
                  <CheckOff
                    label={gender}
                    name="genderIdentity"
                    value={gender}
                    checked={data.genderIdentity === gender}
                    onChange={handleChange}
                  />
                  {gender === "Other:" && (
                    <input
                      type="text"
                      name="genderIdentityOther"
                      value={data.genderIdentityOther || ""}
                      onChange={(e) => {
                        setData((prev: any) => ({
                          ...prev,
                          levelOfStudy: "Other:",
                          levelOfStudyOther: e.target.value,
                        }));
                      }}
                      className="flex-1 border-0 border-b border-textPrimary bg-transparent ml-2 text-base focus:outline-none focus:ring-0 focus:border-textPrimary"
                      style={{ minWidth: 0 }}
                    />
                  )}
                </label>
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
                  name="inPersonOption"
                  value={option}
                  checked={data.inPersonOption === option}
                  onChange={handleChange}
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
                The supply for sizes vary, in the event there are no XS, hackers
                will be sent a S.
              </span>
            </span>
            <Image
              src="/sizingchart.png"
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
                  onChange={handleChange}
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

export default MentorStepOneForm;
