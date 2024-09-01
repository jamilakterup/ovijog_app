import { Outlet } from "react-router-dom";
import SideNav from "../pages/dashboard/common_page/SideNav";
import DashboardFooter from "../pages/dashboard/common_page/DashboardFooter";
import DashboardNav from "../pages/dashboard/common_page/DashboardNav";
import { useState } from "react";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DashboardNav isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="min-h-[calc(100vh-153px)]">
        <SideNav isOpen={isOpen} />

        <div className={`w-full transition-all ease-in-out ${isOpen ? "md:ps-20" : "md:ps-56"}`}>
          <Outlet />
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;
