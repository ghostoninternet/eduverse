import React from 'react'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
const Video = ({title}) => {
  return (
    <div className='flex p-4 gap-x-4 items-center cursor-pointer hover:bg-gray-100'>
      <div className=''>
        <input type='checkbox' style={{ width: '20px', height: '20px' }}/>
      </div>
      <div className='flex flex-col gap-y-2'>
        <p className='text-xl'>1. {title}</p>
        <div className='flex gap-x-2 text-gray-500'>
            <OndemandVideoIcon/>
            <p>1 mins</p>
        </div>
      </div>
    </div>
  )
}

export default Video
