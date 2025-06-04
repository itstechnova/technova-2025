import React from 'react';

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...props }) => (
  <button
    type="submit"
    className="bg-buttonPrimary px-8 py-2 mt-24 text-white text-2xl rounded-xl w-auto shadow-xs shadow-navSecondary bg-gradient-to-r from-buttonPrimary to-buttonTertiary"
    {...props}
  >
    {children}
  </button>
);

export default SubmitButton;
