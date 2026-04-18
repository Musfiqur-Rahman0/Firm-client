import { Outlet } from "react-router-dom";
import Sidebar from "../component/ui/Sidebar";

export const layout = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <Outlet />
    </div>
  );
};
