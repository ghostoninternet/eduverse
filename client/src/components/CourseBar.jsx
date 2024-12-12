import React from "react";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import CourseRating from "./CourseRating";
const CourseBar = ({
  title,
  instructorName,
  avgRating,
  handleClick,
  courseImgUrl,
}) => {
  return (
    <div
      onClick={handleClick}
      className="flex border-2 px-8 py-2 bg-white cursor-pointer hover:bg-blue-500 hover:text-white rounded-md"
    >
      <div className="w-1/12 flex justify-center mr-2">
        <img src={courseImgUrl} width={40} className="rounded-full" />
      </div>
      <div className="w-11/12">
        <div className="flex justify-between">
          <div className="text-xl">{title}</div>
          <div className="flex items-center">
            <CourseRating rating={avgRating} />
          </div>
        </div>
        <div>
          <p className="text-sm">By {instructorName}</p>
        </div>
      </div>
    </div>
  );
};

CourseBar.propTypes = {
  title: PropTypes.string,
  instructorName: PropTypes.string,
  avgRating: PropTypes.string,
  handleClick: PropTypes.func,
  courseImgUrl: PropTypes.string,
};
export default CourseBar;
