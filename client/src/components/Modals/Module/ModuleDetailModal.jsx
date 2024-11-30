import SelectDropdown from '../../Input/SelectDropdown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModuleVideo from '../Videos/ModuleVideo';
import ModuleExercise from '../Exercise/ModuleExercise';
import { useState } from 'react';
import NewExerciseModal from '../Exercise/NewExerciseModal';

function ModuleDetailModal({
  isOpen,
  setOpen,
  isEditMode,
  handleCancelCreateNewModule
}) {
  const [showAddNewVideo, setShowAddNewVideo] = useState(false)
  const [showAddNewExercise, setShowAddNewExercise] = useState(false)

  const handleCancelCreateNewExercise = () => {
    setShowAddNewExercise(false)
  }

  return (
    <>
      <div
        className={`${isOpen ? '' : 'hidden'} absolute top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="w-4/5 mx-auto mt-10 p-3 border-2 bg-white rounded-2xl max-h-[90dvh] overflow-auto">
          <div className="flex justify-end mb-4">
            <button onClick={() => { setOpen(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
              X
            </button>
          </div>
          <div className="mb-4">
            <div className="flex w-full mb-2">
              <label className="w-2/5 font-bold text-base">Module Title</label>
              {
                isEditMode ? (
                  <input
                    placeholder='Enter module title'
                    className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                  />
                ) : (
                  <p className="w-3/5 text-base">Introduction to Web Development</p>
                )
              }
            </div>
            <div className="flex w-full mb-2">
              <label className="w-2/5 font-bold text-base">Module Description</label>
              {
                isEditMode ? (
                  <textarea
                    placeholder='Enter course description'
                    className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                  />
                ) : (
                  <p className="w-3/5 text-base">Introduction to Web Development. Introduction to Web Development. Introduction to Web Development. Introduction to Web Development.</p>
                )
              }
            </div>
            <div className="flex w-full mb-2">
              <label className="w-2/5 font-bold text-base">Course</label>
              <div className="w-3/5">
                {
                  isEditMode ? (
                    <SelectDropdown

                    />
                  ) : (
                    <p className="w-3/5 text-base">Introduction to Web Development</p>
                  )
                }
              </div>
            </div>
            <div className="flex w-full mb-2">
              <label className="w-2/5 font-bold text-base">Module Duration</label>
              {
                isEditMode ? (
                  <input
                    value={"135"}
                    disabled
                    className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                  />
                ) : (
                  <p className="w-3/5 text-base">135 minutes</p>
                )
              }
            </div>
            <div className="lg:flex w-full mb-5">
              <div className="text-base lg:w-2/5 font-bold md:text-xl">Videos</div>
              <div className="mt-2 lg:w-3/5">
                <ModuleVideo isEditMode={isEditMode} />
                <ModuleVideo isEditMode={isEditMode} />
                <ModuleVideo isEditMode={isEditMode} />
                <ModuleVideo isEditMode={isEditMode} />
                {
                  isEditMode && (
                    <button className='border-black border-2 rounded-xl w-3/5'>
                      <AddCircleIcon />
                    </button>
                  )
                }
              </div>
            </div>
            <div className="lg:flex w-full mb-5">
              <div className="text-base lg:w-2/5 font-bold md:text-xl">Exercise</div>
              <div className="mt-2 lg:w-3/5">
                <ModuleExercise isEditMode={isEditMode} />
                <ModuleExercise isEditMode={isEditMode} />
                <ModuleExercise isEditMode={isEditMode} />
                <ModuleExercise isEditMode={isEditMode} />
                {
                  isEditMode && (
                    <button onClick={() => { setShowAddNewExercise(true) }} className='border-black border-2 rounded-xl w-3/5'>
                      <AddCircleIcon />
                    </button>
                  )
                }
              </div>
            </div>
            {
              isEditMode && (
                <div className="flex justify-center">
                  <button onClick={handleCancelCreateNewModule} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
                  <button className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Add</button>
                </div>
              )
            }
          </div>
        </div>
      </div>
      
      <NewExerciseModal
        isOpen={showAddNewExercise}
        setIsOpen={setShowAddNewExercise}
        handleCancel={handleCancelCreateNewExercise}
      />
    </>
  )
}

export default ModuleDetailModal