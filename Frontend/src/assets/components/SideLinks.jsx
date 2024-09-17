import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function SideLinks({ label, to }) {
  return (
    <div className="my-2">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${
            isActive ? "opacity-100 tracking-wide underline" : "opacity-60"
          } my-1 px-1 py-0 shadow-sm rounded-2xl hover:tracking-wide hover:opacity-100 hover:rounded-2xl opacity-60`
        }
      >
        {label}
      </NavLink>
    </div>
  );
}

export default SideLinks;
