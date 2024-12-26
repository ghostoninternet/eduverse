/* eslint-disable react/prop-types */
import { useState } from 'react'
import MultiSelectDropdown from '../../../components/Input/MultiSelectDropdown ';
import { uploadImage } from '../../../apis/upload';
import { toast } from 'react-toastify';
import CancelConfirmModal from '../../../components/Modals/Confirmation/CancelConfirmModal';

function AddNewCourseModal({
  category,
  showAddNewCourse,
  setShowAddNewCourse,
  newCourseData,
  setNewCourseData,
  handleAddNewCourse,
}) {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false)
  const [selectedItems, setSelectedItems] = useState([]);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleItemClick = (item) => {
    const categoryId = category.filter(c => c.categoryName == item)[0]._id
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
      setNewCourseData({
        ...newCourseData,
        courseCategory: newCourseData.courseCategory.filter(cId => cId !== categoryId)
      })
    } else {
      setSelectedItems([...selectedItems, item]);
      setNewCourseData({
        ...newCourseData,
        courseCategory: [...newCourseData.courseCategory, categoryId]
      })
    }
  };
  const isSelected = (item) => selectedItems.includes(item);

  const validateData = () => {
    if (newCourseData.courseTitle == '') {
      toast('Please provide course title!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newCourseData.courseDescription == '') {
      toast('Please provide course description!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newCourseData.courseImgUrl == '') {
      toast('Please provide course image!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    if (newCourseData.courseCategory.length == 0) {
      toast('Please provide at least one course category!', {
        type: 'error',
        autoClose: 2000,
      })
      return false
    }
    return true
  }

  const handleCourseImgChange = async (e) => {
    if (e.target.files) {
      try {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const response = await uploadImage(formData);
        if (response?.statusCode) {
          throw new Error(response.message)
        }
        const courseImgUrl = response.data;
        setNewCourseData({ ...newCourseData, courseImgUrl: courseImgUrl });
        toast('Successfully uploaded a new image', {
          type: "success",
          autoClose: 1000,
        })
      } catch (error) {
        console.log(error);
        toast(error.message, {
          type: "error",
          autoClose: 2000,
        })
      }
    }
  };
  const handleAddCourse = () => {
    if (validateData()) {
      handleAddNewCourse()
    }
  }
  const handleCancelAndClose = () => {
    setSelectedItems([])
    setShowAddNewCourse(false)
    setNewCourseData({
      courseCategory: [],
      courseDescription: '',
      courseImgUrl: '',
      coursePrice: 0,
      courseTitle: ''
    })
  }

  return (
    <div className={`${showAddNewCourse ? '' : 'hidden'} absolute z-50 top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full`}>
      <div onClick={(e) => { e.stopPropagation() }} className="w-4/5 mx-auto mt-10 p-3 border-2 bg-white rounded-2xl lg:w-3/5">
        <div className="flex justify-between mb-4">
          <div className="font-bold text-2xl">New Course</div>
          <button
            onClick={() => setIsOpenCancel(true)}
            className="text-gray-500 hover:text-black"
          >
            ✖
          </button>
        </div>
        {
          newCourseData.courseImgUrl !== ''
            ? (
              <div className='my-5 lg:mb-10'>
                <img
                  className='w-[60%] h-[60%] mx-auto lg:w-[40%] lg:h-[40%]'
                  alt='Course Image'
                  src={newCourseData.courseImgUrl}
                />
              </div>
            ) : null
        }
        <div className="mb-4">
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Title</label>
            <input
              value={newCourseData.courseTitle}
              onChange={(e) => {
                setNewCourseData({ ...newCourseData, courseTitle: e.target.value })
              }}
              placeholder='Enter course title'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Description</label>
            <textarea
              value={newCourseData.courseDescription}
              onChange={(e) => {
                setNewCourseData({ ...newCourseData, courseDescription: e.target.value })
              }}
              placeholder='Enter course description'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Category</label>
            <div className="relative w-3/5 border-2 px-2 py-1 border-black rounded-xl cursor-pointer">
              <MultiSelectDropdown
                items={category.map(c => c.categoryName)}
                selectedItems={selectedItems}
                isSelected={isSelected}
                toggleDropdown={toggleDropdown}
                isOpen={isOpen}
                handleItemClick={handleItemClick}
              />
            </div>
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Price ($)</label>
            <input
              value={newCourseData.coursePrice}
              onChange={(e) => {
                setNewCourseData({ ...newCourseData, coursePrice: e.target.value })
              }}
              placeholder='Enter the price'
              className="w-3/5 border-2 px-2 py-1 border-black rounded-xl"
            />
          </div>
          <div className="flex w-full items-center mb-2">
            <label className="w-2/5 font-bold text-xl">Course Image</label>
            <input onChange={handleCourseImgChange} className="w-3/5 text-sm cursor-pointer bg-gray-50" type="file" />
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={() => setIsOpenCancel(true)} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
          <button onClick={() => {
            setSelectedItems([])
            handleAddCourse()
          }} className="mx-5 px-2 py-1 bg-blue-700 font-bold text-white rounded-lg">Add</button>
        </div>
      </div>

      {
        isOpenCancel && (
          <CancelConfirmModal
            isOpen={isOpenCancel}
            confirmMessage={"Are you sure you want to discard creating new course ?"}
            handelClose={() => setIsOpenCancel(false)}
            handleSave={() => {
              handleAddCourse()
              setIsOpenCancel(false)
            }}
            handleConfirmCancel={handleCancelAndClose}
          />
        )
      }
    </div>
  )
}

export default AddNewCourseModal