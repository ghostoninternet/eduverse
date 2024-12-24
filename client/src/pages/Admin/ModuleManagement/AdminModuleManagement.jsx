import React, { useEffect, useState } from "react";
import ManagementTable from "../../../components/Tables/Table";
import ModalDetail from "../../../components/Modals/DetailModal/ModalDetail";
import getModuleList from "../../../apis/admin/getModuleList";

function AdminModuleManagement() {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalModules, setTotalModules] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchModules(limitPerPage, currentPage);
  }, [limitPerPage, currentPage]);

  const fetchModules = async (limit, page) => {
    try {
      const response = await getModuleList(page, limit);
      console.log("Fetched modules:", response);
      const transformedModules = response.data.map((module) => ({
        id: module.id || module._id,
        "Module Title": module.moduleTitle,
        Course: module.courseTitle || "Unknown Course",
        Instructor: module.instructor?.name || "No Instructor",
        "Created At": new Date(module.createdAt).toLocaleDateString(),
        Description: module.moduleDescription || "No description available",
      }));
      setModules(transformedModules);
      setTotalModules(response.pagination?.totalModules || 0);
      setTotalPages(response.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  const handleViewModule = (module) => {
    setSelectedModule(module); 
    setIsOpenDetail(true); 
  };

  return (
    <div className="p-5">

      <ManagementTable
        tableHeaders={["Module Title", "Course", "Instructor", "Created At", "Actions"]}
        tableData={modules.map((module) => (
          <tr key={module.id} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">{module["Module Title"]}</td>
            <td className="px-6 py-4">{module.Course}</td>
            <td className="px-6 py-4">{module.Instructor}</td>
            <td className="px-6 py-4">{module["Created At"]}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleViewModule(module)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                View
              </button>
            </td>
          </tr>
        ))}
        currentPage={currentPage}
        limitPerPage={limitPerPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalCourses={totalModules}
      />

      {isOpenDetail && selectedModule && (
        <ModalDetail
          isOpen={isOpenDetail}
          onClose={() => setIsOpenDetail(false)}
          title="Module Details"
          details={selectedModule}
        />
      )}
    </div>
  );
}

export default AdminModuleManagement;
