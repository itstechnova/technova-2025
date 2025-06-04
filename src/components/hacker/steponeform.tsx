import React from 'react';
import Image from 'next/image';
import ShortAnswerQuestion from '../shortanswerq';
import SubmitButton from '../submitButton';

interface HackerStepOneFormProps {
  data: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function HackerStepOneForm({
  data,
  handleChange,
  handleSubmit,
}: HackerStepOneFormProps) {
  return (
    <div className="p-24 flex flex-col h-full bg-navPrimary relative">
      <div className="absolute top-0 left-0 w-full h-1/4 pointer-events-none z-0 bg-gradient-to-b from-backgroundSecondary to-navPrimary" />
      <div className="pb-5 relative z-10">
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
        <SubmitButton>→</SubmitButton>
      </form>
    </div>
  );
}

export default HackerStepOneForm;
