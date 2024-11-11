import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './rootLayout.jsx'
import Home from './pages/Home'
import './index.css'
import SignIn from './pages/Auth/SignIn.jsx'
import SignUp from './pages/Auth/SignUpForm.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
