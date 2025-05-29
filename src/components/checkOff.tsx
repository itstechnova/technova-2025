import React, { useState } from "react";

const CheckOff: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="pt-6">
      <label
        htmlFor="ack-checkbox"
        className="flex items-center cursor-pointer select-none"
      >
        <input
          id="ack-checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked((c) => !c)}
          className="sr-only"
          aria-label="Acknowledge roles"
        />

        <div
          className={[
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
            checked ? "border-[#AABD9C]" : "border-gray-300",
          ].join(" ")}
        >
          {checked && <div className="w-3 h-3 rounded-full bg-[#AABD9C]" />}
        </div>

        <span className="ml-3 text-base text-[#29223C]">Yes.</span>
      </label>
    </div>
  );
};

export default CheckOff;
