import React from "react";

function InputBox({
  label,
  type,
  placeholder = "",
  onchange,
  value,
  className = "",
  class1 = "",
}) {
  const inputId = `${label.replace(/\s+/g, "-").toLowerCase()}-input`;
  return (
    <>
      <div className={`  ${className}`}>
        <label htmlFor={inputId}>{label}</label>
        <div>
          <input
            type={type}
            placeholder={placeholder}
            onChange={onchange}
            value={value}
            className={`w-full px-4 rounded-xl border-2 text-grey-200 mx-2 ${class1}`}
          />
        </div>
      </div>
    </>
  );
}

export default InputBox;
