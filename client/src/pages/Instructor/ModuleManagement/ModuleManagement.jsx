/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ManagementTable from "../../../components/Tables/Table"
import DeleteConfirmModal from "../../../components/Modals/Confirmation/DeleteConfirmModal"
import { MODULE_MANAGEMENT_TABLE_HEADER, MODULE_MANAGEMENT_TABLE_HEADER_MOBILE } from "../../../constants/module"
import AddNewModuleModal from "./AddNewModule"
import ModuleDetailModal from "./ModuleDetailModal"
import formatDate from "../../../helpers/formatDate"
import { createNewModule, deleteModule, editModule, getModules, searchModules } from "../../../apis/instructorModule"

function DataRow({
  module,
  setSelectModule,
  setIsEditMode,
  setIsOpenDetail,
  setIsOpenDelete
}) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {module.moduleTitle}
      </th>
      <td className="px-6 py-4">
        {module.courseId}
      </td>
      <td className="hidden lg:block px-6 py-4">
        {module.moduleDescription}
      </td>
      <td className="px-6 py-4">
        {
          module.isDeleted ? (
            <span className="uppercase bg-red-600 text-white font-bold px-2 py-1 rounded-lg text-xs">Deleted</span>
          ) : (
            <span className="uppercase bg-green-600 text-white font-bold px-2 py-1 rounded-lg text-xs">Active</span>
          )
        }
      </td>
      <td className="px-6 py-4">
        {formatDate(new Date(module.createdAt))}
      </td>
      <td className="px-6 py-4 flex gap-2 justify-center items-center">
        {
          !module.isDeleted && (
            <button onClick={() => {
              setSelectModule(module._id)
              setIsEditMode(true)
              setIsOpenDetail(true)
            }} className="py-1 px-2 bg-slate-300 rounded-xl font-bold">Edit</button>
          )
        }
        <button onClick={() => {
          setSelectModule(module._id)
          setIsOpenDetail(true)
        }} className="py-1 px-2 bg-blue-500 text-white rounded-xl font-bold">View</button>
        {
          !module.isDeleted && (
            <button onClick={() => {
              setSelectModule(module._id)
              setIsOpenDelete(true)
            }} className="py-1 px-2 bg-red-500 text-white rounded-xl font-bold">Delete</button>
          )
        }
      </td>
    </tr>
  )
}

