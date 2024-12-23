import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./App.jsx";
import Home from "./pages/Home/HomePage.jsx";
import "./index.css";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Learn from "./pages/Learn/Learning.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import CourseProvider from "./contexts/CourseContext.jsx";
import InstructorMainLayout from "./layouts/InstructorMainLayout.jsx";
import CourseManagement from "./pages/Instructor/CourseManagement/CourseManagement.jsx";
import CourseLearning from "./pages/Learn/CourseLearning.jsx";
import ModuleManagement from "./pages/Instructor/ModuleManagement/ModuleManagement.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { USER_ROLE } from './constants/user.js';
import InstructorProfile from "./pages/Instructor/Profile/InstructorProfile.jsx";
import Dashboard from "./pages/Instructor/Dashboard/Dashboard.jsx";
import Payment from "./pages/Payment/Payment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/learn/:courseSlug",
        element: <ProtectedRoute allowedRoles={[USER_ROLE.USER.value]} />,
        children: [
          {
            path: '',
            element: <Learn />
          }
        ]
      },
      {
        path: "/enrolledCourse/:courseId",
        element: <ProtectedRoute allowedRoles={[USER_ROLE.USER.value]} />,
        children: [
          {
            path: '',
            element: <CourseLearning />
          }
        ]
      },
      {
        path: "/settings",
        element: <ProtectedRoute allowedRoles={[USER_ROLE.USER.value]} />,
        children: [
          {
            path: '',
            element: <Settings />
          }
        ]
      },
      {
        path: "/profile",
        element: <ProtectedRoute allowedRoles={[USER_ROLE.USER.value]} />,
        children: [
          {
            path: '',
            element: <Profile />
          }
        ]
      },
      {
        path: "/payment",
        element: <ProtectedRoute allowedRoles={[USER_ROLE.USER.value]} />,
        children: [
          {
            path: '',
            element: <Payment />
          }
        ]
      }
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/instructor",
    element: <ProtectedRoute allowedRoles={[USER_ROLE.INSTRUCTOR.value]} />,
    children: [
      {
        path: '',
        element: <InstructorMainLayout />,
        children: [
          {
            path: "dashboard",
            element: <ProtectedRoute allowedRoles={[USER_ROLE.INSTRUCTOR.value]} />,
            children: [
              {
                path: '',
                element: <Dashboard />,
              }
            ]
          },
          {
            path: "course-management",
            element: <ProtectedRoute allowedRoles={[USER_ROLE.INSTRUCTOR.value]} />,
            children: [
              {
                path: '',
                element: <CourseManagement />,
              }
            ]
          },
          {
            path: "module-management",
            element: <ProtectedRoute allowedRoles={[USER_ROLE.INSTRUCTOR.value]} />,
            children: [
              {
                path: '',
                element: <ModuleManagement />,
              }
            ]
          },
          {
            path: "profile",
            element: <ProtectedRoute allowedRoles={[USER_ROLE.INSTRUCTOR.value]} />,
            children: [
              {
                path: '',
                element: <InstructorProfile />,
              }
            ]
          },
        ]

      },

    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CourseProvider>
        <RouterProvider router={router} />
      </CourseProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
