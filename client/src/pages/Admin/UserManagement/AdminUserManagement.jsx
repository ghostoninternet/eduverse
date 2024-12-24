import React, { useEffect, useState } from "react";
import ManagementTable from "../../../components/Tables/Table";
import ModalDetail from "../../../components/Modals/DetailModal/ModalDetail";
import getUserList from "../../../apis/admin/getUserList";
import getUserDetail from "../../../apis/admin/getUserDetail";

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers(limitPerPage, currentPage);
  }, [limitPerPage, currentPage]);

  const fetchUsers = async (limit, page) => {
    try {
      const response = await getUserList(page, limit);
      console.log("Fetched users:", response);
      setUsers(response.users || []);
      setTotalUsers(response.pagination?.totalUsers || 0);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleViewUser = async (userId) => {
    try {
      const userDetail = await getUserDetail(userId);
      setSelectedUser({
        Username: userDetail.username,
        Email: userDetail.email,
        Gender: userDetail.gender || "Not specified",
        Location: userDetail.location || "Not provided",
        "Job Title": userDetail.jobTitle || "Not provided",
        Organization: userDetail.organization || "Not provided",
        "Enrolled Courses": userDetail.enrolledCourses?.length || 0,
        "Created At": new Date(userDetail.createdAt).toLocaleDateString() || "N/A",
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };

  const tableData = users.map((user) => (
    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4">{user.id}</td>
      <td className="px-6 py-4">{user.name}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">
        <button
          onClick={() => handleViewUser(user.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          View
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="p-5">
      <ManagementTable
        tableHeaders={["ID", "Username", "Email", "Actions"]}
        tableData={tableData}
        currentPage={currentPage}
        limitPerPage={limitPerPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(totalUsers / limitPerPage)}
        totalCourses={totalUsers}
      />

      <ModalDetail
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Details"
        details={selectedUser}
      />
    </div>
  );
}

export default AdminUserManagement;
