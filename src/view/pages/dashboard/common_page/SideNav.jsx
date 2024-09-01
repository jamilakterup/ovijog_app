import DashboardIcon from "@mui/icons-material/Dashboard";
import CommentIcon from "@mui/icons-material/Comment";
import PropTypes from "prop-types";

function SideNav({ isOpen }) {
  return (
    <>
      <a
        href="/dashboard/home"
        className={`${
          !isOpen ? "w-60" : "w-10"
        } flex group items-center gap-5 transition-all ease-in-out p-2 hover:bg-slate-200 rounded-lg relative`}
      >
        <DashboardIcon />
        {!isOpen ? (
          "Dashboard"
        ) : (
          <span className="absolute bg-slate-500 text-white p-1 rounded-lg left-10 top-3 hidden group-hover:block z-10">
            Dashboard
          </span>
        )}
      </a>

      <a
        href="/dashboard/complain-table"
        className={`${
          !isOpen ? "w-60" : "w-10"
        } flex group items-center gap-5 transition-all ease-in-out p-2 hover:bg-slate-200 rounded-lg relative`}
      >
        <CommentIcon />
        {!isOpen ? (
          "Complains"
        ) : (
          <span className="absolute bg-slate-500 text-white p-1 rounded-lg left-10 top-3 hidden group-hover:block z-10">
            Complains
          </span>
        )}
      </a>

    </>
  );
}

// Define PropTypes for SideNav
SideNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default SideNav;
