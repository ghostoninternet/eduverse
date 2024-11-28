import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Video from "./Video";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const Module = ({ title, videos }) => {
  const [isHidden, setIsHidden] = useState("true");
  const handleClickArrow = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className="w-2/3 border-y-2 cursor-pointer" >
      <div className="flex justify-between bg-gray-100 p-4" onClick={handleClickArrow}>
        <div>
          <p className="text-2xl font-semibold">{title}</p>
          <div className="flex gap-x-2">
            <p>9 / 9 |</p>
            <p>37 mins</p>
          </div>
        </div>
        <div >
          {isHidden ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon/>}
        </div>
      </div>
      {!isHidden && (
        <div className=" ">
          {videos.map((video) => (
            <Video key={video.id} title={video.videoTitle} />
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
};

export default Module;
