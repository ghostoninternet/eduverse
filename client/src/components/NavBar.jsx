import { useEffect, useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import logout from "../apis/logout";
import CourseBar from "./CourseBar";
import searchCourses from "../apis/course/searchCourses";
const NavBar = () => {
  const [isDown, setIsDown] = useState(false);
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchedCourses, setSearchedCourses] = useState([]);
  const handleLoginClick = () => {
    navigate("/signin");
  };
  const handleAvtClick = () => {
    setIsDown(!isDown);
  };
  const handleLogout = async () => {
    await logout();
    setAuthState(null);
  };

  const handleProfileClick = () => {
    // window.location.href = "/profile";
    navigate("/profile");
    setIsDown(false);
  };
  const handleSettingsClick = () => {
    // window.location.href = "/settings";
    navigate("/settings");
    setIsDown(false);
  };

  const handleLogoClick = () => {
    // window.location.href = "/";
    navigate("/");
    setIsDown(false);
  };

  const handleHomeClick = () => {
    // window.location.href = "/";
    navigate("/");
    setIsDown(false);
  };
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchedSearchCourses = async () => {
      try {
        const response = await searchCourses(search);
        setSearchedCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchedSearchCourses();
  }, [search, setSearch]);

  const handlecourseBarClick = (courseSlug) => {
    navigate(`/learn/${courseSlug}`)
    setSearch('')
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
      <div className="max-sm:hidden relative w-5/12">
        <input
          onChange={handleChangeSearch}
          value={search}
          type="text"
          placeholder="Search for courses"
          className="h-12 p-4 border-2 rounded-full shadow-md text-xl w-full"
        />
        <button className="absolute right-2.5 top-1.5 border rounded-full p-1 bg-blue-600 text-white hover:bg-blue-700">
          <SearchIcon />
        </button>
        <div className="absolute w-full">
          {searchedCourses?.data?.map((searchedCourse) => {
            return (
              <CourseBar
              key={searchedCourse._id}
              title={searchedCourse.courseTitle}
              instructorName={searchedCourse.courseInstructor}
              avgRating={searchedCourse.courseRatingAvg}
              handleClick={() => handlecourseBarClick(searchedCourse.courseSlug)}
              courseImgUrl={searchedCourse.courseImgUrl}
            />
            )
          })}
        </div>
      </div>

      <div className="max-sm:hidden flex gap-x-6">
        {authState ? (
          <div>
            <div
              className="flex border-2 p-2 rounded-md border-gray-300 cursor-pointer"
              onClick={handleAvtClick}
            >
              <div>
                <img
                  src={authState?.avatarUrl}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <ArrowDropDownIcon fontSize="large" className="text-blue-600" />
              </div>
            </div>
            {isDown && (
              <div className="absolute z-10 bg-white w-24 border-2 border-slate-300">
                <div
                  onClick={handleHomeClick}
                  className="p-4 font-semibold hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                  Home
                </div>
                <div
                  onClick={handleProfileClick}
                  className="p-4 font-semibold hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                  Profile
                </div>
                <div
                  onClick={handleSettingsClick}
                  className="p-4 font-semibold hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                  Settings
                </div>
                <div
                  onClick={handleLogout}
                  className="p-4 font-semibold hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-blue-600 text-white border rounded-full px-6 py-2 font-semibold hover:bg-blue-700"
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
