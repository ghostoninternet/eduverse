/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import AddNewCourseModal from "./AddNewCourseModal"
import Table from "../../../components/Tables/Table"
import DeleteConfirmModal from "../../../components/Modals/Confirmation/DeleteConfirmModal"
import CourseDetailModal from "./CourseDetailModal"
import Spinner from "../../../components/Spinner/Spinner"
import { COURSE_MANAGEMENT_TABLE_HEADER } from "../../../constants/course"
import { getCategory } from "../../../apis/category"
import { createNewCourse, deleteCourse, editCourse, getInstructorCourse, searchInstructorCourse } from "../../../apis/course/instructorCourse"

function DataRow({
  course,
  setSelectCourse,
  setIsEditMode,
  setIsOpenDetail,
  setIsOpenDelete
}) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {course.courseTitle}
      </th>

      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {
            course.courseCategory.map(category => (
              <span key={category} className="px-1 py-1 bg-slate-200 rounded-lg text-black font-bold">{category}</span>
            ))
          }
        </div>
      </td>
      <td className="px-6 py-4">
        {course.coursePrice}
      </td>
      <td className="px-6 py-4">
        {course.courseLearnerCount}
      </td>
      <td className="px-6 py-4">
        {course.courseRatingAvg.toFixed(1)}
      </td>
      <td className="px-6 py-4">
        {course.courseReviewCount}
      </td>
      <td className="px-6 py-4">
        {
          course.courseStatus == "draft" ? (
            <span className="uppercase bg-slate-300 font-bold px-2 py-1 rounded-lg text-xs">{course.courseStatus}</span>
          ) : (
            <span className="uppercase bg-green-600 text-white font-bold px-2 py-1 rounded-lg text-xs">{course.courseStatus}</span>
          )
        }
      </td>
      <td className="px-6 py-4">
        {
          course.isDeleted ? (
            <span className="uppercase bg-red-600 text-white font-bold px-2 py-1 rounded-lg text-xs">Deleted</span>
          ) : (
            <span className="uppercase bg-green-600 text-white font-bold px-2 py-1 rounded-lg text-xs">Active</span>
          )
        }
      </td>
      <td className="px-6 py-4 flex gap-2 justify-center items-center">
        <button onClick={() => {
          setSelectCourse(course._id)
          setIsEditMode(true)
          setIsOpenDetail(true)
        }} className="py-1 px-2 bg-slate-300 rounded-xl font-bold">Edit</button>
        <button onClick={() => {
          setSelectCourse(course._id)
          setIsOpenDetail(true)
        }} className="py-1 px-2 bg-blue-500 text-white rounded-xl font-bold">View</button>
        {
          !course.isDeleted && (
            <button onClick={() => {
              setSelectCourse(course._id)
              setIsOpenDelete(true)
            }} className="py-1 px-2 bg-red-500 text-white rounded-xl font-bold">Delete</button>
          )
        }
      </td>
    </tr>
  )
}

