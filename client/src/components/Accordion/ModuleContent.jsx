/* eslint-disable react/prop-types */
import { useState } from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import DescriptionIcon from '@mui/icons-material/Description'

function ModuleContent({ courseModule }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='my-2'>
      <button onClick={handleOpenAccordion} className={`bg-slate-600 cursor-pointer p-2 w-full text-left text-base text-white font-bold`} >{courseModule.moduleTitle}</button>
      <div className={`px-2 py-1 bg-slate-100 ${!isOpen ? 'hidden' : ''}`}>
        <p className='mb-2'>{courseModule.moduleDescription}</p>
        <div>
          <p className='font-bold'>Module contents:</p>
          <div className='ml-2'>
            <p className='font-bold mb-1'><PlayCircleIcon /> Videos:</p>
            {
              courseModule.moduleVideoLessons.map(video => (
                <p key={video.videoTitle}><PlayCircleOutlineIcon /> {video.videoTitle} • {video.videoLength} minutes</p>
              ))
            }
          </div>
          <div className='ml-2'>
            <p className='font-bold'><DescriptionIcon />Exercise:</p>
            {
              courseModule.moduleExercises.map(exercise => (
                <p key={exercise.exerciseName}><PlayCircleOutlineIcon /> {exercise.exerciseName} • {exercise.exerciseDuration} minutes</p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleContent