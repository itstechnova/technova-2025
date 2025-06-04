import React from 'react';
import CheckOff from '../checkOff';

interface UniversityDropdownProps {
  value: string;
  otherValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

const universities = [
  'Algoma University',
  'Brock University',
  'Carleton University',
  'Collège Universitaire Dominicain',
  'Conestoga College',
  'Lakehead University',
  'Laurentian University',
  'McMaster University',
  'Nipissing University',
  'OCAD University',
  'Ontario Tech University',
  "Queen's University",
  'Redeemer University College',
  'Royal Military College of Canada',
  'Toronto Metropolitan University',
  'Trent University',
  'University of British Columbia',
  'University of Guelph',
  'University of Ottawa',
  'University of Toronto',
  'University of Waterloo',
  'University of Windsor',
  'Western University London',
  'Wilfrid Laurier University',
  'York University',
  'Other:',
];

const UniversityDropdown: React.FC<UniversityDropdownProps> = ({
  value,
  otherValue,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full">
        <select
          name="university"
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm text-base focus:outline-none focus:ring-0 focus:border-textPrimary appearance-none bg-white text-textPrimary"
        >
          <option value="" disabled>
            Please select from this dropdown.
          </option>
          {universities.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
      {/* Other selection */}
      <div className="flex items-end gap-2 w-full mt-2">
        <CheckOff
          label="Other:"
          name="university"
          value="Other:"
          checked={value === 'Other:'}
          onChange={onChange}
        />
        <input
          type="text"
          name="universityOther"
          value={otherValue}
          onChange={onChange}
          className="flex-1 border-0 border-b border-textPrimary bg-transparent ml-2 text-base focus:outline-none focus:ring-0 focus:border-textPrimary"
          style={{ minWidth: 0 }}
          placeholder="Please specify"
        />
      </div>
    </div>
  );
};

export default UniversityDropdown;
