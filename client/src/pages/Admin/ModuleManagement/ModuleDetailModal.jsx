import React, { useEffect, useState } from "react";
import getModuleDetail from "../../../apis/admin/getModuleDetail";  

function ModuleDetailModal({ moduleId, isOpen, setOpen }) {
  const [moduleDetail, setModuleDetail] = useState(null);

  useEffect(() => {
    if (moduleId) {
      fetchModuleDetail();
    }
  }, [moduleId]);

  const fetchModuleDetail = async () => {
    try {
      const response = await getModuleDetail(moduleId);
      console.log("Fetched module detail:", response);
      setModuleDetail(response.data);
    } catch (error) {
      console.error("Failed to fetch module detail:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4">
        <h2 className="text-2xl font-bold mb-4">Module Details</h2>
        {moduleDetail ? (
          <div>
            <p>
              <strong>In course:</strong> {moduleDetail.courseTitle}
            </p>
            <p>
              <strong>Description:</strong> {moduleDetail.description || "No description"}
            </p>
            <p>
              <strong>Course:</strong> {moduleDetail.courseTitle || "N/A"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(moduleDetail.createdAt).toLocaleDateString() || "N/A"}
            </p>
            <p>
              <strong>Video Lessons:</strong>{" "}
              {moduleDetail.videoLessons?.length || 0}
            </p>
            <p>
              <strong>Exercises:</strong>{" "}
              {moduleDetail.exercises?.length || 0}
            </p>
          </div>
        ) : (
          <p>Loading module details...</p>
        )}
        <button
          onClick={() => setOpen(false)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ModuleDetailModal;
