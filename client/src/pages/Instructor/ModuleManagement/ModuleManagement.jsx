import { useEffect, useState } from "react"
import ManagementTable from "../../../components/Tables/Table"
import DeleteConfirmModal from "../../../components/Modals/Confirmation/DeleteConfirmModal"
import CourseDetailModal from "../../../components/Modals/Courses/CourseDetailModal"
import { MODULE_MANAGEMENT_TABLE_HEADER } from "../../../constants/module"
import AddNewModuleModal from "../../../components/Modals/Module/AddNewModule"
import ModuleDetailModal from "../../../components/Modals/Module/ModuleDetailModal"

function ModuleManagement() {
  const [modules, setModules] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const [searchModule, setSearchModule] = useState('')
  const [showAddNewModule, setShowAddNewModule] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const handleCancelCreateNewModule = () => {
    setShowAddNewModule(false)
  }
  
  const handleDeleteModule = () => {
    console.log("Deleted!")
    setIsOpenDelete(false)
  }

  const handleCancelDeleteModule = () => {
    console.log("Cancel delete!")
    setIsOpenDelete(false)
  }

  const list = []
  for (let i = 1; i <= 200; i++) {
    list.push(<tr key={i} className="bg-white border-b hover:bg-gray-50">
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
      <td className="px-6 py-4 flex gap-2">
        <button onClick={() => {
          setIsEditMode(true)
          setIsOpenDetail(true)
        }} className="py-1 px-2 bg-slate-300 rounded-xl font-bold">Edit</button>
        <button onClick={() => {
          setIsOpenDetail(true)
          setIsEditMode(false)
        }} className="py-1 px-2 bg-blue-500 text-white rounded-xl font-bold">View</button>
        <button onClick={() => setIsOpenDelete(true)} className="py-1 px-2 bg-red-500 text-white rounded-xl font-bold">Delete</button>
      </td>
    </tr>
    )
  }

  const getAllModules = async () => {
    // TODO: Implement function that fetch all modules belong to this instructor
  }

  const getModuleDetail = async (moduleId) => {
    // TODO: Implement function that fetch detail of a module
  }

  const updateModule = async () => {
    // TODO: Implement function that update a module
    // TODO: Get the updated module and replace the old one in "modules" array
  }

  useEffect(() => {
    // Call getAllModules
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
              <button disabled={searchModule == "" ? true : false} className={`bg-blue-700 text-white p-2 text-base rounded-3xl disabled:opacity-50`}>
                Search
              </button>
            </div>
          </div>
          <div>
            <button onClick={() => { setShowAddNewModule(true) }} className="bg-blue-700 text-white p-2 rounded-3xl text-base">
              Add new module
            </button>
          </div>
        </div>

        <ManagementTable tableHeaders={MODULE_MANAGEMENT_TABLE_HEADER} tableData={list} />
      </div>

      <AddNewModuleModal
        showAddNewModule={showAddNewModule}
        setShowAddNewModule={setShowAddNewModule}
        handleCancelCreateNewModule={handleCancelCreateNewModule}
      />

      <DeleteConfirmModal 
        isOpen={isOpenDelete}
        confirmMessage={"Are you sure you want to delete this module ?"}
        handleDelete={handleDeleteModule}
        handleCancel={handleCancelDeleteModule}
      />

      <ModuleDetailModal
        isOpen={isOpenDetail}
        setOpen={setIsOpenDetail}
        isEditMode={isEditMode}
        handleCancelCreateNewModule={handleCancelCreateNewModule}
      />
    </>
  )
}

export default ModuleManagement