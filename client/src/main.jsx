import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./App.jsx";
import Home from "./pages/Home";
import "./index.css";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUpForm.jsx";
import Learn from "./pages/Learn/Learning.jsx";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AuthProvider from "./contexts/authContext.jsx";
import CourseProvider from "./contexts/CourseContext.jsx";
import InstructorMainLayout from "./layouts/InstructorMainLayout.jsx";
import CourseManagement from "./pages/CourseManagement/CourseManagement.jsx";
import CourseLearning from "./pages/Learn/CourseLearning.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/learn/:courseId",
        element: <Learn />,
      },
      {
        path: "/enrolledCourse/:courseId",
        element: <CourseLearning />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
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
    element: <InstructorMainLayout />,
    children: [
      {
        path: "course-management",
        element: <CourseManagement />,
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
  </StrictMode>
);
