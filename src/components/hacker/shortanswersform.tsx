import React from "react";
import LongAnswerQuestion from "../longanswerq";
import SubmitButton from "../submitButton";

interface HackerShortAnswersProps {
  data: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    wordLimit?: number
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const questionOptions = [
  "Option A: What is one emerging technology that you are excited to explore which could potentially enhance representation of women+ in tech?",
  "Option B: What other experiences, beyond hackathons, have played a pivotal role in advancing your career within the tech industry as an underrepresented gender?",
];

function HackerShortAnswersForm({
  data,
  handleChange,
  handleSubmit,
}: HackerShortAnswersProps) {
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
            Short Answers 📝
          </h1>
          <br></br>
          <br></br>
          <p>
            Our mission is to create a more gender-equitable future in
            technology. Check out our social medias for more info!
          </p>
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          <LongAnswerQuestion
            question="Why would you like to attend TechNova? (150 words max)"
            name="longAnswerQ1"
            id="longAnswerQ1"
            placeholder="Start typing..."
            value={data.longAnswerQ1}
            onChange={(e) => handleChange(e, 150)}
          />

          <LongAnswerQuestion
            question="Please choose *one* of the following prompts to answer and clarify the question you have chosen in the box. (200 words max)"
            options={questionOptions}
            selectedOption={data.selectedOption}
            selectOption={handleChange}
            name="longAnswerQ2"
            id="longAnswerQ2"
            placeholder="Start typing..."
            value={data.longAnswerQ2}
            onChange={(e) => handleChange(e, 200)}
          />

          <LongAnswerQuestion
            question="Here's a fun question: What kind of superpower do you believe would help you in a hackathon? 🤔"
            name="longAnswerQ3"
            id="longAnswerQ3"
            placeholder="Start typing..."
            value={data.longAnswerQ3}
            onChange={(e) => handleChange(e, 150)}
          />

          <LongAnswerQuestion
            question="Summarize your approach to problem-solving in 10 words."
            name="longAnswerQ4"
            id="longAnswerQ4"
            placeholder="Start typing..."
            value={data.longAnswerQ4}
            onChange={(e) => handleChange(e, 10)}
          />
        </div>
        <div className="flex justify-end mt-8">
          <SubmitButton>→</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default HackerShortAnswersForm;
