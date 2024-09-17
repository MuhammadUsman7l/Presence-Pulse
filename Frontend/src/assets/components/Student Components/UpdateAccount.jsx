import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import API from "../../../API/API";
import Loading from "../Loading";
import InputBox from "../InputBox";
import { errorPropmt, successPrompt } from "../../utils/prompt";

function UpdateAccount() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState("");

  const rolesOptions = [
    { value: "student", label: "Student" },
    { value: "admin", label: "Admin" },
  ];

  // Format the date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch the student's profile information
  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/account", {
          headers: {
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          const user = res.data.data;
          setdata(user);
          setfirstName(user.firstName);
          setlastName(user.lastName);
          setusername(user.username);
          setemail(user.email);
        }
      } catch (error) {
        errorPropmt("Error", "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await API.patch(
        "/user/update-account",
        { firstName, lastName, email, username },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        successPrompt("Account Updated", res.data.message);
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
          <h1 className="py-3 px-1 text-4xl">Update Account</h1>
          <hr className="border-4 border-grey-200" />
          <div className="grid grid-cols-2 gap-x-20 gap-y-4 pt-10 px-20">
            <InputBox
              label={" First Name"}
              type={"text"}
              onchange={(e) => setfirstName(e.target.value)}
              value={firstName}
              className="text-grey-200 text-lg"
            />
            <InputBox
              label={"Last Name"}
              type={"text"}
              onchange={(e) => setlastName(e.target.value)}
              value={lastName}
              className="text-grey-200 text-lg"
            />
            <InputBox
              label={"Username"}
              type={"text"}
              onchange={(e) => setusername(e.target.value)}
              value={username}
              className="text-grey-200 text-lg"
            />
            <InputBox
              label={"Email ID"}
              type={"email"}
              onchange={(e) => setemail(e.target.value)}
              value={email}
              className="text-grey-200 text-lg"
            />
          </div>
          <div className="flex justify-center mt-20">
            <SubmitButton
              label={"Update"}
              className={
                "border bg-grey-200 text-white rounded-3xl w-28 py-2 hover:bg-inherit hover:text-grey-200 hover:duration-200 active:bg-grey-200 active:text-white"
              }
              onclick={updateHandler}
            />
          </div>
          <div className="flex flex-col items-end justify-end w-full">
            <span className="text-sm">
              Profile Created At {formatDate(data.createdAt)}
            </span>
            <span className="text-sm">
              Profile Updated At {formatDate(data.updatedAt)}
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateAccount;
