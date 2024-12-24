import { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { ADMIN_ROUTES } from '../constants/routes'
import { ADMIN_NAVBAR } from '../constants/navbar'
import { useAuth } from '../contexts/AuthContext'
import logout from '../apis/logout'
import { toast } from 'react-toastify'

function AdminMainLayout() {
  const [currentTab, setCurrentTab] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { authState, setAuthState } = useAuth()
  const [openSidebar, setOpenSidebar] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await logout()
      toast(response.message, { type: 'success', autoClose: 2000 })
      setAuthState(null)
      navigate('/signin', { replace: true })
    } catch (error) {
      console.error("Error during logout:", error);
      toast(error.message, { type: 'error', autoClose: 2000 })
    }
  }
  useEffect(() => {
    const activeRoute = Object.keys(ADMIN_ROUTES).find((key) =>
      location.pathname.startsWith(ADMIN_ROUTES[key])
    );
    if (activeRoute) {
      setCurrentTab(ADMIN_NAVBAR[activeRoute]);
    }
  }, [location.pathname]);
  

  return (
    <div className="min-h-screen flex">
      {/* Sidebar cho desktop */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen w-60 bg-slate-100 shadow-lg rounded-br-3xl rounded-tr-3xl">
        <div className="flex flex-col items-center py-5">
          <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
          <nav className="flex flex-col gap-4 w-full">
            {Object.keys(ADMIN_ROUTES).map((route) => (
              <Link
                key={ADMIN_ROUTES[route]}
                to={ADMIN_ROUTES[route]}
                className={`block w-[90%] mx-auto text-center font-bold text-lg py-2 px-4 rounded-2xl shadow-lg 
                  ${location.pathname.startsWith(ADMIN_ROUTES[route]) ? 'bg-blue-400 text-white' : 'bg-slate-300'}`}
              >
                {ADMIN_NAVBAR[route]}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-[90%] mx-auto text-center font-bold text-lg py-2 px-4 rounded-2xl shadow-lg bg-red-500 text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Sidebar cho mobile */}
      <div className={`lg:hidden fixed top-0 left-0 h-screen bg-slate-100 shadow-lg z-20 transition-all duration-300 
        ${openSidebar ? 'w-60' : 'w-0'} overflow-hidden`}>
        <button onClick={() => setOpenSidebar(false)} className="absolute top-4 right-4 bg-slate-300 px-2 py-1 rounded-full">
          X
        </button>
        <nav className="flex flex-col items-center py-10">
          {Object.keys(ADMIN_ROUTES).map((route) => (
            <Link
              key={ADMIN_ROUTES[route]}
              to={ADMIN_ROUTES[route]}
              className={`block w-[90%] text-center font-bold text-lg py-2 px-4 rounded-2xl shadow-lg 
                ${location.pathname.startsWith(ADMIN_ROUTES[route]) ? 'bg-blue-400 text-white' : 'bg-slate-300'}`}
              onClick={() => setOpenSidebar(false)}
            >
              {ADMIN_NAVBAR[route]}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="block w-[90%] text-center font-bold text-lg py-2 px-4 rounded-2xl shadow-lg bg-red-500 text-white"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Nút mở sidebar cho mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white flex justify-between py-2 px-5 shadow-lg">
        <div className="text-xl font-bold">{currentTab}</div>
        <button onClick={() => setOpenSidebar(!openSidebar)}>
          <MenuIcon />
        </button>
      </div>

      {/* Main Content */}
      <main className="lg:ml-60 flex-1 p-8">
        <h1 className="font-bold text-3xl mb-6">{currentTab}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminMainLayout
