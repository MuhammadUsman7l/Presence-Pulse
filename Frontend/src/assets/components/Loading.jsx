import React from "react";

function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="loader"></div>
      <div className="text-3xl text-grey-200 font-extrabold flex flex-col  text-center my-3">
        <div>-------- Please Wait! ----------</div>
        <div>Loading...</div>
      </div>
    </div>
  );
}

export default Loading;
