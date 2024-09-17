import React from "react";

function SubmitButton({ label, className = "", onclick }) {
  return (
    <>
      <div className="flex justify-center ">
        <button className={` ${className}`} onClick={onclick}>
          {label}
        </button>
      </div>
    </>
  );
}

export default SubmitButton;
