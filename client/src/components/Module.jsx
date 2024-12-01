import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Video from "./Video";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const Module = ({ title, videos, index,seenVideo, totalVideos }) => {
  const [isHidden, setIsHidden] = useState("true");
  const handleClickArrow = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className="w-2/3 border-y-2 cursor-pointer" >
      <div className="flex justify-between bg-gray-100 p-4" onClick={handleClickArrow}>
        <div>
          <p className="text-2xl font-semibold">{index}. {title}</p>
          <div className="flex gap-x-2">
            <p>{seenVideo} / {totalVideos} |</p>
            <p>37 mins</p>
          </div>
        </div>
        <div >
          {isHidden ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon/>}
        </div>
      </div>
      {!isHidden && (
        <div className=" ">
          {videos?.map((video, index) => (
            <Video index={index+1} key={video._id} title={video.videoTitle} isChecked={video.isFinish}/>
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
};

export default Module;
