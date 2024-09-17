import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import API from "../../../API/API";
import Loading from "../Loading";
import { errorPropmt, successPrompt } from "../../utils/prompt";

function LeaveRequest() {
  const [remarks, setremarks] = useState("");
  const [loading, setloading] = useState(false);
  const leaveRequest = true;

  const leaveHandler = async (event) => {
    event.preventDefault();

    // Create Leave Request Api Call

    try {
      const res = await API.post(
        "/leave/leave-request",
        { remarks, leaveRequest },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        successPrompt("Welcome", res.data.message);
      }
      setloading(false);
    } catch (error) {
      errorPropmt("Error", "Something Went wrong");
      const errorMessage = error.response.data.message;
      const code = error.response.status;
      if (code == 400) {
        errorPropmt("Bad Request", errorMessage);
      } else if (code == 401) {
        errorPropmt("Unauhorized", errorMessage);
      } else {
        errorPropmt("Error", errorMessage);
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="py-3 px-1 text-4xl">Leave Request</h1>
          <hr className="border-4 border-grey-200" />
          <div className="pt-10 px-24 pb-4">
            <textarea
              rows="7"
              onChange={(e) => setremarks(e.target.value)}
              value={remarks}
              className=" text-grey-200  w-full border-2 border-grey-200 p-3 rounded-xl"
              placeholder="Enter your Leave Reason here"
            />
          </div>
          <div className="flex justify-center mb-1">
            <SubmitButton
              label={"Send Request"}
              className={
                "border bg-grey-200 text-white rounded-3xl w-32 py-2 hover:bg-inherit hover:text-grey-200 hover:duration-200 active:bg-grey-200 active:text-white"
              }
              onclick={leaveHandler}
            />
          </div>
        </>
      )}
    </>
  );
}

export default LeaveRequest;
