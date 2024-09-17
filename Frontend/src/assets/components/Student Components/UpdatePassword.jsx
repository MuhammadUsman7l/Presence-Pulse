import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import API from "../../../API/API";
import Loading from "../Loading";
import InputBox from "../InputBox";
import { errorPropmt, successPrompt } from "../../utils/prompt";

function UpdatePassword() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const updateHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(oldPassword, newPassword, confirmPassword);

    try {
      const res = await API.post(
        "/user/update-password",
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        successPrompt("Profile Updated", res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      const code = error.response?.status;
      if (code === 400) {
        errorPropmt("Bad Request", errorMessage);
      } else if (code === 401) {
        errorPropmt("Unauthorized", errorMessage);
      } else {
        errorPropmt("Error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="py-3 px-1 text-4xl">Update Password</h1>
          <hr className="border-4 border-grey-200" />
          <div className="flex flex-col justify-center pt-4 px-72">
            <div className="border-2 border-grey-200 w-full h-full px-8 py-3 rounded-3xl shadow-xl">
              <InputBox
                label={"Old Password"}
                type={"Password"}
                onchange={(e) => setoldPassword(e.target.value)}
                value={oldPassword}
                className="text-grey-200 text-lg my-1"
              />
              <InputBox
                label={"New Password"}
                type={"Password"}
                onchange={(e) => setnewPassword(e.target.value)}
                value={newPassword}
                className="text-grey-200 text-lg my-1"
              />
              <InputBox
                label={"Confirm New Password"}
                type={"Password"}
                onchange={(e) => setconfirmPassword(e.target.value)}
                value={confirmPassword}
                className="text-grey-200 text-lg my-1"
              />
              <div className="flex justify-center mt-1">
                <SubmitButton
                  label={"Update"}
                  className={
                    "border bg-grey-200 text-white rounded-3xl w-28 py-2 hover:bg-inherit hover:text-grey-200 hover:duration-200 active:bg-grey-200 active:text-white mt-6"
                  }
                  onclick={updateHandler}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdatePassword;
