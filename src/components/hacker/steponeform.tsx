import React from 'react';
import Image from 'next/image';
import ShortAnswerQuestion from '../shortanswerq';

interface HackerLandingFormProps {
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function HackerStepOneForm() {
  return (
    <div className="flex flex-col h-full bg-navPrimary relative">
      <div className="p-24 bg-gradient-to-b from-backgroundSecondary to-navPrimary">
        <div className="flex gap-2 items-center pb-10">
          <h1 className="text-5xl font-semibold text-textSecondary z-1">
            Let's get to know you better!
          </h1>
          <Image
            src="/themed_assets/Sunflower.png"
            alt="grass"
            width={40}
            height={40}
          />
        </div>

        <form className="form">
          <div className="flex flex-col gap-24 text-textPrimary">
            <div className="grid grid-cols-2 gap-10 w-full">
              <ShortAnswerQuestion
                question=" What's your first name?"
                name="firstName"
                id="firstName"
                placeholder="ex. Jane"
              />
              <ShortAnswerQuestion
                question=" What's your last name?"
                name="lastName"
                id="lastName"
                placeholder="ex. Smith"
              />
            </div>
            <ShortAnswerQuestion
              question="What are your pronouns?"
              name="pronouns"
              id="pronouns"
              placeholder="ex. she/her/hers (all lowercase)"
            />
          </div>
          <button
            type="submit"
            className="bg-buttonPrimary px-8 py-2 mt-24 text-white text-2xl rounded-xl w-auto shadow-xs shadow-navSecondary"
          >
            →
          </button>
        </form>
      </div>
    </div>
  );
}

export default HackerStepOneForm;
