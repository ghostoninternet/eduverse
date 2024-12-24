import React, { useEffect, useState } from "react";
import getUserList from "../../../apis/admin/getUserList";
import getUserDetail from "../../../apis/admin/getUserDetail";
import Table from "../../../components/Tables/Table";

function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [limitPerPage, setLimitPerPage] = useState(10); 
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUserList(currentPage, limitPerPage);
        setUsers(data.users || []);
        setTotalUsers(data.pagination.totalUsers || 0);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    }
    fetchUsers();
  }, [currentPage, limitPerPage]);

  const handleViewUser = async (userId) => {
    try {
      const userDetail = await getUserDetail(userId);
      setSelectedUser(userDetail);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };

  const tableData = users.map((user) => (
    <tr key={user.id}>
      <td className="px-6 py-3">{user.id}</td>
      <td className="px-6 py-3">{user.name}</td>
      <td className="px-6 py-3">{user.email}</td>
      <td className="px-6 py-3">
        <button
          onClick={() => handleViewUser(user.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="flex flex-col md:flex-row">
      {/* Danh sách người dùng */}
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <Table
          tableHeaders={["ID", "Name", "Email", "Actions"]}
          tableData={tableData}
          totalCourses={totalUsers}
          totalPages={Math.ceil(totalUsers / limitPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />
      </div>

      {/* Chi tiết người dùng */}
      <div className="md:w-1/3 mt-6 md:mt-0 md:pl-4">
        {selectedUser ? (
          <div className="p-4 bg-gray-100 border rounded">
          <h2 className="text-xl font-bold">User Details</h2>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Gender:</strong> {selectedUser.gender || "Not specified"}</p>
          <p>
            <strong>Avatar:</strong><br />
            <img
              src={selectedUser.avatarUrl}
              alt={`${selectedUser.username}'s avatar`}
              className="w-16 h-16 rounded-full mt-2"
            />
          </p>
          <p><strong>Location:</strong> {selectedUser.location || "Not provided"}</p>
          <p><strong>Job Title:</strong> {selectedUser.jobTitle || "Not provided"}</p>
          <p><strong>Organization:</strong> {selectedUser.organization || "Not provided"}</p>
          <p><strong>Enrolled Courses:</strong> {selectedUser.enrolledCourses.length || 0}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
        </div>
        ) : (
          <p className="text-gray-500">Select a user to view details.</p>
        )}
      </div>
    </div>
  );
}

export default AdminUserManagement;
