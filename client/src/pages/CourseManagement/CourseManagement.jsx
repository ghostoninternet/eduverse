import { useState } from "react"
import ManagementTable from "../../components/Tables/ManagementTable"
import AddNewCourseModal from "../../components/Modals/Courses/AddNewCourseModal"
import { COURSE_MANAGEMENT_TABLE_HEADER } from "../../constants/course"
import DeleteConfirmModal from "../../components/Modals/Confirmation/DeleteConfirmModal"
import CourseDetailModal from "../../components/Modals/Courses/CourseDetailModal"

function CourseManagement() {
  const [searchCourse, setSearchCourse] = useState('')
  const [showAddNewCourse, setShowAddNewCourse] = useState(false)

  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleCancelCreateNewCourse = () => {
    setShowAddNewCourse(false)
  }

  const handleDeleteCourse = () => {
    console.log("Deleted!")
    setIsOpenDelete(false)
  }

  const handleCancelDeleteCourse = () => {
    console.log("Cancel delete!")
    setIsOpenDelete(false)
  }

  const list = []
  for (let i = 1; i <= 200; i++) {
    list.push(<tr className="bg-white border-b hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        Apple MacBook Pro 17"
      </th>
      <td className="px-6 py-4">
        Silver
      </td>
      <td className="px-6 py-4">
        Laptop
      </td>
      <td className="px-6 py-4">
        $2999
      </td>
      <td className="px-6 py-4">
        $2999
      </td>
      <td className="px-6 py-4">
        $2999
      </td>
      <td className="px-6 py-4">
        $2999
      </td>
      <td className="px-6 py-4 flex gap-2">
        <button onClick={() => {
          setIsEditMode(true)
          setIsOpenDetail(true)
        }} className="py-1 px-2 bg-slate-300 rounded-xl font-bold">Edit</button>
        <button onClick={() => setIsOpenDetail(true)} className="py-1 px-2 bg-blue-500 text-white rounded-xl font-bold">View</button>
        <button onClick={() => setIsOpenDelete(true)} className="py-1 px-2 bg-red-500 text-white rounded-xl font-bold">Delete</button>
      </td>
    </tr>
    )
  }

  return (
    <>
      <div className="overflow-hidden px-5 pt-5 sm:px-10">
        <div className="w-full flex flex-wrap justify-between mb-4">
          <div className="flex gap-4 mb-2">
            <div>
              <input
                className="border-2 px-2 border-black rounded-xl h-full"
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
              />
            </div>
            <div>
              <button disabled={searchCourse == "" ? true : false} className={`bg-blue-700 text-white p-2 text-base rounded-3xl disabled:opacity-50`}>
                Search
              </button>
            </div>
          </div>
          <div>
            <button onClick={() => { setShowAddNewCourse(true) }} className="bg-blue-700 text-white p-2 rounded-3xl text-base">
              Add new course
            </button>
          </div>
        </div>

        <ManagementTable tableHeaders={COURSE_MANAGEMENT_TABLE_HEADER} tableData={list} />
      </div>

      <AddNewCourseModal
        showAddNewCourse={showAddNewCourse}
        setShowAddNewCourse={setShowAddNewCourse}
        handleCancelCreateNewCourse={handleCancelCreateNewCourse}
      />

      <DeleteConfirmModal 
        isOpen={isOpenDelete}
        confirmMessage={"Are you sure you want to delete this course ?"}
        handleDelete={handleDeleteCourse}
        handleCancel={handleCancelDeleteCourse}
      />

      <CourseDetailModal
        isOpen={isOpenDetail}
        setOpen={setIsOpenDetail}
        isEditMode={isEditMode}
      />
    </>
  )
}

export default CourseManagement