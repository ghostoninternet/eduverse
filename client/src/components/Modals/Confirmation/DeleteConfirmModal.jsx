/* eslint-disable react/prop-types */
function DeleteConfirmModal({
  isOpen,
  confirmMessage,
  handleCancel,
  handleDelete,
}) {
  return (
    <div className={`${isOpen ? '' : 'hidden'} absolute top-0 right-0 left-0 bottom-0 bg-slate-950/50 w-full h-full flex justify-center items-center`}>
      <div onClick={(e) => { e.stopPropagation() }} className="w-4/5 p-3 border-2 bg-white rounded-2xl lg:w-1/5">
        <p className="text-xl text-center font-bold mb-5">
          { confirmMessage }
        </p>
        <div className="flex justify-center">
          <button onClick={handleCancel} className="mx-5 px-2 py-1 bg-gray-500 font-bold text-white rounded-lg">Cancel</button>
          <button onClick={handleDelete} className="mx-5 px-2 py-1 bg-red-500 font-bold text-white rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal