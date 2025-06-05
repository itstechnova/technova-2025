import React from 'react';

interface ShortAnswerQuestionProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  question: string;
  note?: string;
}

function ShortAnswerQuestion({
  question,
  note,
  id,
  ...inputProps
}: ShortAnswerQuestionProps) {
  return (
    <div className="flex flex-col gap-5">
      <label htmlFor={id} className="text-base font-bold">
        {question}
      </label>
      {note && (
        <>
          <span className="text-base font-bold inline">
            Note: <span className="inline font-normal">{note}</span>
          </span>
        </>
      )}
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-buttonSecondary shadow-xs shadow-navSecondary"
        {...inputProps}
      />
    </div>
  );
}

export default ShortAnswerQuestion;