function ModuleManagement() {
  const [modules, setModules] = useState([])
  const [selectModule, setSelectModule] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const [totalModules, setTotalModules] = useState(0)
  const [totalPages, setTotalPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)


  const [searchModule, setSearchModule] = useState('')
  const [showAddNewModule, setShowAddNewModule] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  // Handle create and cancel create new module
  const handleCreateNewModule = async (newModuleData, resetData) => {
    try {
      const response = await createNewModule(newModuleData)
      if (response?.statusCode) {
        throw new Error(response.message)
      }
      toast('Successfully created new module!', {
        type: 'success',
        autoClose: 2000,
      })
      resetData()
      fetchAllModules(10, 1)
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }

  // Handle edit and cancel edit module
  const handleEditModule = async (moduleId, editModuleData, resetData) => {
    try {
      const response = await editModule(moduleId, editModuleData)
      if (response?.statusCode) {
        throw new Error(response.message)
      }
      toast('Successfully updated module!', {
        type: 'success',
        autoClose: 1000,
      })
      fetchAllModules(10, 1)
      resetData()
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }

  // Handle delete and cancel delete module
  const handleDeleteModule = async () => {
    try {
      const response = await deleteModule(selectModule)
      if (response?.statusCode) {
        throw new Error(response.message)
      }
      toast('Successfully deleted a module', {
        type: 'success',
        autoClose: 800,
      })
      fetchAllModules(10, 1)
      setIsOpenDelete(false)
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }
  const handleCancelDeleteModule = () => {
    console.log("Cancel delete!")
    setIsOpenDelete(false)
  }

  const fetchAllModules = async (limit, page) => {
    try {
      const response = await getModules(limit, page)
      const foundModules = response.data.map(module => <DataRow
        module={module}
        key={module._id}
        setIsEditMode={setIsEditMode}
        setIsOpenDetail={setIsOpenDetail}
        setSelectModule={setSelectModule}
        setIsOpenDelete={setIsOpenDelete}
      />)
      setModules(foundModules)
      setTotalModules(response.data.length !== 0 ? Number.parseInt(response.pagination.totalModules) : 0)
      setTotalPages(response.data.length !== 0 ? Number.parseInt(response.pagination.totalPages) : 0)
      setCurrentPage(response.data.length !== 0 ? Number.parseInt(response.pagination.currentPage) : 0)
      setLimitPerPage(response.data.length !== 0 ? Number.parseInt(response.pagination.itemPerPage) : 0)
      toast("Successfully get modules", {
        type: 'success',
        autoClose: 500
      })
    } catch (error) {
      console.log(error)
      toast(error.message, { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSearchModules = async (query, limit, page) => {
    try {
      const response = await searchModules(query, limit, page)
      const foundModules = response.data.map(module => <DataRow
        module={module}
        key={module._id}
        setIsEditMode={setIsEditMode}
        setIsOpenDetail={setIsOpenDetail}
        setSelectModule={setSelectModule}
        setIsOpenDelete={setIsOpenDelete}
      />)
      setModules(foundModules)
      setTotalModules(response.data.length !== 0 ? Number.parseInt(response.pagination.totalModules) : 0)
      setTotalPages(response.data.length !== 0 ? Number.parseInt(response.pagination.totalPages) : 0)
      setCurrentPage(response.data.length !== 0 ? Number.parseInt(response.pagination.currentPage) : 0)
      setLimitPerPage(response.data.length !== 0 ? Number.parseInt(response.pagination.itemPerPage) : 0)
      toast("Successfully get searched modules", {
        type: 'success',
        autoClose: 500
      })
    } catch (error) {
      console.log(error)
      toast(error.message, { type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (searchModule !== "") {
      fetchSearchModules(searchModule, limitPerPage, currentPage)
    } else {
      fetchAllModules(limitPerPage, currentPage)
    }
  }, [limitPerPage, currentPage])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className="overflow-hidden px-5 pt-5 sm:px-10">
        <div className="w-full flex flex-wrap justify-between mb-4">
          <div className="flex gap-4 mb-2">
            <div>
              <input
                className="border-2 px-2 border-black rounded-xl h-full"
                value={searchModule}
                onChange={(e) => setSearchModule(e.target.value)}
              />
            </div>
            <div>
              <button
                disabled={searchModule == "" ? true : false}
                className={`bg-blue-700 text-white p-2 text-base rounded-3xl disabled:opacity-50`}
                onClick={() => {
                  setIsLoading(true)
                  fetchSearchModules(searchModule, 10, 1)
                }}
              >
                Search
              </button>
              <button
                onClick={() => {
                  setSearchModule('')
                  setIsLoading(true)
                  fetchAllModules(10, 1)
                }}
                className={`ml-2 bg-blue-700 text-white p-2 text-base rounded-3xl disabled:opacity-50`}
              >
                Reset
              </button>
            </div>
          </div>
          <div>
            <button onClick={() => { setShowAddNewModule(true) }} className="bg-blue-700 text-white p-2 rounded-3xl text-base">
              Add new module
            </button>
          </div>
        </div>

        <ManagementTable
          tableHeaders={windowWidth > 1024 ? MODULE_MANAGEMENT_TABLE_HEADER : MODULE_MANAGEMENT_TABLE_HEADER_MOBILE}
          tableData={modules}
          currentPage={currentPage}
          limitPerPage={limitPerPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalCourses={totalModules}
        />
      </div>

      {
        showAddNewModule && (
          <AddNewModuleModal
            showAddNewModule={showAddNewModule}
            setShowAddNewModule={setShowAddNewModule}
            handleCreate={handleCreateNewModule}
          />
        )
      }

      <DeleteConfirmModal
        isOpen={isOpenDelete}
        confirmMessage={"Are you sure you want to delete this module ?"}
        handleDelete={handleDeleteModule}
        handleCancel={handleCancelDeleteModule}
      />

      {
        isOpenDetail && selectModule && (
          <ModuleDetailModal
            moduleId={selectModule}
            isOpen={isOpenDetail}
            setOpen={setIsOpenDetail}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            handleEdit={handleEditModule}
          />
        )
      }

    </>
  )
}

export default ModuleManagement