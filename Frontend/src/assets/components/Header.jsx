import Links from "./Links";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import Cookies from "js-cookie";
import API from "../../API/API.js";
import { errorPropmt, successPrompt } from "../utils/prompt.js";
import { useEffect, useState } from "react";
import useAuth from "../middlewares/useAuth.js";

const Header = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const { isAuthorized, userRoles } = useAuth();
  const [role, setrole] = useState("");

  useEffect(() => {
    setrole(userRoles);
  }, [userRoles, isAuthorized]);

  const checkAuthorization = () => {
    const accessToken = Cookies.get("accessToken");
    setAuthorized(!!accessToken);
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkAuthorization();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navLogin = () => {
    navigate("/login");
  };

  const navRegister = () => {
    navigate("/register");
  };

  const navLogout = async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      const res = await API.get("/user/sign-out", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      if (res.status === 200 && res.data) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        successPrompt("Logout Successful", res.data.message);
        setAuthorized(false);
        navigate("/");
      } else {
        errorPropmt("Error", "Unexpected response from server.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, please try again.";
      const statusCode = error.response?.status || 500;

      if (statusCode === 400) {
        errorPropmt("Bad Request", errorMessage);
      } else if (statusCode === 401) {
        errorPropmt("Unauthorized", errorMessage);
      } else {
        errorPropmt("Error", errorMessage);
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 w-screen h-1/6 bg-grey-200 flex justify-between px-12 shadow-3xl text-white">
        <div className="w-1/2 h-full flex items-center text-2xl font-extrabold">
          Students<span className="text-amber-500"> Attendance </span>Portal
        </div>
        <div className="w-1/2 h-full">
          <nav className="w-full h-full">
            <ul className="flex justify-between h-full items-center">
              <li>
                <Links name={"Home"} link={"/"} />
              </li>
              <li>
                <Links name={"About"} link={"/about"} />
              </li>
              <li>
                <Links name={"Contact"} link={"/contact"} />
              </li>
              {authorized && userRoles == "student" ? (
                <li>
                  <Links name={"Dashboard"} link={"/user/student"} />
                </li>
              ) : authorized && userRoles == "admin" ? (
                <li>
                  <Links name={"Dashboard"} link={"/user/admin"} />
                </li>
              ) : (
                <span></span>
              )}
              {!authorized ? (
                <li className="flex">
                  <SubmitButton
                    label={"Login"}
                    onclick={navLogin}
                    className={
                      "p-2 mx-1 border bg-white text-grey-200 rounded-3xl font-semibold w-24 my-2 hover:bg-inherit hover:text-white hover:duration-200 active:scale-100 active:bg-white active:text-grey-200"
                    }
                  />
                  <SubmitButton
                    label={"Register"}
                    className={
                      "p-2 mx-1 border bg-white text-grey-200 rounded-3xl w-24 font-semibold my-2 hover:bg-inherit hover:text-white hover:duration-200 active:scale-100 active:bg-white active:text-grey-200"
                    }
                    onclick={navRegister}
                  />
                </li>
              ) : (
                <li className="flex">
                  <SubmitButton
                    label={"Logout"}
                    className={
                      "p-2 mx-1 border bg-white text-grey-200 rounded-3xl font-semibold w-24 my-2 hover:bg-inherit hover:text-white hover:duration-200 active:scale-100 active:bg-white active:text-grey-200"
                    }
                    onclick={navLogout}
                  />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
