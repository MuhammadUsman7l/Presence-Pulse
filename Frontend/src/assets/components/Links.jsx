import React from "react";
import { NavLink } from "react-router-dom";

function Links({ name, link }) {
  return (
    <>
      <NavLink
        to={link}
        className={({ isActive }) =>
          `${
            isActive ? "text-amber-500 underline tracking-widest" : "text-white"
          } hover:text-amber-500 hover:underline hover:tracking-widest text-lg`
        }
      >
        {name}
      </NavLink>
    </>
  );
}

export default Links;
