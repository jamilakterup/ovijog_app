import { Outlet } from "react-router-dom";
import SideNav from "../pages/dashboard/common_page/SideNav";
import DashboardFooter from "../pages/dashboard/common_page/DashboardFooter";

function DashboardLayout() {
  return (
    <div>
      <div className="flex gap-4 min-h-[calc(100vh-11rem)]">
        <div className="w-[180px]">
          <SideNav />
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;
