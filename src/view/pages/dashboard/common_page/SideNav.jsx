import DashboardIcon from "@mui/icons-material/Dashboard";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from '@mui/icons-material/Group';
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom"; // Import Link

function SideNav({ isOpen }) {
  const location = useLocation(); // Get the current location

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Link
        to="/dashboard/home"
        className={`${!isOpen ? "w-60" : "w-10"
          } flex group items-center gap-5 transition-all ease-in-out p-2 ${isActive("/dashboard/home") ? "bg-blue-200" : "hover:bg-slate-200"
          } rounded-lg relative`}
      >
        <DashboardIcon />
        {!isOpen ? (
          "ড্যাশবোর্ড"
        ) : (
          <span className="absolute bg-slate-500 text-white p-1 rounded-lg left-10 top-3 hidden group-hover:block z-10">
            ড্যাশবোর্ড
          </span>
        )}
      </Link>

      <Link
        to="/dashboard/complain-table"
        className={`${!isOpen ? "w-60" : "w-10"
          } flex group items-center gap-5 transition-all ease-in-out p-2 ${isActive("/dashboard/complain-table") ? "bg-blue-200" : "hover:bg-slate-200"
          } rounded-lg relative`}
      >
        <CommentIcon />
        {!isOpen ? (
          "অভিযোগ সমূহ"
        ) : (
          <span className="absolute w-28 bg-slate-500 text-white p-1 rounded-lg left-10 top-3 hidden group-hover:block z-10">
            অভিযোগ সমূহ
          </span>
        )}
      </Link>

      <Link
        to="/dashboard/users"
        className={`${!isOpen ? "w-60" : "w-10"
          } flex group items-center gap-5 transition-all ease-in-out p-2 ${isActive("/dashboard/users") ? "bg-blue-200" : "hover:bg-slate-200"
          } rounded-lg relative`}
      >
        <GroupIcon />
        {!isOpen ? (
          "ব্যবহারকারী"
        ) : (
          <span className="absolute w-28 bg-slate-500 text-white p-1 rounded-lg left-10 top-3 hidden group-hover:block z-10">
            ব্যবহারকারী
          </span>
        )}
      </Link>
    </>
  );
}

// Define PropTypes for SideNav
SideNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default SideNav;
