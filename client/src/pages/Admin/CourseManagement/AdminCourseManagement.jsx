import React, { useEffect, useState } from "react";
import getCourseList from "../../../apis/admin/getCourseList";
import getCourseDetail from "../../../apis/admin/getCourseDetail";
import Table from "../../../components/Tables/Table";

function CourseManagement() {
  const [courses, setCourses] = useState([]); // Danh sách khóa học
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [limitPerPage, setLimitPerPage] = useState(10); // Số lượng bản ghi mỗi trang
  const [totalCourses, setTotalCourses] = useState(0); // Tổng số khóa học
  const [selectedCourse, setSelectedCourse] = useState(null); // Khóa học được chọn để hiển thị chi tiết

  // Lấy danh sách khóa học
  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourseList(currentPage, limitPerPage);
        console.log("Fetched Courses Data:", data);
        setCourses(data.data || []); // Đảm bảo `courses` là một mảng
        setTotalCourses(data.pagination?.totalCourses || 0);
      } catch (error) {
        console.error("Error fetching course list:", error);
      }
    }
    fetchCourses();
  }, [currentPage, limitPerPage]);

  // Lấy chi tiết khóa học
  const handleViewCourse = async (courseId) => {
    try {
      const courseDetail = await getCourseDetail(courseId);
      console.log("Course Detail:", courseDetail);
      setSelectedCourse(courseDetail.data); // Hiển thị thông tin khóa học được chọn
    } catch (error) {
      console.error("Error fetching course detail:", error);
    }
  };

  // Tạo cấu trúc dữ liệu cho bảng
  const tableData = Array.isArray(courses)
    ? courses.map((course) => (
        <tr key={course._id}>
          <td className="px-6 py-3">{course._id}</td>
          <td className="px-6 py-3">{course.courseTitle}</td>
          <td className="px-6 py-3">
            {Array.isArray(course.courseCategory)
              ? course.courseCategory.join(", ")
              : "No categories available"}
          </td>
          <td className="px-6 py-3">{course.courseLearnerCount || 0}</td>
          <td className="px-6 py-3">
            <button
              onClick={() => handleViewCourse(course._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              View
            </button>
          </td>
        </tr>
      ))
    : [];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Danh sách khóa học */}
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-6">Course Management</h1>
        <Table
          tableHeaders={["ID", "Title", "Categories", "Learners", "Actions"]}
          tableData={tableData}
          totalCourses={totalCourses}
          totalPages={Math.ceil(totalCourses / limitPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />
      </div>

      {/* Chi tiết khóa học */}
      <div className="md:w-1/3 mt-6 md:mt-0 md:pl-4">
        {selectedCourse ? (
          <div className="p-4 bg-gray-100 border rounded">
            <h2 className="text-xl font-bold">Course Details</h2>
            <p>
              <strong>Title:</strong> {selectedCourse.title || "N/A"}
            </p>
            <p>
              <strong>Instructor:</strong> {selectedCourse.instructor.name || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              {selectedCourse.rating ? selectedCourse.rating.toFixed(1) : "N/A"}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {selectedCourse.price !== undefined && selectedCourse.price !== null
                ? `$${selectedCourse.price.toLocaleString()}`
                : "N/A"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedCourse.description || "No description"}
            </p>
            <p>
              <strong>Categories:</strong>{" "}
              {Array.isArray(selectedCourse.category)
                ? selectedCourse.category.join(", ")
                : "No categories available"}
            </p>
            <p>
              <strong>Total Learners:</strong>{" "}
              {selectedCourse.totalLearners || 0}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedCourse.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Select a course to view details.</p>
        )}
      </div>
    </div>
  );
}

export default CourseManagement;
