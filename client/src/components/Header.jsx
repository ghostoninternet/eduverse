import React, { useState } from "react";
import NavBar from "./NavBar";
import Menu from "./Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "../contexts/authContext";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  
  
  const { authState } = useAuth();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const onSearch = () => {
    setIsSearch(true);
  };
  const handleBack = () => {
    setIsSearch(false);
  };
  
  return (
    <div className="bg-white">
      {isSearch ? (
        <div className="py-4 px-3">
          <div className="sm:hidden justify-between flex items-center gap-x-2">
            <button onClick={handleBack}>
              <ArrowBackIcon fontSize="large" />
            </button>
            <input
              className="w-full px-2 py-1 border-gray-400 border-2 rounded-full"
              placeholder="Search..."
            />
            <button onClick={onSearch}>
              <SearchIcon fontSize="large" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`md:px-16 md:py-4 max-sm:flex max-sm:justify-between max-sm:px-3 max-sm:py-4`}
        >
          <div className={`max-sm:flex max-sm:gap-x-7`}>
            <div className="sm:hidden">
              <Menu isOpen={isOpen} handleClick={handleClick} />
            </div>
            <NavBar />
          </div>

          {/*mobile */}
          <div className="sm:hidden ">
            <button onClick={onSearch}>
              <SearchIcon fontSize="large" />
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="flex flex-col">
          <div className="active:bg-blue-500 px-6 py-4">Buy</div>
          <div className="active:bg-blue-500 px-6 py-4">Notification</div>
          <div className="active:bg-blue-500 px-6 py-4">Login</div>
        </div>
      )}
      {!authState ? (
        <div className="bg-blue-300 border sm:px-16 sm:py-4 font-semibold">
          Explore free courses across various topics that provide foundational
          skills in areas like programming, data analysis, and digital
          marketing. Increase your knowledge or enhance your skills without any
          financial commitment...
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
