import React from "react";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import CourseRating from "./CourseRating";
const CourseBar = ({ title, instructorName, avgRating, handleClick }) => {
  return (
    <div onClick={handleClick} className="border-2 px-8 py-2 bg-white cursor-pointer hover:bg-blue-500 hover:text-white rounded-md">
      <div className="flex justify-between">
        <div className="text-xl">{title}</div>  
        <div className="flex items-center">
          <CourseRating rating={avgRating}/>
        </div>
      </div>
      <div>
        <p className="text-sm">By {instructorName}</p>
      </div>
    </div>
  );
};

CourseBar.propTypes = {
  title: PropTypes.string,
  instructorName: PropTypes.string,
  avgRating: PropTypes.string,
  handleClick: PropTypes.func,
};
export default CourseBar;
