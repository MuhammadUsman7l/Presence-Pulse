import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import API from "../../../API/API";
import Loading from "../Loading";
import { errorPropmt, successPrompt } from "../../utils/prompt";

function MarkAttendence() {
  const [loading, setloading] = useState(false);
  const status = "present";
  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    // Function to update date and time
    const updateDateTime = () => {
      const now = new Date();

      // Get formatted date
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      // Get formatted time
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      // Update state
      setCurrentDateTime({
        date: formattedDate,
        time: formattedTime,
      });
    };

    // Update the date and time once when the component mounts
    updateDateTime();

    // Set interval to update time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const markHandler = async (event) => {
    event.preventDefault();

    // Mark Attendence Api Call

    setloading(true);

    // Create Student Api Call
    try {
      const res = await API.post(
        "/attendence/present",
        { status },
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
      const errorMessage = error.response?.data?.message || "An error occurred";
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
          <h1 className="py-3 px-1 text-4xl">Mark Attendence</h1>
          <hr className="border-4 border-grey-200" />
          <div className="pt-12 px-24 pb-4 flex flex-col h-3/4 items-center ">
            <div className="border-2 w-1/2 h-1/2 border-grey-200 flex flex-col items-center justify-center rounded-full">
              <h1 className="text-3xl font-bold">Date And Time</h1>
              <h1 className="text-3xl">{currentDateTime.time}</h1>
              <h1 className="text-lg">{currentDateTime.date}</h1>
            </div>
            <div className="flex justify-center mt-10">
              <SubmitButton
                label={"Mark Attendence"}
                className={
                  "border bg-grey-200 text-white rounded-full  w-44 h-14 py-2 hover:bg-inherit hover:text-grey-200 hover:duration-200 active:bg-grey-200 active:text-white"
                }
                onclick={markHandler}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MarkAttendence;
