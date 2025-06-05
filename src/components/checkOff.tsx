import React from 'react';

interface CheckOffProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function CheckOff({
  label,
  checked,
  name,
  value,
  onChange,
  type = 'radio',
  ...inputProps
}: CheckOffProps) {
  const id = `${name}-${value}`;
  return (
    <div className="pt-6">
      <label
        htmlFor={id}
        className="flex items-center cursor-pointer select-none"
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
            'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
            checked ? 'border-checkMarkGreen' : 'border-gray-300',
          ].join(' ')}
        >
          {checked && (
            <div className="w-3 h-3 rounded-full bg-checkMarkGreen" />
          )}
        </div>
        <span className="ml-3 text-base text-[#29223C]">{label}</span>
      </label>
    </div>
  );
}

export default CheckOff;
