import React from "react";

function SelectInput({ label, options, value, onchange, className }) {
  return (
    <>
      <div className={`${className}`}>
        <label htmlFor={label}>{label}</label>

        <select
          className="w-full px-4 py-1 rounded-xl border-2 text-grey-200 outline-none focus:border-none"
          value={value}
          onChange={onchange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SelectInput;
