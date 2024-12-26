/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModuleVideo from '../../../components/Modals/Videos/ModuleVideo';
import ModuleExercise from '../../../components/Modals/Exercise/ModuleExercise';
import NewExerciseModal from '../../../components/Modals/Exercise/NewExerciseModal';
import { getModuleDetail } from '../../../apis/instructorModule';
import Spinner from '../../../components/Spinner/Spinner';
import { createNewExercise, deleteExercise } from '../../../apis/instructorExercise';
import NewVideoModal from '../../../components/Modals/Videos/NewVideoModal';
import CancelConfirmModal from '../../../components/Modals/Confirmation/CancelConfirmModal';

function ModuleDetailModal({
  moduleId,
  isOpen,
  setOpen,
  isEditMode,
  setIsEditMode,
  handleEdit,
}) {
  const [moduleDetail, setModuleDetail] = useState(null)
  const [editModuleData, setEditModuleData] = useState({
    courseId: "",
    moduleTitle: "",
    moduleDescription: "",
    moduleVideoLessons: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  const [isOpenCancel, setIsOpenCancel] = useState(false)

  const [showAddNewVideo, setShowAddNewVideo] = useState(false)
  const [showAddNewExercise, setShowAddNewExercise] = useState(false)
  const [newExercises, setNewExercises] = useState([])

  const validateData = () => {
    if (editModuleData.courseId == '') {
      toast('You need to select at lease one course', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (editModuleData.moduleTitle == '') {
      toast('Please provide module title', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (editModuleData.moduleDescription == '') {
      toast('Please provide module description', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (editModuleData.moduleVideoLessons.length == 0) {
      toast('Please provide at least one video in this module', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    return true
  }
  const resetData = () => {
    setOpen(false)
    setEditModuleData({
      courseId: "",
      moduleTitle: "",
      moduleDescription: "",
      moduleVideoLessons: [],
    })
    setShowAddNewVideo(false)
    setNewExercises(false)
    setNewExercises([])
    setIsOpenCancel(false)
    setIsEditMode(false)
  }

  const handleAddNewVideo = (newVideo, resetData) => {
    setEditModuleData({
      ...editModuleData,
      moduleVideoLessons: [...editModuleData.moduleVideoLessons, newVideo],
    })
    resetData()
  }
  const handleEditVideo = (oldVideoUrl, newVideo, resetData) => {
    setEditModuleData({
      ...editModuleData,
      moduleVideoLessons: editModuleData.moduleVideoLessons.map(video => {
        if (video.videoUrl === oldVideoUrl) {
          return newVideo
        }
        return video
      })
    })
    resetData()
  }
  const handleDeleteVideo = (videoUrl) => {
    const newModuleVideoLessons = editModuleData.moduleVideoLessons.filter(video => video.videoUrl !== videoUrl)
    setEditModuleData({
      ...editModuleData,
      moduleVideoLessons: newModuleVideoLessons
    })
  }

  const handleCreateNewExercise = async (data, resetData) => {
    try {
      const response = await createNewExercise(data)
      if (response?.statusCode) {
        throw new Error(response.message)
      }
      resetData()
      setNewExercises([...newExercises, response])
      setShowAddNewExercise(false)
      toast('Successfully added new exercise', {
        type: 'success',
        autoClose: 2000,
      })
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }
  const handleDeleteExercise = async (exerciseId, resetData) => {
    try {
      const response = await deleteExercise(exerciseId)
      if (response?.statusCode) {
        throw new Error(response.message)
      }
      resetData()
      fetchModuleDetail(moduleId)
      toast('Successfully deleted an exercise', {
        type: 'success',
        autoClose: 2000,
      })
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }
  const handleEditModule = () => {
    if (validateData()) {
      handleEdit(moduleId, editModuleData, resetData)
    }
  }
  const handleCancelEditModule = () => {
    resetData()
  }

  const fetchModuleDetail = async (moduleId) => {
    try {
      const response = await getModuleDetail(moduleId)
      setModuleDetail(response)
      setEditModuleData({
        courseId: response.courseId,
        moduleTitle: response.moduleTitle,
        moduleDescription: response.moduleDescription,
        moduleVideoLessons: response.moduleVideoLessons,
        moduleExercises: response.moduleExercises
      })
      toast("Successfully get module detail", {
        type: 'success',
        autoClose: 500,
      })
    } catch (error) {
      console.log(error)
      toast(error.message, { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchModuleDetail(moduleId)
  }, [moduleId])

  return (
    <>
      <div
        className={`${isOpen ? '' : 'hidden'} absolute z-[90] top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="w-4/5 mx-auto mt-10 p-3 border-2 bg-white rounded-2xl max-h-[90dvh] overflow-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                if (isEditMode) {
                  setIsOpenCancel(true)
                } else {
                  setOpen(false)
                }
              }}
              className="text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
          {
            isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : moduleDetail ? (
              <div className="mb-4">
                <div className="flex w-full mb-2">
                  <label className="text-base lg:w-2/5 font-bold md:text-xl">Module Title</label>
                  {
                    isEditMode ? (
                      <input
                        placeholder='Enter module title'
                        className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                        value={editModuleData.moduleTitle}
                        onChange={(e) => setEditModuleData({
                          ...editModuleData,
                          moduleTitle: e.target.value
                        })}
                      />
                    ) : (
                      <p className="w-3/5 text-base">{moduleDetail.moduleTitle}</p>
                    )
                  }
                </div>
                <div className="flex w-full mb-2">
                  <label className="text-base lg:w-2/5 font-bold md:text-xl">Module Description</label>
                  {
                    isEditMode ? (
                      <textarea
                        placeholder='Enter course description'
                        className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                        value={editModuleData.moduleDescription}
                        onChange={(e) => setEditModuleData({
                          ...editModuleData,
                          moduleDescription: e.target.value
                        })}
                      />
                    ) : (
                      <p className="w-3/5 text-base">{moduleDetail.moduleDescription}</p>
                    )
                  }
                </div>
                <div className="flex w-full mb-2">
                  <label className="text-base lg:w-2/5 font-bold md:text-xl">Course</label>
                  <div className="w-3/5">
                    <p className="w-3/5 text-base">{moduleDetail.courseTitle}</p>
                  </div>
                </div>
                <div className="lg:flex w-full mb-5">
                  <div className="text-base lg:w-2/5 font-bold md:text-xl">Videos</div>
                  <div className="mt-2 lg:w-3/5">
                    {
                      !isEditMode &&
                      moduleDetail.moduleVideoLessons &&
                      moduleDetail.moduleVideoLessons.map(video => (
                        <ModuleVideo
                          key={video._id}
                          video={video}
                        />
                      ))
                    }
                    {
                      isEditMode &&
                      editModuleData.moduleVideoLessons &&
                      editModuleData.moduleVideoLessons.map(video => (
                        <ModuleVideo
                          key={video._id}
                          video={video}
                          isEditMode={isEditMode}
                          handleDelete={handleDeleteVideo}
                          handleEdit={handleEditVideo}
                        />
                      ))
                    }
                    {
                      isEditMode && (
                        <button onClick={() => setShowAddNewVideo(true)} className='border-black border-2 rounded-xl w-3/5'>
                          <AddCircleIcon />
                        </button>
                      )
                    }
                  </div>
                </div>
                <div className="lg:flex w-full mb-5">
                  <div className="text-base lg:w-2/5 font-bold md:text-xl">Exercise</div>
                  <div className="mt-2 lg:w-3/5">
                    {
                      moduleDetail.moduleExercises &&
                      moduleDetail.moduleExercises.map(exercise => (
                        <ModuleExercise
                          key={exercise._id}
                          isEditMode={isEditMode}
                          exercise={exercise}
                          handleDelete={handleDeleteExercise}
                        />
                      ))
                    }
                    {
                      isEditMode && newExercises &&
                      newExercises.map(exercise => (
                        <ModuleExercise
                          key={exercise._id}
                          isEditMode={isEditMode}
                          exercise={exercise}
                          handleDelete={handleDeleteExercise}
                        />
                      ))
                    }
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
                      <button onClick={() => setIsOpenCancel(true)} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
                      <button onClick={handleEditModule} className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Save</button>
                    </div>
                  )
                }
              </div>
            ) : (
              <div>No module data found</div>
            )
          }
        </div>
      </div>

      {
        moduleDetail && (
          <NewExerciseModal
            moduleId={moduleDetail._id}
            module={moduleDetail.moduleTitle}
            isOpen={showAddNewExercise}
            setIsOpen={setShowAddNewExercise}
            handleCreate={handleCreateNewExercise}
          />
        )
      }
      {
        moduleDetail && (
          <NewVideoModal
            isOpen={showAddNewVideo}
            setIsOpen={setShowAddNewVideo}
            handleCreate={handleAddNewVideo}
          />
        )
      }
      {
        isEditMode && isOpenCancel && (
          <CancelConfirmModal
            isOpen={isOpenCancel}
            confirmMessage={"Are you sure you want to discard all changes ?"}
            handelClose={() => setIsOpenCancel(false)}
            handleSave={handleEditModule}
            handleConfirmCancel={handleCancelEditModule}
          />
        )
      }
    </>
  )
}

export default ModuleDetailModal