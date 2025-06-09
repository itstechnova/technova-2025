import React from "react";
import CheckOff from "./checkOff";

interface LongAnswerQuestionProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  question: string;
  options?: string[];
  selectedOption?: string;
  selectOption?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

function LongAnswerQuestion({
  question,
  options,
  selectedOption,
  selectOption,
  id,
  ...textareaProps
}: LongAnswerQuestionProps) {
  return (
    <div className="flex flex-col gap-5">
      <label htmlFor={id} className="text-base font-bold">
        {question}
      </label>
      {options && (
        <>
          <div className="flex flex-col mb-10">
            {options.map((option) => (
              <CheckOff
                key={option}
                label={option}
                name="selectedOption"
                value={option}
                checked={selectedOption === option}
                onChange={selectOption}
              />
            ))}
          </div>
        </>
      )}
      <textarea
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-buttonSecondary shadow-xs shadow-navSecondary min-h-[225px] resize-y"
        {...textareaProps}
      />
    </div>
  );
}

export default LongAnswerQuestion;
