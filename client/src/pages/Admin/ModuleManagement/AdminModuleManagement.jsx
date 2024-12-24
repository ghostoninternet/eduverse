import React, { useEffect, useState } from "react";
import ManagementTable from "../../../components/Tables/Table";
import ModuleDetailModal from "./ModuleDetailModal";
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
        moduleTitle: module.moduleTitle,
        courseTitle: module.courseTitle || "Unknown Course",
        moduleDescription: module.description || "No description",
        instructor: module.instructor?.name || "No Instructor",
        createdAt: new Date(module.createdAt).toLocaleDateString(),
        id: module.id || module._id,
      }));
      setModules(transformedModules); // Cập nhật state modules
      setTotalModules(response.pagination?.totalModules || 0);
      setTotalPages(response.pagination?.totalPages || 0);
    } catch (error) {
      console.error("Failed to fetch modules:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6">Admin Module Management</h1>

      <ManagementTable
        tableHeaders={[
          "Module Title",
          "Course",
          "Instructor",
          "Created At",
          "Actions",
        ]}
        tableData={modules.map((module) => (
          <tr key={module.id} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">{module.moduleTitle}</td>
            <td className="px-6 py-4">{module.courseTitle}</td>
            <td className="px-6 py-4">{module.instructor}</td>
            <td className="px-6 py-4">{module.createdAt}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => {
                  setSelectedModule(module.id);
                  setIsOpenDetail(true);
                }}
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
        <ModuleDetailModal
          moduleId={selectedModule}
          isOpen={isOpenDetail}
          setOpen={setIsOpenDetail}
        />
      )}
    </div>
  );
}

export default AdminModuleManagement;
