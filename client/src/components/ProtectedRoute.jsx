/* eslint-disable react/prop-types */
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import LoadingScreen from "./LoadingScreen";
import { USER_ROLE } from "../constants/user";

const ProtectedRoute = ({ allowedRoles }) => {
  const { authState, isLoading } = useAuth();
  console.log('🚀 ~ ProtectedRoute ~ authState:', authState)

  // Nếu đang trong trạng thái tải dữ liệu xác thực
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Nếu người dùng chưa đăng nhập
  if (!authState) {
    return <Navigate to="/signin" replace />;
  }

  // Nếu người dùng không có quyền truy cập
  if (!allowedRoles.includes(authState.role)) {
    toast.error("You are not allowed to access this content!");
    if (authState.role === USER_ROLE.ADMIN.value) {
      return <Navigate to="/admin/admin-dashboard" replace />;
    }
    if (authState.role === USER_ROLE.INSTRUCTOR.value) {
      return <Navigate to="/instructor/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Nếu người dùng được phép truy cập
  return <Outlet />;
};

export default ProtectedRoute;