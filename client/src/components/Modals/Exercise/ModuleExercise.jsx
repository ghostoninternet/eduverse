/* eslint-disable react/prop-types */
import { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExerciseDetailModal from './ExerciseDetailModal';
import DeleteConfirmModal from '../Confirmation/DeleteConfirmModal';

function ModuleExercise({
  isEditMode,
  exercise,
  handleDelete,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenExercise, setIsOpenExercise] = useState(false)
  const [selectExercise, setSelectExercise] = useState(null)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const resetData = () => {
    setIsOpenDelete(false)
    setSelectExercise(null)
  }

  const handleCancelDelete = () => {
    setIsOpenDelete(false)
  }
  const handleConfirmDelete = () => {
    handleDelete(selectExercise, resetData)
  }

  return (
    <div onClick={() => setIsOpen(false)} className="flex items-center gap-4 mb-2 bg-slate-200 px-2 py-1 rounded-xl">
      <div className='w-4/5'>{exercise?.exerciseName}</div>
      {
        isEditMode ?
          (
            <div className='flex gap-2 relative'>
              <button
                onClick={() => { 
                  setIsOpenExercise(true)
                  setSelectExercise(exercise._id)
                }}
                className="hidden md:inline-block py-1 px-2 bg-slate-300 rounded-xl font-bold"
              >
                Edit
              </button>
              <button onClick={() => {
                setIsOpenDelete(true)
                setSelectExercise(exercise._id)
              }} className="hidden md:inline-block py-1 px-2 bg-red-500 text-white rounded-xl font-bold">
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
                    setIsOpenExercise(true)
                    setSelectExercise(exercise._id)
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
                    setSelectExercise(exercise._id)
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
                <button onClick={() => { 
                  setIsOpenExercise(true)
                  setSelectExercise(exercise._id)
                }} className="py-1 px-2 bg-slate-300 rounded-xl font-bold">
                  Preview
                </button>
              </div>
            </>
          )
      }
      {
        isOpenExercise && (
          <ExerciseDetailModal
            exerciseId={selectExercise}
            isOpen={isOpenExercise}
            setIsOpen={setIsOpenExercise}
            isEditMode={isEditMode}
          />
        )
      }
      {
        isOpenDelete && (
          <DeleteConfirmModal
            isOpen={isOpenDelete}
            confirmMessage={'Are you sure you want to delete this exercise from this module ? This action can not be undo!'}
            handleCancel={handleCancelDelete}
            handleDelete={handleConfirmDelete}
          />
        )
      }
    </div>
  )
}

export default ModuleExercise