/* eslint-disable react/prop-types */
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { uploadVideo } from '../../../apis/upload'
import { toast } from 'react-toastify'
import CancelConfirmModal from '../Confirmation/CancelConfirmModal'

function VideoModal({
  video,
  isOpen,
  setIsOpen,
  isEditMode,
  handleEdit,
}) {
  const [isOpenCancel, setIsOpenCancel] = useState(false)
  const [editVideo, setEditVideo] = useState({
    videoUrl: video.videoUrl,
    videoTitle: video.videoTitle,
    videoLength: video.videoLength,
  })

  const handleChangeVideo = async (e) => {
    if (e.target.files) {
      try {
        const formData = new FormData()
        formData.append('video', e.target.files[0])
        const response = await uploadVideo(formData)
        if (response?.statusCode) {
          throw new Error(response.message)
        }
        toast(response.message, {
          type: 'success',
          autoClose: 2000,
        })
        setEditVideo({
          ...editVideo,
          videoLength: response.data.duration,
          videoUrl: response.data.url
        })
      } catch (error) {
        console.log(error)
        toast(error.message, {
          type: 'error',
          autoClose: 2000,
        })
      }
    }
  }

  const resetData = () => {
    setEditVideo({
      videoUrl: video.videoUrl,
      videoTitle: video.videoTitle,
      videoLength: video.videoLength,
    })
    setIsOpen(false)
    setIsOpenCancel(false)
  }

  const validateData = () => {
    if (editVideo.videoTitle == '') {
      toast('Please provide video title', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (editVideo.videoUrl == '') {
      toast('Please upload a video', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    return true
  }

  const handleEditVideo = () => {
    if (validateData()) {
      handleEdit(video.videoUrl, editVideo, resetData)
    }
  }
  const handleCancelEditVideo = () => {
    resetData()
  }

  return (
    <div
      className={`${isOpen ? '' : 'hidden'} absolute z-10 top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="w-4/5 mx-auto mt-20 p-3 border-2 bg-white rounded-2xl lg:w-3/5 max-h-[75dvh] overflow-auto"
      >
        <div className="flex justify-between mb-4">
          <div className="font-bold text-2xl">
            {
              isEditMode ? (
                <>
                  Editing Video
                </>
              ) : (
                <>
                  Video Detail
                </>
              )
            }
          </div>
          <button
            onClick={() => {
              if (isEditMode) {
                setIsOpenCancel(true)
              } else {
                setIsOpen(false)
              }
            }}
            className="text-gray-500 hover:text-black"
          >
            ✖
          </button>
        </div>
        <div className="mb-4 w-full">
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-xl">Video Title</label>
            {
              isEditMode ? (
                <input
                  value={editVideo.videoTitle}
                  onChange={(e) => {
                    setEditVideo({ ...editVideo, videoTitle: e.target.value })
                  }}
                  placeholder='Enter video title'
                  className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                />
              ) : (
                <p className="w-3/5 text-base">{editVideo.videoTitle}</p>
              )
            }
          </div>
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-xl">Video Duration</label>
            <div className="w-3/5">
              <p className="w-3/5 text-base">{editVideo.videoLength} minutes</p>
            </div>
          </div>
          {
            isEditMode && (
              <div className="flex w-full items-center mb-4">
                <label className="w-2/5 font-bold text-xl">Video</label>
                <input onChange={handleChangeVideo} className="w-3/5 text-sm cursor-pointer bg-gray-50" type="file" />
              </div>
            )
          }
          <div className='sm:h-[50dvh] mb-4'>
            <ReactPlayer
              url={isEditMode ? editVideo.videoUrl : video.videoUrl}
              width={"100%"}
              height={"100%"}
              controls={true}
              playing={false}
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload'
                  }
                }
              }}
            />
          </div>
          {
            isEditMode && (
              <div className="flex justify-center">
                <button onClick={() => setIsOpenCancel(true)} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
                <button onClick={handleEditVideo} className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Save</button>
              </div>
            )
          }
        </div>
      </div>
      {
        isOpenCancel && (
          <CancelConfirmModal
            isOpen={isOpenCancel}
            confirmMessage={"Are you sure you want to discard all changes to this video ?"}
            handelClose={() => setIsOpenCancel(false)}
            handleSave={handleEditVideo}
            handleConfirmCancel={handleCancelEditVideo}
          />
        )
      }
    </div>
  )
}

export default VideoModal