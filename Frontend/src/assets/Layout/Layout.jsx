import { Outlet } from "react-router-dom";
import { Header } from "../components";

function Layout() {
  return (
    <>
      <div className="font-Suse font-normal h-screen w-screen overflow-x-hidden">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
