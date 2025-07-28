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
  formError?: string | null;
  onBack?: () => void;
}

const question_options = [
  "Option A: Choose one emerging tool or platform that you are most eager to explore due to its potential to improve accessibility and representation in tech. Explain how this tool could help close the gender gap in STEM education and careers, and why its impact excites you.",
  "Option B: Beyond formal education, what life experience has most influenced your growth and motivation in pursuing a career in tech? Describe a personal experience or challenge that has significantly shaped your journey, and explain how it has transformed your perspective in the present and for the future.",
];

function HackerShortAnswersForm({
  data,
  handleChange,
  handleSubmit,
  formError,
  onBack,
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
          src="/themed_assets/hacker-form.svg"
          alt="Hacker Forms Graphic Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="fixed inset-x-0 top-0 w-full h-1/3 pointer-events-none z-0 
                   bg-gradient-to-b from-backgroundSecondary to-transparent"
      />
      <div className="pb-5 relative z-10">
        <div className="pb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-textSecondary pb-4">
            Short Answers 📝
          </h1>
          <p className="text-textPrimary">
            Our mission is to create a more gender‑equitable future in
            technology. Check out our social medias for more info! Please don’t
            use GPT or other AI‑generated responses for the responses in this
            section, we will check the responses.
          </p>
        </div>
      </div>

      <form className="form z-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-24 text-textPrimary">
          <LongAnswerQuestion
            question="Why would you like to attend TechNova?* (150 words max)"
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
            question="Please choose *one* of the following prompts to answer and clarify the question you have chosen in the box.* (200 words max)"
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
            question="Here's a fun question: Which fictional character would you want as your hackathon partner and why?* 🤔"
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
            question="Describe yourself as a hacker using a song lyric (get creative!)*"
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
        <div className=" mt-10">
          {formError && (
            <p className="text-red-500 flex justify-end">{formError}</p>
          )}

          <div className="flex justify-between mt-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-20 h-11 text-xl rounded-xl bg-pink-50 text-[#992650] shadow-sm shadow-[#992650] hover:bg-pink-100"
              >
                ←
              </button>
            )}
            <SubmitButton>→</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HackerShortAnswersForm;
