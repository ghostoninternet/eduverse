/* eslint-disable react/prop-types */
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import LoadingScreen from "./LoadingScreen";
import { USER_ROLE } from "../constants/user";

const ProtectedRoute = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const { authState, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!authState) {
    navigate('/signin', { replace: true })
  }

  if (!allowedRoles || (allowedRoles && !allowedRoles.includes(authState.role))) {
    toast('You are not allowed to access this content!', {
      type: 'error'
    })
    if (authState.role === USER_ROLE.INSTRUCTOR) {
      navigate('/instructor/course-management', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;