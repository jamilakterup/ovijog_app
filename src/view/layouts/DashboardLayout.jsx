import { Outlet } from "react-router-dom";
import SideNav from "../pages/dashboard/common_page/SideNav";
import DashboardFooter from "../pages/dashboard/common_page/DashboardFooter";
import DashboardNav from "../pages/dashboard/common_page/DashboardNav";
import { useState } from "react";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
console.log('first loading')
  return (
    <div>
      <DashboardNav isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex min-h-[calc(100vh-153px)]">
        <div className={`${!isOpen ? "w-60" : "w-10"
          } transition-all ease-in-out bg-slate-100`}>
          <SideNav isOpen={isOpen} />
        </div>

        <Outlet />
      </div>

      <DashboardFooter />
    </div>
  );
}

export default DashboardLayout;
