import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import formatDate from "../helpers/formatDate"
const Exercise = ({
  isPlaying,
  handleExerciseClick,
  exerciseDuration,
  exerciseName,
}) => {
  return (
    <div
      className={`flex p-4 gap-x-4 hover:bg-gray-300 ${
        isPlaying && "bg-gray-300"
      }`}
      onClick={handleExerciseClick}
    >
      <div className="w-1/12 flex justify-center items-center">
        <input
          type="checkbox"
          style={{ width: "20px", height: "20px" }}
          disabled
        />
      </div>
      <div className="w-11/12 flex items-center gap-x-2">
        <AssignmentIcon fontSize="large" />
        <div className="flex flex-col gap-y-1">
          <div className="flex gap-x-3 text-xl">
            <h3 className="">{exerciseName}</h3>
            <p className="text-xl">・Highest Score 0/100 points</p>
          </div>
          <p>Last submitted: {formatDate("2024-12-12T02:21:12.585Z")}</p>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
