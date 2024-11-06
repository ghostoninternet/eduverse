import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
const Header = () => {
  return (
    <div>
      <div className="flex justify-between px-16 py-4">
        <div className="flex">
          <div>
            <SchoolIcon color="primary" fontSize="medium"/>
          </div>
          <button className="font-bold text-3xl text-blue-700">Hust Academy</button>
        </div>

        <div className="relative w-fit">
          <input
            type="text"
            placeholder="Search for courses"
            className="h-12 w-96 p-4 border-2 rounded-full shadow-md"
          />
          <button className="absolute right-2.5 top-1.5 border rounded-full p-1 bg-blue-600 text-white hover:bg-blue-700">
            <SearchIcon />
          </button>
        </div>

        <div className="flex gap-x-6">
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

      <div className="bg-blue-300 border px-16 py-4 font-semibold">Explore free courses across various topics that provide foundational skills in areas like programming, data analysis, and digital marketing. Increase your knowledge or enhance your skills without any financial commitment...</div>
    </div>
  );
};

export default Header;
