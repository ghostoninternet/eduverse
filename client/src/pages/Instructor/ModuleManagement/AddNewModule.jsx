/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SelectDropdown from '../../../components/Input/SelectDropdown';
import ModuleVideo from '../../../components/Modals/Videos/ModuleVideo';
import NewVideoModal from '../../../components/Modals/Videos/NewVideoModal';
import { getAllCoursesTitle } from '../../../apis/course/instructorCourse';
import { toast } from 'react-toastify';

function AddNewModuleModal({
  showAddNewModule,
  setShowAddNewModule,
  handleCreate,
}) {
  const [courseOptions, setCourseOptions] = useState([])
  const [newModuleData, setNewModuleData] = useState({
    courseId: '',
    moduleTitle: '',
    moduleDescription: '',
    moduleVideoLessons: [],
  })
  const [showAddNewVideo, setShowAddNewVideo] = useState(false)

  const validateData = () => {
    if (newModuleData.courseId == '') {
      toast('You need to select at lease one course', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newModuleData.moduleTitle == '') {
      toast('Please provide module title', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newModuleData.moduleDescription == '') {
      toast('Please provide module description', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newModuleData.moduleVideoLessons.length == 0) {
      toast('Please provide at least one video in this module', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    return true
  }
  const resetData = () => {
    setNewModuleData({
      courseId: '',
      moduleTitle: '',
      moduleDescription: '',
      moduleVideoLessons: [],
    })
    setShowAddNewModule(false)
  }

  const handleAddNewVideo = (newVideo, resetData) => {
    setNewModuleData({
      ...newModuleData,
      moduleVideoLessons: [...newModuleData.moduleVideoLessons, newVideo],
    })
    resetData()
  }
  const handleChangeCourse = (newCourseId) => {
    console.log('🚀 ~ handleChangeCourse ~ newCourseId:', newCourseId)
    setNewModuleData({
      ...newModuleData,
      courseId: newCourseId
    })
  }

  const handleAddNewModule = () => {
    if (validateData()) {
      handleCreate(newModuleData, resetData)
    }
  }
  const handleCancelAddNewModule = () => {
    resetData()
  }

  const fetchCourseTitles = async () => {
    try {
      const response = await getAllCoursesTitle()
      if (response?.statusCode) {
        throw new Error(response.message)
      }
      const courses = response.map(data => {
        return {
          label: data.courseTitle,
          value: data.courseId,
        }
      })
      setCourseOptions(courses)
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }

  useEffect(() => {
    fetchCourseTitles()
  }, [])

  return (
    <>
      <div
        className={`${showAddNewModule ? '' : 'hidden'} absolute top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="w-4/5 mx-auto mt-10 p-3 border-2 bg-white rounded-2xl lg:w-3/5 max-h-[70dvh] overflow-auto">
          <div className="flex justify-between mb-4">
            <div className="font-bold text-2xl">New Module</div>
            <button onClick={() => { setShowAddNewModule(false) }} className="font-bold rounded-full bg-slate-200 py-1 px-2">
              X
            </button>
          </div>
          <div className="mb-4">
            <div className="flex w-full items-center mb-2">
              <label className="w-2/5 font-bold text-base md:text-xl">Module Title</label>
              <input
                placeholder='Enter module title'
                className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                value={newModuleData.moduleTitle}
                onChange={(e) => setNewModuleData({ ...newModuleData, moduleTitle: e.target.value })}
              />
            </div>
            <div className="flex w-full mb-2">
              <label className="w-2/5 font-bold text-base md:text-xl">Module Description</label>
              <textarea
                placeholder='Enter course description'
                className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
                value={newModuleData.moduleDescription}
                onChange={(e) => setNewModuleData({ ...newModuleData, moduleDescription: e.target.value })}
              />
            </div>
            <div className="flex w-full items-center mb-2">
              <label className="w-2/5 font-bold text-base md:text-xl">Course</label>
              <div className="relative w-3/5 border-2  border-black rounded-xl cursor-pointer">
                {
                  courseOptions.length !== 0
                    ? (
                      <SelectDropdown options={courseOptions} setSelectedOptions={handleChangeCourse} />
                    ) : (
                      <p>No course to display!</p>
                    )

                }
              </div>
            </div>
            <div className="lg:flex w-full mb-5">
              <div className="text-base lg:w-2/5 font-bold md:text-xl">Videos</div>
              <div className="mt-2 lg:w-3/5">
                {
                  newModuleData.moduleVideoLessons &&
                  newModuleData.moduleVideoLessons.map(video => (
                    <ModuleVideo
                      key={video._id}
                      video={video}
                      isEditMode={false}
                    />
                  ))
                }
                <button onClick={() => setShowAddNewVideo(true)} className='border-black border-2 rounded-xl w-3/5'>
                  <AddCircleIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={handleCancelAddNewModule} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
            <button onClick={handleAddNewModule} className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Add</button>
          </div>
        </div>
      </div>
      {
        showAddNewVideo && (
          <NewVideoModal
            isOpen={setShowAddNewVideo}
            setIsOpen={setShowAddNewVideo}
            handleCreate={handleAddNewVideo}
          />
        )
      }
    </>
  )
}

export default AddNewModuleModal