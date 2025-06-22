import React from "react";
import CheckOff from "../checkOff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface UniversityDropdownProps {
  value: string;
  otherValue?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onOtherChange?: (val: string) => void;
}

const universities = [
  "Algoma University",
  "Brock University",
  "Carleton University",
  "Collège Universitaire Dominicain",
  "Conestoga College",
  "Lakehead University",
  "Laurentian University",
  "McMaster University",
  "Nipissing University",
  "OCAD University",
  "Ontario Tech University",
  "Queen's University",
  "Redeemer University College",
  "Royal Military College of Canada",
  "Toronto Metropolitan University",
  "Trent University",
  "University of British Columbia",
  "University of Guelph",
  "University of Ottawa",
  "University of Toronto",
  "University of Waterloo",
  "University of Windsor",
  "Western University London",
  "Wilfrid Laurier University",
  "York University",
];

const UniversityDropdown: React.FC<UniversityDropdownProps> = ({
  value,
  otherValue,
  onChange,
  onOtherChange,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full">
        <select
          name="university"
          value={value !== "Other:" ? value : ""}
          onChange={onChange}
          className={`w-full px-4 py-2 rounded-md border border-textPrimary shadow-xs bg-navPrimary text-base focus:outline-none focus:ring-0 focus:border-textPrimary bg-white appearance-none ${
            value === "" ? "text-gray-400" : "text-textPrimary"
          }`}
        >
          <option value="" disabled>
            Select university
          </option>
          {universities.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <FontAwesomeIcon icon={faChevronDown} className="text-textPrimary" />
        </span>
      </div>

      <CheckOff
        label="Other:"
        name="university"
        value="Other:"
        checked={value === "Other:"}
        onChange={onChange}
        otherValue={otherValue}
        onOtherChange={onOtherChange}
      />
    </div>
  );
};

export default UniversityDropdown;
