import React from 'react';
import Table from "../../../components/Tables/Table";
import getUser  from "../../../apis/getUser"

function AdminUserManagement() {
  const tableHeaders = ["ID", "Name", "Email"]; // Tiêu đề bảng
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <Table fetchData={getUser} tableHeaders={tableHeaders} />
    </div>
  );
}

export default AdminUserManagement;