function CourseManagement() {
  const [courses, setCourses] = useState(null)
  const [totalCourses, setTotalCourses] = useState(null)
  const [selectCourse, setSelectCourse] = useState(null)
  const [category, setCategory] = useState(null)
  const [searchCourse, setSearchCourse] = useState('')
  const [showAddNewCourse, setShowAddNewCourse] = useState(false)

  const [totalPages, setTotalPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchError, setIsFetchError] = useState(false)

  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const [newCourseData, setNewCourseData] = useState({
    courseTitle: '',
    courseDescription: '',
    courseCategory: [],
    coursePrice: 0,
    courseImgUrl: '',
  })
  const [editCourseData, setEditCourseData] = useState({
    courseTitle: '',
    courseDescription: '',
    courseCategory: [],
    coursePrice: 0,
    courseImgUrl: '',
    courseStatus: '',
  })

  const handleAddNewCourse = async () => {
    try {
      const response = await createNewCourse(newCourseData)
      if (response?.statusCode) {
        throw new Error(response.message)
      }
      setShowAddNewCourse(false)
      setNewCourseData({
        courseCategory: [],
        courseDescription: '',
        courseImgUrl: '',
        coursePrice: 0,
        courseTitle: ''
      })
      fetchCourses(10, 1)
      toast('Successfully created new course', {
        type: 'success',
        autoClose: 1000,
      })
    } catch (error) {
      console.log(error)
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }
  const handleEditCourse = async () => {
    try {
      const editedCourse = await editCourse(selectCourse, editCourseData)
      toast('Successfully updated a course!', {
        type: 'success',
        autoClose: 1000,
      })
      setIsEditMode(false)
      fetchCourses(limitPerPage, currentPage)
    } catch (error) {
      console.log(error)
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }
  const handleDeleteCourse = async () => {
    try {
      const resposne = await deleteCourse(selectCourse)
      const deleteResult = resposne.data.isDeleted
      if (deleteResult) {
        await fetchCourses(limitPerPage, 1)
        setIsOpenDelete(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancelDeleteCourse = () => {
    console.log("Cancel delete!")
    setIsOpenDelete(false)
    setSelectCourse(null)
  }

  const fetchCategories = async () => {
    try {
      const categories = await getCategory()
      if (categories?.statusCode) {
        throw new Error(categories.message)
      }
      setCategory(categories)
    } catch (error) {
      console.error(error)
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }
  const fetchCourses = async (limit, page) => {
    setIsLoading(true)
    try {
      const responseData = await getInstructorCourse(limit, page)
      if (responseData?.statusCode) {
        throw new Error(responseData.message)
      }
      const courses = responseData.data
      const listCourses = []
      for (let i = 0; i < courses.length; i++) {
        listCourses.push(<DataRow
          course={courses[i]}
          setIsEditMode={setIsEditMode}
          setIsOpenDelete={setIsOpenDelete}
          setIsOpenDetail={setIsOpenDetail}
          setSelectCourse={setSelectCourse}
          key={courses[i]._id}
        />)
      }
      setCourses(listCourses)
      setTotalPages(Number.parseInt(responseData.pagination.totalPages))
      setCurrentPage(Number.parseInt(responseData.pagination.currentPage))
      setLimitPerPage(Number.parseInt(responseData.pagination.limitPerPage))
      setTotalCourses(Number.parseInt(responseData.pagination.totalCourses))
      setIsFetchError(false)
      toast('Successfully get courses', {
        type: 'success',
        autoClose: 1000,
      })
    } catch (error) {
      console.error(error)
      setIsFetchError(true)
      setCourses(null)
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    } finally {
      setIsLoading(false)
    }
  }
  const fetchSearchCourse = async (query, limit, page) => {
    setIsLoading(true)
    try {
      const responseData = await searchInstructorCourse(query, limit, page)
      if (responseData?.statusCode) {
        throw new Error(responseData.message)
      }
      const courses = responseData.data
      const listCourses = []
      for (let i = 0; i < courses.length; i++) {
        listCourses.push(<DataRow
          course={courses[i]}
          setIsEditMode={setIsEditMode}
          setIsOpenDelete={setIsOpenDelete}
          setIsOpenDetail={setIsOpenDetail}
          setSelectCourse={setSelectCourse}
          key={courses[i]._id}
        />)
      }
      setCourses(listCourses)
      setTotalPages(Number.parseInt(responseData.pagination.totalPages))
      setCurrentPage(Number.parseInt(responseData.pagination.currentPage))
      setLimitPerPage(Number.parseInt(responseData.pagination.limitPerPage))
      setTotalCourses(Number.parseInt(responseData.pagination.totalCourses))
      setIsFetchError(false)
      toast('Successfully get searched courses', {
        type: 'success',
        autoClose: 1000,
      })
    } catch (error) {
      console.error(error)
      setIsFetchError(true)
      setCourses(null)
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (searchCourse !== '') {
      fetchSearchCourse(searchCourse, limitPerPage, currentPage)
    } else {
      fetchCourses(limitPerPage, currentPage)
    }
  }, [limitPerPage, currentPage])

  useEffect(() => {
    fetchCategories()
  }, [])

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
              <button onClick={() => {
                if (searchCourse !== '') {
                  fetchSearchCourse(searchCourse, 10, 1)
                } else {
                  fetchCourses(10, 1)
                }
              }} className={`bg-blue-700 text-white p-2 text-base rounded-3xl disabled:opacity-50`}>
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
        {
          isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {
                isFetchError ? (
                  <p>Oops. Something went wrong</p>
                ) : (
                  <Table
                    tableHeaders={COURSE_MANAGEMENT_TABLE_HEADER}
                    tableData={courses}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    limitPerPage={limitPerPage}
                    totalCourses={totalCourses}
                  />
                )
              }
            </>
          )
        }
      </div>

      {
        showAddNewCourse && <AddNewCourseModal
          category={category}
          showAddNewCourse={showAddNewCourse}
          setShowAddNewCourse={setShowAddNewCourse}
          newCourseData={newCourseData}
          setNewCourseData={setNewCourseData}
          handleAddNewCourse={handleAddNewCourse}
        />
      }

      <DeleteConfirmModal
        isOpen={isOpenDelete}
        confirmMessage={"Are you sure you want to delete this course ?"}
        handleDelete={handleDeleteCourse}
        handleCancel={handleCancelDeleteCourse}
      />

      {
        isOpenDetail &&
        <CourseDetailModal
          courseId={selectCourse}
          category={category}
          isOpen={isOpenDetail}
          setOpen={setIsOpenDetail}
          isEditMode={isEditMode}
          editCourseData={editCourseData}
          setEditCourseData={setEditCourseData}
          setIsEditMode={setIsEditMode}
          handleEditCourse={handleEditCourse}
        />
      }
    </>
  )
}

export default CourseManagement