import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface MultiCheckboxProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

const MultiCheckbox: React.FC<MultiCheckboxProps> = ({
  options,
  selected,
  onChange,
  otherValue,
  onOtherChange,
}) => {
  const handleCheck = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) =>
        option === "Other:" ? (
          <div key={option} className="flex items-end gap-2 w-full">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => handleCheck(option)}
                className="sr-only"
              />
              <div
                className={[
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                  selected.includes(option)
                    ? "border-checkMarkGreen bg-checkMarkGreen"
                    : "border-gray-300 bg-transparent",
                ].join(" ")}
              >
                {selected.includes(option) && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-white w-3 h-3"
                  />
                )}
              </div>
              <span className="ml-3 text-base text-textPrimary">Other:</span>
            </label>
            <input
              type="text"
              value={otherValue || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (onOtherChange) onOtherChange(val);
                // If user types, ensure 'Other:' is checked
                if (val && !selected.includes("Other:")) {
                  onChange([...selected, "Other:"]);
                }
              }}
              className="flex-1 border-0 border-b border-textPrimary bg-transparent ml-2 text-base focus:outline-none focus:ring-0 focus:border-textPrimary"
              style={{ minWidth: 0 }}
            />
          </div>
        ) : (
          <label key={option} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleCheck(option)}
              className="sr-only"
            />
            <div
              className={[
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                selected.includes(option)
                  ? "border-checkMarkGreen bg-checkMarkGreen"
                  : "border-gray-300 bg-transparent",
              ].join(" ")}
            >
              {selected.includes(option) && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white w-3 h-3"
                />
              )}
            </div>
            <span className="ml-3 text-base text-textPrimary">{option}</span>
          </label>
        )
      )}
    </div>
  );
};

export default MultiCheckbox;
