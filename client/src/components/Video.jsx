import React from 'react'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PropTypes from "prop-types";
const Video = ({title, index,isChecked, onClick, videoLength, isPlaying}) => {
  return (
    <div className={`flex p-4 gap-x-4 items-center cursor-pointer hover:bg-gray-300 ${isPlaying && "bg-gray-300 "}`} onClick={onClick}> 
      <div className=''>
        <input type='checkbox' style={{ width: '20px', height: '20px' }} className='cursor-pointer' disabled checked={isChecked} />
      </div>
      <div className='flex flex-col gap-y-2'>
        <p className='text-xl'>{index}. {title}</p>
        <div className='flex gap-x-2 text-gray-500'>
            <OndemandVideoIcon/>
            <p>{videoLength} mins</p>
        </div>
      </div>
    </div>
  )
}
Video.propTypes = {
  title: PropTypes.string,
  index: PropTypes.number,
  isChecked: PropTypes.bool,
  onClick: PropTypes.func,
  videoLength: PropTypes.number,
<<<<<<< HEAD
  isPlaying: PropTypes.bool
=======
>>>>>>> 50344c4d1b9232480b7c573152d6f5cd3fe8f8b7
};
export default Video
