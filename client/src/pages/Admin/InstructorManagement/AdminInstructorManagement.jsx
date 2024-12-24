import React, { useEffect, useState } from "react";
import getInstructorList from "../../../apis/admin/getInstructorList";
import getInstructorDetail from "../../../apis/admin/getInstructorDetail";
import Table from "../../../components/Tables/Table";
import ModalDetail from "../../../components/Modals/DetailModal/ModalDetail";

function InstructorManagement() {
  const [instructors, setInstructors] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [limitPerPage, setLimitPerPage] = useState(10); 
  const [totalInstructors, setTotalInstructors] = useState(0); 
  const [selectedInstructor, setSelectedInstructor] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    async function fetchInstructors() {
      try {
        const data = await getInstructorList(currentPage, limitPerPage);
        setInstructors(data.data || []);
        setTotalInstructors(data.pagination.totalInstructors || 0);
      } catch (error) {
        console.error("Error fetching instructor list:", error);
      }
    }
    fetchInstructors();
  }, [currentPage, limitPerPage]);

  const handleViewInstructor = async (instructorId) => {
    try {
      const instructorDetail = await getInstructorDetail(instructorId);
      setSelectedInstructor(instructorDetail);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error fetching instructor detail:", error);
    }
  };

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
    <div className="w-full px-4">
      <Table
        tableHeaders={["ID", "Name", "Email", "Actions"]}
        tableData={tableData}
        totalCourses={totalInstructors}
        totalPages={Math.ceil(totalInstructors / limitPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limitPerPage={limitPerPage}
      />
      {/* Modal hiển thị chi tiết */}
      <ModalDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Instructor Details"
        details={{
          Name: selectedInstructor?.username,
          Email: selectedInstructor?.email,
          Gender: selectedInstructor?.gender || "Not specified",
          Avatar: (
            <img
              src={selectedInstructor?.avatarUrl}
              alt={`${selectedInstructor?.username}'s avatar`}
              className="w-16 h-16 rounded-full"
            />
          ),
          Location: selectedInstructor?.location || "Not provided",
          "Job Title": selectedInstructor?.jobTitle || "Not provided",
          Organization: selectedInstructor?.organization || "Not provided",
          "Total Courses": selectedInstructor?.totalCourses,
          "Total Learners": selectedInstructor?.totalLearners,
        }}
      />
    </div>
  );
}

export default InstructorManagement;
