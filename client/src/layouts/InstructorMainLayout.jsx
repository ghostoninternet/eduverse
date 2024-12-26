import { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { INSTRUCTOR_ROUTES } from '../constants/routes.js'
import { INSTRUCTOR_NAVBAR } from '../constants/navbar.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import logout from '../apis/logout.js'
import { pingServer } from '../apis/ping.js'

function InstructorMainLayout() {
  const [currentTab, setCurrentTab] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { authState, setAuthState } = useAuth()
  const [openSidebar, setOpenSidebar] = useState(false)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await pingServer()
        if (response?.statusCode) {
          throw new Error(response.message)
        }
        console.log(response)
      } catch (error) {
        console.log(error)
      }

      return () => clearInterval(interval)
    }, 30000)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await logout()
      toast(response.message, {
        type: 'success',
        autoClose: 2000,
      })
      setAuthState(null)
      navigate('/signin', { replace: true })
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000,
      })
    }
  }

  useEffect(() => {
    Object.keys(INSTRUCTOR_ROUTES).forEach((route) => {
      if (INSTRUCTOR_ROUTES[route] == location.pathname) {
        setCurrentTab(INSTRUCTOR_NAVBAR[route])
      }
    })
  }, [location.pathname])

  return (
    <div className="min-h-screen">
      <div className={`lg:hidden fixed top-0 left-0 h-screen bg-slate-100 shadow-lg z-50 transition-all duration-300 
        ${openSidebar ? 'w-60' : 'w-0'} rounded-br-3xl rounded-tr-3xl overflow-hidden`}>
        <button onClick={() => setOpenSidebar(false)} className="absolute top-4 right-4 bg-slate-300 px-2 py-1 rounded-full">
          X
        </button>
        <div className="h-full flex flex-col justify-between pt-8">
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={authState.avatarUrl}
              alt="Profile"
            />
            <div className="text-xl font-bold mt-3">
              {authState.username}
            </div>
          </div>

          <div className="flex-1 py-10 flex flex-col gap-4 items-center">
            {Object.keys(INSTRUCTOR_ROUTES).map((route) => (
              <Link
                key={INSTRUCTOR_ROUTES[route]}
                to={INSTRUCTOR_ROUTES[route]}
                className={`block w-[90%] text-center font-bold text-lg py-2 px-4 rounded-2xl shadow-lg 
                  ${location.pathname === INSTRUCTOR_ROUTES[route] ? 'bg-blue-700 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-black hover:bg-gray-400'}`}
              >
                {INSTRUCTOR_NAVBAR[route]}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-[90%] text-center text-white font-bold text-lg py-2 px-4 rounded-2xl shadow-lg bg-red-600"
            >
              Logout
            </button>
          </div>

          <div className="p-4 text-2xl font-bold text-blue-700 text-center">
            <p>Hust Academy</p>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white flex justify-between py-2 px-5 rounded-b-2xl shadow-lg z-40">
        <div className="text-xl font-bold">
          {currentTab}
        </div>
        <button onClick={() => setOpenSidebar(!openSidebar)}>
          <MenuIcon />
        </button>
      </div>

      <div className="hidden lg:block fixed top-0 left-0 h-screen w-60 bg-slate-100 shadow-lg z-40 rounded-br-3xl rounded-tr-3xl">
        <div className="h-full flex flex-col justify-between pt-5">
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={authState.avatarUrl}
              alt="Profile"
            />
            <div className="text-xl font-bold mt-3">
              {authState.username}
            </div>
          </div>

          <div className="flex-1 py-10 flex flex-col gap-4 items-center">
            {Object.keys(INSTRUCTOR_ROUTES).map((route) => (
              <Link
                key={INSTRUCTOR_ROUTES[route]}
                to={INSTRUCTOR_ROUTES[route]}
                className={`block w-[90%] text-center font-bold text-lg py-2 px-4 rounded-2xl shadow-lg 
                  ${location.pathname === INSTRUCTOR_ROUTES[route] ? 'bg-blue-700 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-black hover:bg-gray-400'}`}
              >
                {INSTRUCTOR_NAVBAR[route]}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-[90%] text-center text-white font-bold text-lg py-2 px-4 rounded-2xl shadow-lg bg-red-600"
            >
              Logout
            </button>
          </div>

          <div className="p-4 text-2xl font-bold text-blue-700 text-center">
            <p>Hust Academy</p>
          </div>
        </div>
      </div>

      <div className="lg:ml-60 min-h-screen overflow-y-auto">
        <div className="p-8 pt-16 lg:pt-8">
          <div className="hidden lg:block font-bold text-3xl mb-8">
            {currentTab}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default InstructorMainLayout