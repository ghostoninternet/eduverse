import React from "react";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import formatDate from "../helpers/formatDate";
import PropTypes from "prop-types";
import deleteCourseReview from "../apis/review/deleteCourseReview"; // Import API delete

const Review = ({ avatarUrl, username, reviewContent, createdAt, star, reviewId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteCourseReview(reviewId); // Gọi API delete
      if (response.success) {
        onDelete(reviewId); // Gọi callback để cập nhật danh sách review
      } else {
        alert("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="flex gap-x-14 p-8 border-2 rounded-md relative">
      <div className="flex flex-col items-center gap-x-2 w-1/6 justify-center">
        <img src={avatarUrl} width={50} className="rounded-full" alt="User Avatar" />
        <h3 className="text-2xl text-center">{username}</h3>
      </div>
      <div className="w-5/6">
        <div className="flex items-center mb-4">
          <p className="font-semibold text-xl">{star}</p>
          <StarIcon color="primary" />
          <p className="ml-3">Reviewed on {formatDate(createdAt)}</p>
        </div>
        <p className="text-lg">{reviewContent}</p>
      </div>
      <button
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100"
        onClick={handleDelete}
      >
        <CloseIcon color="error" />
      </button>
    </div>
  );
};

Review.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  reviewContent: PropTypes.string,
  createdAt: PropTypes.string,
  star: PropTypes.number,
  reviewId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Review;
