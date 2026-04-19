import { Outlet } from "react-router-dom";
import Sidebar from "../component/ui/Sidebar";
import { Navbar } from "../component/ui/Navbar";

export const layout = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <Navbar />
      <Outlet />
    </div>
  );
};
