"use client";

import React from "react";
import LongAnswerQuestion from "../longanswerq";
import SubmitButton from "../submitButton";

interface HackerShortAnswersProps {
  data: {
    long_answer_q1: string;
    long_answer_q2: string;
    selected_option: string;
    long_answer_q3: string;
    long_answer_q4: string;
  };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    word_limit?: number
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const question_options = [
  "Option A: What is one emerging technology that you are excited to explore which could potentially enhance representation of women+ in tech?",
  "Option B: What other experiences, beyond hackathons, have played a pivotal role in advancing your career within the tech industry as an underrepresented gender?",
];

function HackerShortAnswersForm({
  data,
  handleChange,
  handleSubmit,
}: HackerShortAnswersProps) {
  const update_data = (new_data: Partial<typeof data>) => {
    const updated = { ...data, ...new_data };
    sessionStorage.setItem("hackerShortAnswersData", JSON.stringify(updated));
  };

  return (
    <div className="p-10 md:p-24 flex flex-col h-full bg-navPrimary relative">
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
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary pb-4">
            Short Answers 📝
          </h1>
          <p className="text-textPrimary">
            Our mission is to create a more gender-equitable future in
            technology. Check out our social medias for more info!
          </p>
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          <LongAnswerQuestion
            question="Why would you like to attend TechNova? (150 words max)"
            name="long_answer_q1"
            id="long_answer_q1"
            placeholder="Start typing..."
            value={data.long_answer_q1}
            onChange={(e) => {
              handleChange(e, 150);
              update_data({ long_answer_q1: e.target.value });
            }}
          />

          <LongAnswerQuestion
            question="Please choose *one* of the following prompts to answer and clarify the question you have chosen in the box. (200 words max)"
            options={question_options}
            selectedOption={data.selected_option}
            selectOption={(e) => {
              handleChange(e);
              update_data({ selected_option: e.target.value });
            }}
            name="long_answer_q2"
            id="long_answer_q2"
            placeholder="Start typing..."
            value={data.long_answer_q2}
            onChange={(e) => {
              handleChange(e, 200);
              update_data({ long_answer_q2: e.target.value });
            }}
          />

          <LongAnswerQuestion
            question="Here's a fun question: What kind of superpower do you believe would help you in a hackathon? 🤔"
            name="long_answer_q3"
            id="long_answer_q3"
            placeholder="Start typing..."
            value={data.long_answer_q3}
            onChange={(e) => {
              handleChange(e, 150);
              update_data({ long_answer_q3: e.target.value });
            }}
          />

          <LongAnswerQuestion
            question="Summarize your approach to problem-solving in 10 words."
            name="long_answer_q4"
            id="long_answer_q4"
            placeholder="Start typing..."
            value={data.long_answer_q4}
            onChange={(e) => {
              handleChange(e, 10);
              update_data({ long_answer_q4: e.target.value });
            }}
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
