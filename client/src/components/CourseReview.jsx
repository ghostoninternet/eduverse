/* eslint-disable react/prop-types */
import { useState } from 'react'
import DeleteConfirmModal from './Modals/Confirmation/DeleteConfirmModal'

function CourseReview({
  courseReview,
  isEditMode,
  handleDeleteReview,
}) {
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectReview, setSelectReview] = useState(null)

  const handleConfirmDeleteReview = async () => {
    await handleDeleteReview(selectReview)
  }

  const handleCancelDeleteReview = () => {
    console.log("Cancel delete!")
    setIsOpenDelete(false)
  }

  return (
    <article className="my-2 p-3 text-base bg-slate-200 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"><img
            className="mr-2 w-6 h-6 rounded-full"
            src={courseReview.userInfo.avatarUrl}
            alt="Michael Gough" />{courseReview.userInfo.username}</p>
          <p className="text-sm">{(new Date(courseReview.createdAt)).toUTCString()}</p>
        </div>
        {
          isEditMode ? (
            <button onClick={() => {
              setSelectReview(courseReview._id)
              setIsOpenDelete(true)
            }} className='py-1 px-2 text-sm bg-red-500 text-white rounded-xl font-bold'>Delete</button>
          ) : (
            null
          )
        }
      </div>
      <p className="text-sm">
        {courseReview.reviewContent}
      </p>
      <div className='flex gap-1'>
        <p className='font-bold'>Rating: {courseReview.ratingStar}</p>
      </div>
      <DeleteConfirmModal 
        isOpen={isOpenDelete}
        confirmMessage={"Are you sure you want to delete this comment ?"}
        handleDelete={handleConfirmDeleteReview}
        handleCancel={handleCancelDeleteReview}
      />
    </article>
  )
}

export default CourseReview