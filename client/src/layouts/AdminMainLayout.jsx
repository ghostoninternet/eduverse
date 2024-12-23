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
    Object.keys(ADMIN_ROUTES).forEach((route) => {
      if (ADMIN_ROUTES[route] === location.pathname) {
        setCurrentTab(ADMIN_NAVBAR[route])
      }
    })
  }, [location.pathname])

  return (
    <div className="min-h-screen">
      {/* Sidebar và Header tương tự */}
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

export default AdminMainLayout
