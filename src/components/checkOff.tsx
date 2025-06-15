import React from "react";

interface CheckOffProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

function CheckOff({
  label,
  checked,
  name,
  value,
  onChange,
  type = "radio",
  otherValue,
  onOtherChange,
  ...inputProps
}: CheckOffProps) {
  const id = `${name}-${value}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-start gap-2 cursor-pointer select-none"
      >
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...inputProps}
        />
        <div
          className={[
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors mt-1",
            checked ? "border-checkMarkGreen" : "border-gray-300",
          ].join(" ")}
        >
          {checked && (
            <div className="w-3 h-3 rounded-full bg-checkMarkGreen" />
          )}
        </div>
        <div className="flex flex-row gap-2 flex-1">
          <span className="text-base ">{label}</span>
          {label === "Other:" && (
            <input
              type="text"
              value={otherValue || ""}
              onChange={(e) => {
                const val = e.target.value;
                onOtherChange?.(val);
                if (val && !checked) {
                  onChange?.({ target: { value, name } } as any);
                }
              }}
              className={[
                "flex-1 border-0 border-b border-textPrimary bg-transparent ml-2 text-base focus:outline-none focus:ring-0 focus:border-textPrimary",
                checked
                  ? "border-textPrimary"
                  : "border-gray-300 text-gray-400",
              ].join(" ")}
              placeholder="Please specify"
            />
          )}
        </div>
      </label>
    </div>
  );
}

export default CheckOff;

// import React from 'react';

// interface CheckOffProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
// }

// function CheckOff({
//   label,
//   checked,
//   name,
//   value,
//   onChange,
//   type = 'radio',
//   ...inputProps
// }: CheckOffProps) {
//   const id = `${name}-${value}`;
//   return (
//     <div className="pt-6">
//       <label
//         htmlFor={id}
//         className="flex items-center cursor-pointer select-none"
//       >
//         <input
//           type={type}
//           name={name}
//           id={id}
//           value={value}
//           checked={checked}
//           onChange={onChange}
//           className="sr-only"
//           {...inputProps}
//         />
//         <div
//           className={[
//             'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
//             checked ? 'border-checkMarkGreen' : 'border-gray-300',
//           ].join(' ')}
//         >
//           {checked && (
//             <div className="w-3 h-3 rounded-full bg-checkMarkGreen" />
//           )}
//         </div>
//         <span className="ml-3 text-base text-[#29223C]">{label}</span>
//       </label>
//     </div>
//   );
// }

// export default CheckOff;
