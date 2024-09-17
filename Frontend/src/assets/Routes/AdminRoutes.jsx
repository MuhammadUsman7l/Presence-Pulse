import React, { useEffect, useState } from "react";
import useAuth from "../middlewares/useAuth.js";
import { Outlet, useNavigate } from "react-router-dom";

function AdminRoutes() {
  const { isAuthorized, userRoles } = useAuth();
  const [roles, setroles] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    if (isAuthorized && userRoles.includes("admin")) {
      setroles("admin");
    }
  }, [userRoles, isAuthorized, Navigate]);
  if (roles === "admin") {
    return <Outlet />;
  } else {
    Navigate("/login");
  }
}

export default AdminRoutes;
