import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-solid-svg-icons";

function Welcome() {
  return (
    <>
      <h1 className="flex flex-col justify-center h-full items-center border-2 border-grey-200 w-full">
        <FontAwesomeIcon icon={faFaceSmileWink} size="2xl" />
        <span className="text-6xl">Welcome!</span>
        <span className="text-xl mt-2">At Attendence Portal</span>
      </h1>
    </>
  );
}

export default Welcome;
