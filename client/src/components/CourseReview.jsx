import { useState } from 'react'
import DeleteConfirmModal from './Modals/Confirmation/DeleteConfirmModal'

function CourseReview({
  userName,
  userAvatar,
  reviewContent,
  reviewRating,
  reviewDate,
  isEditMode,
}) {
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const handleDeleteComment = () => {
    console.log("Deleted!")
    setIsOpenDelete(false)
  }

  const handleCancelDeleteComment= () => {
    console.log("Cancel delete!")
    setIsOpenDelete(false)
  }
  return (
    <article className="my-2 p-3 text-base bg-slate-200 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"><img
            className="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
            alt="Michael Gough" />Michael Gough</p>
          <p className="text-sm"><time pubdate datetime="2022-02-08"
            title="February 8th, 2022">Feb. 8, 2022</time></p>
        </div>
        {
          isEditMode ? (
            <button onClick={() => setIsOpenDelete(true)} className='py-1 px-2 text-sm bg-red-500 text-white rounded-xl font-bold'>Delete</button>
          ) : (
            null
          )
        }
      </div>
      <p className="text-sm">
        Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
        instruments for the UX designers. The knowledge of the design tools are as important as the
        creation of the design strategy.
      </p>
      <div className='flex gap-1'>
        <p className='font-bold'>Rating: 5</p>
      </div>
      <DeleteConfirmModal 
        isOpen={isOpenDelete}
        confirmMessage={"Are you sure you want to delete this comment ?"}
        handleDelete={handleDeleteComment}
        handleCancel={handleCancelDeleteComment}
      />
    </article>
  )
}

export default CourseReview