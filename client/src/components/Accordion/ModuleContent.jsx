import { useState } from 'react'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import DescriptionIcon from '@mui/icons-material/Description'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'

function ModuleContent({
  moduleTitle,
  moduleDescription,
  moduleVideos,
  moduleExercises,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='my-2'>
      <button onClick={handleOpenAccordion} className={`bg-slate-600 cursor-pointer p-2 w-full text-left text-base text-white font-bold`} >Section 1</button>
      <div className={`px-2 py-1 bg-slate-100 ${!isOpen ? 'hidden' : ''}`}>
        <p className='mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div>
          <p className='font-bold'>Module contents:</p>
          <div className='ml-2'>
            <p className='font-bold mb-1'><PlayCircleIcon /> Videos:</p>
            <p><PlayCircleOutlineIcon /> JavaScript Promise • 10 minutes</p>
            <p><PlayCircleOutlineIcon /> JavaScript Promise • 10 minutes</p>
            <p><PlayCircleOutlineIcon /> JavaScript Promise • 10 minutes</p>
            <p><PlayCircleOutlineIcon /> JavaScript Promise • 10 minutes</p>
            <p><PlayCircleOutlineIcon /> JavaScript Promise • 10 minutes</p>
          </div>
          <div className='ml-2'>
            <p className='font-bold'><DescriptionIcon />Exercise:</p>
            <p><TextSnippetOutlinedIcon /> JavaScript Promise Exercise • 10 minutes</p>
            <p><TextSnippetOutlinedIcon /> JavaScript Promise Exercise • 10 minutes</p>
            <p><TextSnippetOutlinedIcon /> JavaScript Promise Exercise • 10 minutes</p>
            <p><TextSnippetOutlinedIcon /> JavaScript Promise Exercise • 10 minutes</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleContent