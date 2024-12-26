/* eslint-disable react/prop-types */
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { uploadVideo } from '../../../apis/upload';
import { toast } from 'react-toastify';
import CancelConfirmModal from '../Confirmation/CancelConfirmModal';

function NewVideoModal({
  isOpen,
  setIsOpen,
  handleCreate,
}) {
  const [newVideo, setNewVideo] = useState({
    videoTitle: '',
    videoUrl: '',
    videoLength: '',
  })
  const [isOpenCancel, setIsOpenCancel] = useState(false)

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
        setNewVideo({
          ...newVideo,
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
    setNewVideo({
      videoTitle: '',
      videoUrl: '',
      videoLength: '',
    })
    setIsOpen(false)
    setIsOpenCancel(false)
  }

  const validateData = () => {
    if (newVideo.videoTitle == '') {
      toast('Please provide video title', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newVideo.videoUrl == '') {
      toast('Please upload a video', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    return true
  }

  const handleAddNewVideo = () => {
    if (validateData()) {
      handleCreate(newVideo, resetData)
    }
  }

  const handleCancelAddNewVideo = () => {
    resetData()
  }

  return (
    <div
      className={`${isOpen ? '' : 'hidden'} absolute z-[90] top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="w-4/5 mx-auto mt-20 p-3 border-2 bg-white rounded-2xl lg:w-3/5 max-h-[75dvh] overflow-auto"
      >
        <div className="flex justify-between mb-4">
          <div className="font-bold text-2xl">New Video</div>
          <button
            onClick={() => setIsOpenCancel(true)}
            className="text-gray-500 hover:text-black"
          >
            ✖
          </button>
        </div>
        <div className="mb-4">
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-xl">Video Title</label>
            <input
              value={newVideo.videoTitle}
              onChange={(e) => {
                setNewVideo({ ...newVideo, videoTitle: e.target.value })
              }}
              placeholder='Enter video title'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-xl">Video Duration</label>
            <div className="w-3/5">
              <p className="w-3/5 text-base">{newVideo.videoLength}</p>
            </div>
          </div>
          <div className="flex w-full mb-2">
            <label className="w-2/5 font-bold text-xl">Video</label>
            <input onChange={handleChangeVideo} className="w-3/5 text-sm cursor-pointer bg-gray-50" type="file" />
          </div>
          {
            newVideo.videoUrl && (<div className='sm:h-[50dvh] mb-4'>
              <ReactPlayer
                url={newVideo.videoUrl}
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
            </div>)
          }
        </div>
        <div className="flex justify-center">
          <button onClick={() => setIsOpenCancel(true)} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
          <button onClick={handleAddNewVideo} className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Add</button>
        </div>
      </div>
      {
        isOpenCancel && (
          <CancelConfirmModal
            isOpen={isOpenCancel}
            confirmMessage={"Are you sure you want to discard adding new video ?"}
            handelClose={() => setIsOpenCancel(false)}
            handleSave={handleAddNewVideo}
            handleConfirmCancel={handleCancelAddNewVideo}
          />
        )
      }
    </div>
  )
}

export default NewVideoModal