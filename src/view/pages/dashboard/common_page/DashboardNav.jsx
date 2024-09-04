import ClearIcon from "@mui/icons-material/Clear";
import PropTypes from "prop-types";
import bccLogo from "../../../../assets/ovijog.png";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

function DashboardNav({ isOpen, setIsOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>প্রোফাইল</MenuItem>
      <MenuItem onClick={handleMenuClose}>লগ-আউট</MenuItem>
    </Menu>
  );

  // main function will return::
  return (
    <nav className="bg-white border-b border-black/10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <div className="w-full md:w-44 flex justify-between">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={bccLogo}
              className="h-12"
              alt="BCC Logo"
            />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${isOpen ? "hidden" : "block"}`}
            aria-controls="navbar-default"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-10 ${isOpen ? "block" : "hidden"}`}
            aria-label="Close navigation"
          >
            <ClearIcon
              className="text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              fontSize="large"
            />
          </button>
        </div>

        <div className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`} id="navbar-default">
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {renderMenu}
          </Box>
        </div>
      </div>
    </nav >
  );
}

// Define PropTypes for DashboardNav
DashboardNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default DashboardNav;
