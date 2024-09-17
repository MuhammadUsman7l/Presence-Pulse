import React, { useState } from "react";
import InputBox from "./InputBox";
import SelectInput from "./SelectInput";
import SubmitButton from "./SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import API from "../../API/API";
import { errorPropmt, successPrompt } from "../utils/prompt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [roles, setroles] = useState("student");

  const navigate = useNavigate();

  const rolesOptions = [
    { value: "student", label: "Student" },
    { value: "admin", label: "Admin" },
  ];

  const submitRegister = async (event) => {
    event.preventDefault();

    try {
      const res = await API.post(
        "/user/sign-up",
        { firstName, lastName, username, email, password, roles },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
        }
      );
      if (res.status == 200) {
        successPrompt("Welcome", "Successfully Regigistered");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response.data.message;
      const code = error.response.status;
      if (code == 400) {
        errorPropmt("Bad Request", errorMessage);
      } else if (code == 401) {
        errorPropmt("Unauhorized", errorMessage);
      } else if (code == 403) {
        errorPropmt("Forbidden", errorMessage);
      } else {
        errorPropmt("Error", errorMessage);
      }
    }
  };

  return (
    <>
      <form
        action="/register"
        className="h-19/10 w-full flex items-center justify-center"
      >
        <div className="h-auto md:h-4/5 w-7/10 md:w-1/2 lg:w-2/5 shadow-xl bg-grey-200 py-6 px-6 md:px-12 rounded-3xl">
          <div className="flex justify-center mb-2">
            <h1 className="text-3xl font-bold text-white">
              <FontAwesomeIcon icon={faUserPlus} size="sm" className="mx-4" />
              Registration
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1">
            <InputBox
              label={" First Name"}
              type={"text"}
              onchange={(e) => setfirstName(e.target.value)}
              value={firstName}
              className="text-white text-lg"
            />
            <InputBox
              label={"Last Name"}
              type={"text"}
              onchange={(e) => setlastName(e.target.value)}
              value={lastName}
              className="text-white text-lg"
            />
            <InputBox
              label={"Username"}
              type={"text"}
              onchange={(e) => setusername(e.target.value)}
              value={username}
              className="text-white text-lg"
            />
            <InputBox
              label={"Email ID"}
              type={"email"}
              onchange={(e) => setemail(e.target.value)}
              value={email}
              className="text-white text-lg"
            />
            <InputBox
              label={"Password"}
              type={"Password"}
              onchange={(e) => setpassword(e.target.value)}
              value={password}
              className="text-white text-lg"
            />
            <SelectInput
              label={"Select User Role"}
              options={rolesOptions}
              onchange={(e) => setroles(e.target.value)}
              value={roles}
              className="text-white text-lg"
            />
          </div>

          <div className="flex justify-center mb-1">
            <SubmitButton
              label={"Register"}
              className={
                "border bg-white text-grey-200 rounded-3xl w-24 my-2 hover:bg-inherit hover:text-white hover:duration-200   active:scale-100 px-3 py-2 active:bg-white active:text-grey-200"
              }
              onclick={submitRegister}
            />
          </div>
          <div className="flex justify-center mb-1">
            <span className="text-white mr-1">Already have an account?</span>
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
