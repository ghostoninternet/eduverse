/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { getExerciseDetail, updateExercise } from '../../../apis/instructorExercise';
import ExerciseQuiz from './ExerciseQuiz';
import Spinner from '../../Spinner/Spinner';
import NewExerciseQuiz from './NewExerciseQuiz';

function ExerciseDetailModal({
  exerciseId,
  isOpen,
  setIsOpen,
  isEditMode,
}) {
  const [exerciseDetail, setExerciseDetail] = useState(null)
  const [editExerciseData, setEditExerciseData] = useState({
    exerciseModule: '',
    exerciseName: '',
    exercisePassScore: 0,
    exerciseDuration: 0,
    exerciseQuizes: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [showAddNewQuiz, setShowAddNewQuiz] = useState(false)

  const handleAddNewQuiz = (newQuiz) => {
    console.log('🚀 ~ handleAddNewQuiz ~ newQuiz:', newQuiz)
    setEditExerciseData({
      ...editExerciseData,
      exerciseQuizes: [...editExerciseData.exerciseQuizes, newQuiz]
    })
  }
  const handleCancelAddNewQuiz = () => {
    setShowAddNewQuiz(false)
  }
  
  const handleUpdateExercise = async () => {
    setIsLoading(true)
    try {
      const response = await updateExercise(exerciseId, editExerciseData)
      if (response?.stack) {
        throw new Error(response.message)
      }
      setExerciseDetail(response)
      setEditExerciseData({
        exerciseModule: response.exerciseModule._id,
        exerciseName: response.exerciseName,
        exercisePassScore: response.exercisePassScore,
        exerciseDuration: response.exerciseDuration,
        exerciseQuizes: response.exerciseQuizes,
      })
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 800,
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleCancelUpdateExercise = () => {
    setIsOpen(false)
    setEditExerciseData({
      ...editExerciseData,
      exerciseName: editExerciseData.exerciseName,
      exercisePassScore: editExerciseData.exercisePassScore,
      exerciseDuration: editExerciseData.exerciseDuration,
      exerciseQuizes: editExerciseData.exerciseQuizes,
    })
    setShowAddNewQuiz(false)
  }

  const fetchExerciseDetail = async (exerciseId) => {
    try {
      const response = await getExerciseDetail(exerciseId)
      setExerciseDetail(response)
      setEditExerciseData({
        exerciseModule: response.exerciseModule._id,
        exerciseName: response.exerciseName,
        exercisePassScore: response.exercisePassScore,
        exerciseDuration: response.exerciseDuration,
        exerciseQuizes: response.exerciseQuizes,
      })
    } catch (error) {
      console.log(error)
      toast(error.message, {
        type: 'error',
        autoClose: 800,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetail(exerciseId)
  }, [exerciseId])

  return (
    <div
      className={`${isOpen ? '' : 'hidden'} absolute z-10 top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="w-4/5 mx-auto mt-20 p-3 border-2 bg-white rounded-2xl lg:w-3/5 max-h-[70dvh] overflow-auto"
      >
        <div className="flex justify-end mb-4">
          <button onClick={() => { setIsOpen(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
            X
          </button>
        </div>
        {
          isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : exerciseDetail ? (
            <div className="mb-4">
              <div className="flex w-full mb-2">
                <label className="w-2/5 font-bold text-base">Exercise Title</label>
                {
                  isEditMode ? (
                    <input
                      placeholder='Enter exercise title'
                      className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                      value={editExerciseData.exerciseName}
                      onChange={(e) => setEditExerciseData({
                        ...editExerciseData,
                        exerciseName: e.target.value,
                      })}
                    />
                  ) : (
                    <p className="w-3/5 text-base">{exerciseDetail?.exerciseName}</p>
                  )
                }
              </div>
              <div className="flex w-full mb-2">
                <label className="w-2/5 font-bold text-base">Module</label>
                <div className="w-3/5">
                  <p className="w-3/5 text-base">{exerciseDetail?.exerciseModule?.moduleTitle}</p>
                </div>
              </div>
              <div className="flex w-full mb-2">
                <label className="w-2/5 font-bold text-base">Exercise Duration</label>
                {
                  isEditMode ? (
                    <input
                      className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                      value={editExerciseData.exerciseDuration}
                      onChange={(e) => setEditExerciseData({
                        ...editExerciseData,
                        exerciseDuration: e.target.value
                      })}
                    />
                  ) : (
                    <p className="w-3/5 text-base">{exerciseDetail?.exerciseDuration} minutes</p>
                  )
                }
              </div>
              <div className="flex w-full mb-2">
                <label className="w-2/5 font-bold text-base">Pass Score</label>
                {
                  isEditMode ? (
                    <input
                      placeholder='Enter exercise pass score'
                      className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                      value={editExerciseData.exercisePassScore}
                      onChange={(e) => setEditExerciseData({
                        ...editExerciseData,
                        exercisePassScore: e.target.value
                      })}
                    />
                  ) : (
                    <p className="w-3/5 text-base">{exerciseDetail?.exercisePassScore}%</p>
                  )
                }
              </div>
              <div className="w-full mb-5">
                <div className="text-base font-bold md:text-xl">Quizes</div>
                <div className="mt-2">
                  {
                    isEditMode ? (
                      editExerciseData?.exerciseQuizes &&
                      editExerciseData?.exerciseQuizes.map((quiz, index) => (
                        <ExerciseQuiz
                          key={quiz._id}
                          quiz={quiz}
                          index={index}
                        />
                      ))
                    ) : (
                      <>
                        {
                          exerciseDetail?.exerciseQuizes &&
                          exerciseDetail?.exerciseQuizes.map((quiz, index) => (
                            <ExerciseQuiz
                              key={quiz._id}
                              quiz={quiz}
                              index={index}
                            />
                          ))
                        }
                      </>
                    )
                  }
                  {
                    isEditMode && (
                      <button onClick={() => setShowAddNewQuiz(true)} className='border-black border-2 rounded-xl w-3/5'>
                        <AddCircleIcon />
                      </button>
                    )
                  }
                </div>
              </div>
              {
                isEditMode && (
                  <div className="flex justify-center">
                    <button onClick={() => handleCancelUpdateExercise()} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
                    <button onClick={() => handleUpdateExercise()} className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Save</button>
                  </div>
                )
              }
            </div>
          ) : <div>No exercise found!</div>
        }
      </div>
      {
        showAddNewQuiz && (
          <NewExerciseQuiz
            isOpen={showAddNewQuiz}
            setIsOpen={setShowAddNewQuiz}
            handleAdd={handleAddNewQuiz}
            handleCancel={handleCancelAddNewQuiz}
          />
        )
      }
    </div >
  )
}

export default ExerciseDetailModal