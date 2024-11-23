import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./App.jsx";
import Home from "./pages/Home";
import "./index.css";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUpForm.jsx";
<<<<<<< HEAD
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AuthProvider from "./contexts/authContext";
import Learn from "./pages/Learn/index.jsx";
=======
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import AuthProvider from "./contexts/authContext.jsx";
import InstructorMainLayout from "./layouts/InstructorMainLayout.jsx";
import CourseManagement from "./pages/CourseManagement/CourseManagement.jsx";

>>>>>>> 6991ed7 (feature: Course Management UI)
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
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/learn/:courseId",
        element: <Learn />,
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
    ]
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
