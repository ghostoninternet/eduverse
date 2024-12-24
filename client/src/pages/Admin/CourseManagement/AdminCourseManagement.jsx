import React, { useEffect, useState } from "react";
import Table from "../../../components/Tables/Table";
import ModalDetail from "../../../components/Modals/DetailModal/ModalDetail";
import getCourseList from "../../../apis/admin/getCourseList";
import getCourseDetail from "../../../apis/admin/getCourseDetail";

function CourseManagement() {
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
        console.log("Fetched Courses Data:", data);
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
      console.log("Course Detail:", courseDetail);
      setSelectedCourse({
        Title: courseDetail.data.title || "N/A",
        Description: courseDetail.data.description || "No description",
        Instructor: courseDetail.data.instructor?.name || "N/A",
        Rating: courseDetail.data.rating
          ? courseDetail.data.rating.toFixed(1)
          : "N/A",
        Price: courseDetail.data.price !== undefined && courseDetail.data.price !== null
          ? `$${courseDetail.data.price.toLocaleString()}`
          : "N/A",
        Modules: courseDetail.data.modules ? courseDetail.data.modules.length : 0,
        Learners: courseDetail.data.totalLearners || 0,
        CreatedAt: new Date(courseDetail.data.createdAt).toLocaleDateString(),
      });
      setModalOpen(true); 
    } catch (error) {
      console.error("Error fetching course detail:", error);
    }
  };

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

      {/* ModalDetail */}
      <ModalDetail
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Course Details"
        details={selectedCourse}
      />
    </div>
  );
}

export default CourseManagement;
