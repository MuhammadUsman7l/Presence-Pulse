import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminPanel() {
  return (
    <>
      <div className="h-19/10 w-full m-0 p-0 flex">
        <AdminSidebar />
        <div className="h-full w-19/10 p-4">
          <div className=" w-full h-full shadow-2xl text-grey-200 p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
