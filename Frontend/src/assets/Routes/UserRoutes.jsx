import React, { useEffect } from "react";
import useAuth from "../middlewares/useAuth.js";
import { Outlet, useNavigate } from "react-router-dom";

function UserRoutes() {
  // const { isAuthorized, userRoles } = useAuth();
  // const Navigate = useNavigate();
  // useEffect(() => {
  //   if (isAuthorized && userRoles.includes("admin")) {
  //     // Navigate("admin");
  //   } else if (isAuthorized && userRoles.includes("student")) {
  //     // Navigate("student");
  //   }
  // }, [userRoles, isAuthorized, Navigate]);
  return <Outlet />;
}

export default UserRoutes;
