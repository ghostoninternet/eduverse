import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from 'prop-types'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TaskIcon from '@mui/icons-material/Task';
const ModuleOverview = ({moduleTitle, moduleDescription, videoLessons, exercises, index }) => {
  const [isDown, setIsDown] = useState(false);
  const handleClickDown = () => {
    setIsDown(!isDown);
  };
  return (
    <div className="border-b-2">
      <div onClick={handleClickDown} className="cursor-pointer hover:bg-blue-100 mb-3 p-4">
        <div className="flex justify-between" >
          <h3 className="text-2xl font-semibold">{index+ 1}. {moduleTitle}</h3>
          {isDown ? <KeyboardArrowUpIcon fontSize="large"/> : <KeyboardArrowDownIcon fontSize="large"/>}
        </div>
        {/* <div>1 hour to complete</div> */}
      </div>
      {isDown && (
        <div className="px-4 mb-4">
          <p className="text-xl">{moduleDescription}</p>
          <p className="text-xl font-semibold my-4">What's included</p>
          <div className="flex flex-col text-xl">
            <div className="flex gap-x-4 font-semibold items-center mb-2">
                <PlayCircleOutlineIcon/>
                <p>{videoLessons?.length} video(s)</p>
            </div>
            <div>
                {videoLessons.map((video, index) => {
                    return (
                        <div key={video._id} className="flex gap-x-6">
                            <p>{index+1}. {video.videoTitle} </p>
                            <p>・</p>
                            <p className="text-gray-400">{video.videoLength} minutes</p>
                        </div>
                    )
                })}
            </div>
          </div>
          <div className="text-xl">
            <div className="flex gap-x-3 font-semibold mt-8 mb-2">
                <TaskIcon/>
                <p>{exercises?.length} assignment(s)</p>
                <p></p>
            </div>
            <div>
                {exercises?.map((exercise,index) => {
                    return (
                        <div key={exercise.exerciseName} className="flex gap-x-6">
                            <p>{index+1}. {exercise.exerciseName} </p>
                            <p>・</p>
                            <p className="text-gray-400">{exercise.exerciseDuration} minutes</p>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ModuleOverview.propTypes = {
    moduleTitle: PropTypes.string,
    moduleDescription: PropTypes.string,
    videoLessons: PropTypes.array,
    exercises: PropTypes.array,
}

export default ModuleOverview;
