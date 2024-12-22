/* eslint-disable react/prop-types */
import { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import NewExerciseQuiz from './NewExerciseQuiz'
import ExerciseQuiz from './ExerciseQuiz'
import { toast } from 'react-toastify'

function NewExerciseModal({
  moduleId,
  module,
  isOpen,
  setIsOpen,
  handleCreate
}) {
  const [newExercise, setNewExercise] = useState({
    exerciseModule: moduleId,
    exerciseName: '',
    exerciseQuizes: [],
    exercisePassScore: 0,
    exerciseDuration: 0,
  })
  const [showAddNewQuiz, setShowAddNewQuiz] = useState(false)
  
  const validateNewExerciseData = () => {
    if (newExercise.exerciseName == '') {
      toast('Please provide exercise name!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newExercise.exerciseDuration == 0) {
      toast('Exercise duration must be larger than 1 minutes!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newExercise.exercisePassScore == 0) {
      toast('Exercise pass score must be larger than 10%', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newExercise.exerciseQuizes.length == 0) {
      toast('Exercise must has at least one quiz!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    return true
  }

  const resetData = () => {
    setNewExercise({
      exerciseModule: moduleId,
      exerciseName: '',
      exerciseQuizes: [],
      exercisePassScore: 0,
      exerciseDuration: 0,
    })
    setIsOpen(false)
  }

  const handleAddNewExercise = async () => {
    if (validateNewExerciseData()) {
      handleCreate(newExercise, resetData)
    }
  }
  const handleCancelAddNewExercise = async () => {
    resetData()
  }

  const handleAddQuiz = (newQuiz) => {
    setNewExercise({
      ...newExercise,
      exerciseQuizes: [...newExercise.exerciseQuizes, newQuiz]
    })
  }
  const handleCancelAddQuiz = () => {
    setShowAddNewQuiz(false)
  }

  return (
    <>
      <div
        className={`${isOpen ? '' : 'hidden'} absolute top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="w-4/5 mx-auto mt-20 p-3 border-2 bg-white rounded-2xl lg:w-3/5 max-h-[70dvh] overflow-auto">
          <div className="flex justify-between mb-4">
            <div className="font-bold text-2xl">New Exercise</div>
            <button onClick={() => { setIsOpen(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
              X
            </button>
          </div>
          <div className="mb-4">
            <div className="flex w-full items-center mb-2">
              <label className="w-2/5 font-bold text-base md:text-xl">Exercise Title</label>
              <input
                placeholder='Enter exercise title'
                className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                value={newExercise.exerciseName}
                onChange={(e) => setNewExercise({
                  ...newExercise,
                  exerciseName: e.target.value
                })}
              />
            </div>
            <div className="flex w-full items-center mb-2">
              <label className="w-2/5 font-bold text-base md:text-xl">Module</label>
              <div className="w-3/5">
                <p className="w-3/5 text-base">{module}</p>
              </div>
            </div>
            <div className="flex w-full mb-2">
              <label className="w-2/5 font-bold text-base md:text-xl">Exercise Duration</label>
              <input
                placeholder='Enter exercise duration in minutes'
                className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                value={newExercise.exerciseDuration}
                onChange={(e) => setNewExercise({
                  ...newExercise,
                  exerciseDuration: e.target.value
                })}
              />
            </div>
            <div className="flex w-full mb-2">
              <label className="w-2/5 font-bold text-base md:text-xl">Pass Score</label>
              <input
                placeholder='Enter exercise pass score on scale 100%'
                className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                value={newExercise.exercisePassScore}
                onChange={(e) => setNewExercise({
                  ...newExercise,
                  exercisePassScore: e.target.value
                })}
              />
            </div>

            <div className="lg:flex w-full mb-5">
              <div className="text-base lg:w-2/5 font-bold md:text-xl">Quizes</div>
              <div className="mt-2 lg:w-3/5">
                {
                  newExercise.exerciseQuizes.length !== 0 &&
                  newExercise.exerciseQuizes.map((quiz, index) => <ExerciseQuiz key={index} quiz={quiz} index={index} />)
                }
                <button onClick={() => setShowAddNewQuiz(true)} className='border-black border-2 rounded-xl w-3/5'>
                  <AddCircleIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={() => handleCancelAddNewExercise()} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
            <button onClick={() => handleAddNewExercise()} className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Add</button>
          </div>
        </div>
      </div>

      <NewExerciseQuiz
        isOpen={showAddNewQuiz}
        setIsOpen={setShowAddNewQuiz}
        handleAdd={handleAddQuiz}
        handleCancel={handleCancelAddQuiz}
      />
    </>
  )
}

export default NewExerciseModal