import React from 'react'
import ReactPlayer from 'react-player'

function VideoModal({
  isOpen,
  setIsOpen,
  isEditMode,
}) {
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
          <div className="font-bold text-2xl">Video Title Here</div>
          <button onClick={() => { setIsOpen(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
            X
          </button>
        </div>
        <div className="mb-4 w-full">
          {
            isEditMode ? (
              <div className="flex w-full items-center mb-4">
                <label className="w-2/5 font-bold text-xl">Video</label>
                <input className="w-3/5 text-sm cursor-pointer bg-gray-50" type="file" />
              </div>
            ) : (
              null
            )
          }
          <div className='sm:h-[50dvh] mb-4'>
            <ReactPlayer
              url={"https://www.youtube.com/watch?v=LEibQkljoiA"}
              width={"100%"}
              height={"100%"}
              style={{
              }}
            />
          </div>
          {
            isEditMode && (
              <div className="flex justify-center">
                <button onClick={() => { setIsOpen(false) }} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
                <button className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Save</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default VideoModal