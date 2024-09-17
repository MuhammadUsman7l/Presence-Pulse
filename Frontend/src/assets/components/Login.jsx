import React, { useState } from "react";
import InputBox from "./InputBox";
import SelectInput from "./SelectInput";
import SubmitButton from "./SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import API from "../../API/API";
import { errorPropmt, successPrompt } from "../utils/prompt";
import Cookies from "js-cookie";

function Login() {
  const rolesOptions = [
    { value: "student", label: "Student" },
    { value: "admin", label: "Admin" },
  ];

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [roles, setroles] = useState("student");

  const submitLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await API.post(
        "/user/sign-in",
        { email, password, roles },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
        }
      );
      if (res.status == 200) {
        successPrompt("Welcome", res.data.message);
        Cookies.set("accessToken", res.data.data.accessToken, { expires: 7 });
        Cookies.set("refreshToken", res.data.data.refreshToken, { expires: 7 });

        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response.data.message;
      const code = error.response.status;
      if (code == 400) {
        errorPropmt("Bad Request", errorMessage);
      } else if (code == 401) {
        errorPropmt("Unauhorized", errorMessage);
      } else {
        errorPropmt("Error", errorMessage);
      }
    }
  };

  return (
    <>
      <form
        action="/login"
        className="h-19/10 w-full flex items-center justify-center"
      >
        <div className="h-auto md:h-4/5 w-1/2 md:w-1/3 lg:w-3/10 shadow-xl bg-grey-200 py-6 px-6 md:px-12 rounded-3xl">
          <div className="flex justify-center mb-2">
            <h1 className="text-3xl font-bold text-white">
              <FontAwesomeIcon
                icon={faUser}
                size="sm"
                style={{ color: "#f5f5f5" }}
                className="mx-4"
              />
              Login
            </h1>
          </div>
          <div className="my-2">
            <InputBox
              label={"Email"}
              type={"text"}
              onchange={(e) => setemail(e.target.value)}
              value={email}
              className="text-white text-lg"
            />
            <InputBox
              label={"Password"}
              type={"password"}
              onchange={(e) => setpassword(e.target.value)}
              value={password}
              className="text-white text-lg"
            />
            <SelectInput
              label={"Select User Type"}
              options={rolesOptions}
              onchange={(e) => setroles(e.target.value)}
              value={roles}
              className="text-white text-lg"
            />
          </div>

          <div className="flex justify-center">
            <SubmitButton
              label={"Login"}
              className={
                "px-3 py-2 mt-1 mb-1 border bg-white text-grey-200 rounded-3xl w-24 my-2 hover:bg-inherit hover:text-white hover:duration-200   active:bg-white active:text-grey-200"
              }
              onclick={submitLogin}
            />
          </div>
          <div className="flex justify-center">
            <span className="text-white mr-1">Don't have an account?</span>
            <Link to="/register" className="text-blue-500 underline">
              Register Now
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
