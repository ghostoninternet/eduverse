import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PropTypes from "prop-types";
const CourseRating = ({ rating, maxStars = 5 }) => {
  // Calculate full, half, and empty stars
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex items-center">
      <span className=" font-medium text-lg ">{rating?.toFixed(1)}</span>
      {/* Render full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <StarIcon key={`full-${index}`} color="primary" />
        ))}
      {/* Render half star if applicable */}
      {hasHalfStar && <StarHalfIcon color="primary" />}
      {/* Render empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <StarBorderIcon key={`empty-${index}`} color="primary" />
        ))}
    </div>
  );
};

CourseRating.propTypes = {
  rating: PropTypes.number,
  maxStars: PropTypes.number,
};

export default CourseRating;
