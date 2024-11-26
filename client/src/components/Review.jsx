import React from "react";
import StarIcon from "@mui/icons-material/Star";
import formatDate from "../helpers/formatDate";
const Review = ({avatarUrl, username, reviewContent, createdAt, star}) => {
  return (
    <div className="flex gap-x-14 p-8 border-2 rounded-md">
      <div className="flex flex-col items-center gap-x-2 w-1/6">
        <img
          src={avatarUrl}
          width={50}
          className="rounded-full"
        />
        <h3 className="text-2xl">{username}</h3>
      </div>
      <div className="">
        <div className="flex items-center mb-4">
          <p className="font-semibold text-xl">{star}</p>
          <StarIcon color="primary" className=""/>
          <p className="ml-3">Reviewd on {formatDate(createdAt)}</p>
        </div>
        <p className="text-lg">
          {reviewContent}
        </p>
      </div>
    </div>
  );
};

export default Review;
