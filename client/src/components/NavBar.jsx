import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
const NavBar = () => {
  return (
    <div className="sm:flex sm:justify-between items-center max-lg:gap-x-3">
      <div className="flex">
        <div className="">
          <SchoolIcon color="primary" fontSize="medium" />
        </div>
        <button className="text-2xl font-bold sm:text-3xl text-blue-700">
          Hust Academy
        </button>
      </div>
      <div className="max-sm:hidden relative w-fit">
        <input
          type="text"
          placeholder="Search for courses"
          className="h-12 w-96 p-4 border-2 rounded-full shadow-md"
        />
        <button className="absolute right-2.5 top-1.5 border rounded-full p-1 bg-blue-600 text-white hover:bg-blue-700">
          <SearchIcon />
        </button>
      </div>

      <div className="max-sm:hidden flex gap-x-6">
        <button>
          <ShoppingCartIcon color="primary" fontSize="large" />
        </button>
        <button>
          <NotificationsIcon color="primary" fontSize="large" />
        </button>
        <button className="bg-blue-600 text-white border rounded-full px-4 hover:bg-blue-700">
          Login
        </button>
      </div>
      
    </div>
  );
};

export default NavBar;
