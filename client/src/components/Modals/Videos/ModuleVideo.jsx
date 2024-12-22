/* eslint-disable react/prop-types */
import { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VideoModal from './VideoModal';
import DeleteConfirmModal from '../Confirmation/DeleteConfirmModal';

function ModuleVideo({
  video,
  isEditMode,
  handleEdit,
  handleDelete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const handleDeleteVideo = () => {
    handleDelete(video.videoUrl)
    setIsOpenDelete(false)
  }
  const handleCancelDeleteVideo = () => {
    setIsOpenDelete(false)
  }

  return (
    <div onClick={() => setIsOpen(false)} className="flex items-center gap-4 mb-2 bg-slate-200 px-2 py-1 rounded-xl">
      <div className='w-4/5'>{video?.videoTitle} • {video?.videoLength} minutes</div>
      {
        isEditMode ?
          (
            <div className='flex gap-2 relative'>
              <button onClick={() => { setIsOpenVideo(true) }} className="hidden md:inline-block py-1 px-2 bg-slate-300 rounded-xl font-bold">
                Edit
              </button>
              <button
                onClick={() => { setIsOpenDelete(true) }}
                className="hidden md:inline-block py-1 px-2 bg-red-500 text-white rounded-xl font-bold"
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(!isOpen)
                }}
                className="md:hidden py-1 px-1 bg-slate-300 rounded-xl font-bold">
                <MoreHorizIcon />
              </button>
              <div className={`md:hidden ${!isOpen ? 'hidden' : ''} absolute z-[1] top-[34px] left-[-1.4rem] bg-slate-100 py-2 rounded-lg`}>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpenVideo(true)
                    setIsOpen(false)
                  }}
                  className='cursor-pointer hover:bg-slate-300 bg-slate-100 p-1 sm:p-2'
                >
                  Edit
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(!isOpen)
                    setIsOpenDelete(true)
                  }}
                  className='cursor-pointer hover:bg-slate-300 bg-slate-100 p-1 sm:p-2'
                >
                  Delete
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='flex gap-2 relative'>
                <button onClick={() => { setIsOpenVideo(true) }} className="py-1 px-2 bg-slate-300 rounded-xl font-bold">
                  Preview
                </button>
              </div>
            </>
          )
      }
      {
        isOpenVideo && (
          <VideoModal
            video={video}
            isOpen={isOpenVideo}
            setIsOpen={setIsOpenVideo}
            isEditMode={isEditMode}
            handleEdit={handleEdit}
          />
        )
      }
      {
        isOpenDelete && (
          <DeleteConfirmModal
            confirmMessage={"Are you sure you want to remove this video ?"}
            isOpen={isOpenDelete}
            handleDelete={handleDeleteVideo}
            handleCancel={handleCancelDeleteVideo}
          />
        )
      }

    </div>
  )
}

export default ModuleVideo