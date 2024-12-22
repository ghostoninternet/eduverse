import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Video from "./Video";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExerciseBar from "./ExerciseBar";
const Module = ({
  title,
  videos,
  index,
  seenVideo,
  totalVideos,
  handleVideoClick,
  moduleId,
  currentVideoId,
  handleExerciseClick,
  exercises,
  exerciseId
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const handleModuleClick = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className="border-y-2 cursor-pointer">
      <div
        className="flex justify-between bg-gray-100 p-4"
        onClick={handleModuleClick}
      >
        <div>
          <p className="text-2xl font-semibold">
            {index}. {title}
          </p>
          <div className="flex gap-x-2">
            <p>
              Completed {seenVideo} / {totalVideos} videos
            </p>
            <p></p>
          </div>
        </div>
        <div>
          {isHidden ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
      </div>
      {!isHidden && (
        <div>
          <div className="">
            {videos?.map((video, index) => (
              <Video
                index={index + 1}
                key={video?._id}
                title={video?.videoTitle}
                isChecked={video?.isFinish}
                onClick={() =>
                  handleVideoClick(
                    video?.videoTitle,
                    moduleId,
                    video?.videoUrl,
                    video?._id
                  )
                }
                isPlaying={currentVideoId === video?._id}
                videoLength={video?.videoLength}
              />
            ))}
          </div>
          <div>
            {exercises?.map((exercise) => (
              <ExerciseBar
                key={exercise._id}
                handleExerciseClick={() => handleExerciseClick(exercise.exerciseId, exercise.exerciseName)}
                exerciseName={exercise.exerciseName}
                isPlaying={exerciseId == exercise.exerciseId}
                latestSubmitDate={exercise?.previousSubmitDate}
                isChecked={exercise?.hasPassed}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Module.propTypes = {
  videos: PropTypes.array,
  handleClickArrow: PropTypes.func,
  title: PropTypes.string,
  index: PropTypes.number,
  seenVideo: PropTypes.number,
  totalVideos: PropTypes.number,
  handleVideoClick: PropTypes.func,
  moduleId: PropTypes.string,
  currentVideoId: PropTypes.string,
  exercises: PropTypes.array,
  handleExerciseClick: PropTypes.func,
  exerciseId: PropTypes.string,
};

export default Module;