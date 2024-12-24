import React, { useEffect, useState } from "react";
import getInstructorList from "../../../apis/admin/getInstructorList";
import getInstructorDetail from "../../../apis/admin/getInstructorDetail";
import Table from "../../../components/Tables/Table";

function InstructorManagement() {
  const [instructors, setInstructors] = useState([]); // Danh sách giảng viên
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [limitPerPage, setLimitPerPage] = useState(10); // Số lượng bản ghi mỗi trang
  const [totalInstructors, setTotalInstructors] = useState(0); // Tổng số giảng viên
  const [selectedInstructor, setSelectedInstructor] = useState(null); // Giảng viên được chọn để hiển thị chi tiết

  // Lấy danh sách giảng viên
  useEffect(() => {
    async function fetchInstructors() {
      try {
        console.log("Fetching instructors with params:", { currentPage, limitPerPage });
        const data = await getInstructorList(currentPage, limitPerPage);
        console.log("Fetched instructor list data:", data);
        setInstructors(data.data || []);
        setTotalInstructors(data.pagination.totalInstructors || 0);
      } catch (error) {
        console.error("Error fetching instructor list:", error);
      }
    }
    fetchInstructors();
  }, [currentPage, limitPerPage]);

  // Lấy chi tiết giảng viên
  const handleViewInstructor = async (instructorId) => {
    try {
      const instructorDetail = await getInstructorDetail(instructorId);
      setSelectedInstructor(instructorDetail); // Hiển thị thông tin giảng viên được chọn
    } catch (error) {
      console.error("Error fetching instructor detail:", error);
    }
  };

  // Tạo cấu trúc dữ liệu cho bảng
  const tableData = instructors.map((instructor) => (
    <tr key={instructor.id}>
      <td className="px-6 py-3">{instructor.id}</td>
      <td className="px-6 py-3">{instructor.name}</td>
      <td className="px-6 py-3">{instructor.email}</td>
      <td className="px-6 py-3">
        <button
          onClick={() => handleViewInstructor(instructor.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="flex flex-col md:flex-row">
      {/* Danh sách giảng viên */}
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-6">Instructor Management</h1>
        <Table
          tableHeaders={["ID", "Name", "Email", "Actions"]}
          tableData={tableData}
          totalCourses={totalInstructors}
          totalPages={Math.ceil(totalInstructors / limitPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />
      </div>

      {/* Chi tiết giảng viên */}
      <div className="md:w-1/3 mt-6 md:mt-0 md:pl-4">
        {selectedInstructor ? (
          <div className="p-4 bg-gray-100 border rounded">
            <h2 className="text-xl font-bold">Instructor Details</h2>
            <p><strong>Name:</strong> {selectedInstructor.username}</p>
            <p><strong>Email:</strong> {selectedInstructor.email}</p>
            <p><strong>Gender:</strong> {selectedInstructor.gender || "Not specified"}</p>
            <p>
              <strong>Avatar:</strong><br />
              <img
                src={selectedInstructor.avatarUrl}
                alt={`${selectedInstructor.username}'s avatar`}
                className="w-16 h-16 rounded-full mt-2"
              />
            </p>
            <p><strong>Location:</strong> {selectedInstructor.location || "Not provided"}</p>
            <p><strong>Job Title:</strong> {selectedInstructor.jobTitle || "Not provided"}</p>
            <p><strong>Organization:</strong> {selectedInstructor.organization || "Not provided"}</p>
            <p><strong>Total Courses:</strong> {selectedInstructor.totalCourses}</p>
            <p><strong>Total Learners:</strong> {selectedInstructor.totalLearners}</p>
          </div>
        ) : (
          <p className="text-gray-500">Select an instructor to view details.</p>
        )}
      </div>
    </div>
  );
}

export default InstructorManagement;
