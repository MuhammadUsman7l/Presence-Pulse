import React, { useEffect, useState } from "react";
import useAuth from "../middlewares/useAuth.js";
import { Outlet, useNavigate } from "react-router-dom";

function StudentRoutes() {
  const { isAuthorized, userRoles } = useAuth();
  const [roles, setroles] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    if (isAuthorized && userRoles.includes("student")) {
      Navigate("dashboard");
    }
  }, [userRoles, isAuthorized, Navigate]);

  return <Outlet />;
}

export default StudentRoutes;
