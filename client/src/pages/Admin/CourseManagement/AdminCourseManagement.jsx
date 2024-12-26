import React, { useEffect, useState } from "react";
import getCourseList from "../../../apis/admin/getCourseList";
import getCourseDetail from "../../../apis/admin/getCourseDetail";
import Table from "../../../components/Tables/Table";
import CourseDetailModal from "./CourseDetailModal";


function AdminCourseManagement() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalCourses, setTotalCourses] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
    try {
        const data = await getCourseList(currentPage, limitPerPage);
        setCourses(data.data || []);
        setTotalCourses(data.pagination?.totalCourses || 0);
    } catch (error) {
        console.error("Error fetching course list:", error);
      }
    }
    fetchCourses();
  }, [currentPage, limitPerPage]);

  const handleViewCourse = async (courseId) => {
    try {
      const courseDetail = await getCourseDetail(courseId);
      console.log("Course detail:", courseDetail);
      setSelectedCourse({
        ...courseDetail.data,
        reviews: courseDetail.data.reviews || [],
        modules: courseDetail.data.modules || [],
      });
      setModalOpen(true); 
    } catch (error) {
      console.error("Error fetching course detail:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const tableData = courses.map((course) => (
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
  ));

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* Bảng */}
      <div className="w-full max-w-7xl mx-auto">
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

      {/* Popup Modal */}
        <CourseDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        courseDetail={selectedCourse}
        />
    </div>
  );
}

export default AdminCourseManagement;
