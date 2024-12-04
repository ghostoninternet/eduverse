import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Video from "./Video";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const Module = ({
  title,
  videos,
  index,
  seenVideo,
  totalVideos,
  handleVideoClick,
  module,
}) => {
  const [isHidden, setIsHidden] = useState("true");
  const handleClickArrow = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className="border-y-2 cursor-pointer">
      <div
        className="flex justify-between bg-gray-100 p-4"
        onClick={handleClickArrow}
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
        <div className="">
          {videos?.map((video, index) => (
            <Video
              index={index + 1}
              key={video._id}
              title={video.videoTitle}
              isChecked={video.isFinish}
              onClick={(video, module) =>
                handleVideoClick(video.videoUrl,module._id, video.videoTitle)
              }
              videoLength={video.videoLength}
            />
          ))}
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
};

export default Module;
