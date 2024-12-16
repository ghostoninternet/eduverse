import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Question from "./Question";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PropTypes from "prop-types";
const ExerciseDetail = ({
  quizes,
  exerciseName,
  isReady,
  handleStartClick,
  isSubmitted,
  handleSubmitAnswer
}) => {
  
  return (
    <div className="flex flex-col px-16 py-6 min-h-80">
      <div className="flex justify-between">
        <h2 className="text-4xl font-semibold underline">{exerciseName}</h2>
        <div className=" flex gap-x-2 place-self-end items-center">
          {isReady ? (
            <div
              className="cursor-pointer bg-red-500 text-white font-semibold  py-1 px-4 mr-4 rounded-md flex justify-center items-center"
              onClick={handleStartClick}
            >
              <button className="text-xl pl-2">Reset</button>
              <RestartAltIcon fontSize="large" />
            </div>
          ) : (
            <div
              className="cursor-pointer bg-green-500 text-white font-semibold  py-1 px-4 mr-4 rounded-md flex justify-center items-center"
              onClick={handleStartClick}
            >
              <button className="text-xl pl-2">Start</button>
              <PlayArrowIcon fontSize="large" />
            </div>
          )}
        </div>
      </div>
      {isReady ? (
        <div className="flex flex-col">
          <div>
            {quizes?.map((quiz, index) => (
              <Question
                key={index}
                choices={quiz.choices}
                isAnswer={quiz.answer}
                question={quiz.question}
                index={index + 1}
                isSubmitted={isSubmitted}
              />
            ))}
          </div>
          <button className="place-self-end border px-4 py-2 mt-6 text-xl font-semibold rounded-md bg-blue-500 text-white" onClick={handleSubmitAnswer}>
            Submit
          </button>
        </div>
      ) : (
        <p className="flex justify-center items-center p-20 text-xl">
          If you are ready, please click "Start" button!
        </p>
      )}
    </div>
  );
};
ExerciseDetail.propTypes = {
  choices: PropTypes.array,
  exerciseName: PropTypes.string,
  quizes: PropTypes.array,
  isReady: PropTypes.bool,
  handleStartClick: PropTypes.func,
};
export default ExerciseDetail;
