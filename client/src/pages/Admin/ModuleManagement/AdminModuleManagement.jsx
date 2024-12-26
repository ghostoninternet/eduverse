import React, { useEffect, useState } from "react";
import ManagementTable from "../../../components/Tables/Table";
import ModuleDetail from "./ModuleDetail";
import getModuleList from "../../../apis/admin/getModuleList";
import getModuleDetail from "../../../apis/admin/getModuleDetail";

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
      setModules(response.data || []);
      setTotalModules(response.pagination?.totalModules || 0);
      setTotalPages(response.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  const handleViewModule = async (moduleId) => {
    try {
      const moduleDetail = await getModuleDetail(moduleId);
      console.log("Module detail:", moduleDetail);
      setSelectedModule(moduleDetail.data);
      setIsOpenDetail(true);
    } catch (error) {
      console.error("Failed to fetch module detail:", error);
    }
  };

  const closeDetailModal = () => {
    setSelectedModule(null);
    setIsOpenDetail(false);
  };

  return (
    <div className="p-5">
      <ManagementTable
        tableHeaders={["Module Title", "Course", "Instructor", "Created At", "Actions"]}
        tableData={modules.map((module) => (
          <tr key={module.id} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">{module.moduleTitle}</td>
            <td className="px-6 py-4">{module.courseTitle || "Unknown Course"}</td>
            <td className="px-6 py-4">{module.instructor?.name || "No Instructor"}</td>
            <td className="px-6 py-4">{new Date(module.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleViewModule(module.id)}
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
        <ModuleDetail
          isOpen={isOpenDetail}
          onClose={closeDetailModal}
          moduleDetail={selectedModule}
        />
      )}
    </div>
  );
}

export default AdminModuleManagement;
