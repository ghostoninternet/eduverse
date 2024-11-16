import React, {useState} from "react";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const NavBar = () => {
  const [isDown, setIsDown] = useState(false)
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/signin");
  };
  const handleAvtClick = () => {
    setIsDown(!isDown)
  };
  const handleLogout = () => {
    setAuthState(null)
  }
  
  const handleProfileClick = () => {
    navigate("/profile");
    setIsDown(false);
  }
  const handleSettingsClick = () => {
    navigate("/settings");
    setIsDown(false);
  }

  const handleLogoClick = () =>{
    navigate("/");
    setIsDown(false);
  }
  return (
    <div className="sm:flex sm:justify-between items-center max-lg:gap-x-3">
      <div className="flex" onClick={handleLogoClick}>
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
        {authState ? (
          <div>
            <div
              className="flex border-2 p-2 rounded-md border-gray-600 cursor-pointer"
              onClick={handleAvtClick}
            >
              <div>
                <AccountCircleIcon fontSize="large" className="text-blue-600" />
              </div>
              <div>
                <ArrowDropDownIcon fontSize="large" className="text-blue-600" />
              </div>
            </div>
            {isDown && <div className="absolute z-10 bg-white w-24">
              <div onClick={handleProfileClick} className="p-4 font-semibold hover:bg-blue-500 hover:text-white cursor-pointer">Profile</div>
              <div onClick={handleSettingsClick} className="p-4 font-semibold hover:bg-blue-500 hover:text-white cursor-pointer">Settings</div>
              <div onClick={handleLogout} className="p-4 font-semibold hover:bg-blue-500 hover:text-white cursor-pointer">Log out</div>
            </div>}
            
          </div>
        ) : (
          <button
            className="bg-blue-600 text-white border rounded-full px-4 hover:bg-blue-700"
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
