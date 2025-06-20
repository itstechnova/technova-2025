import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface InterestInputBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const InterestInputBox: React.FC<InterestInputBoxProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex items-center w-full max-w-2xl bg-transparent rounded-md border-2 border-buttonSecondary/70 shadow-md p-4 text-lg relative"
    >
      <input
        type="email"
        value={value}
        onChange={onChange}
        required
        placeholder="Wanna stay updated? Sign up with your email today!"
        className="flex-1 bg-transparent outline-none text-textPrimary placeholder:text-textPrimary/70 text-lg"
      />
      <button
        type="submit"
        className="ml-2 bg-gradient-to-r from-textPrimary to-buttonSecondary text-white rounded-md w-14 h-12 flex items-center justify-center shadow-md transition-colors"
        aria-label="Submit"
      >
        <FontAwesomeIcon icon={faArrowRight} className="text-2xl" />
      </button>
    </form>
  );
};

export default InterestInputBox;
