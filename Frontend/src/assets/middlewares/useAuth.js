import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [isAuthorized, setisAuthorized] = useState(false);
  const [userRoles, setuserRoles] = useState([]);
  useEffect(() => {
    try {
      const token = Cookie.get("accessToken");

      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
          setisAuthorized(true);
          setuserRoles(decodedToken.roles || []);
        }
      } else {
        setisAuthorized(false);
      }
    } catch (error) {
      setisAuthorized(false);
    }
  }, []);
  return {
    isAuthorized,
    userRoles,
  };
};

export default useAuth;
