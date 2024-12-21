import { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { INSTRUCTOR_ROUTES } from '../constants/routes.js'
import { INSTRUCTOR_NAVBAR } from '../constants/navbar.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import logout from '../apis/logout.js'
import { toast } from 'react-toastify'

function InstructorMainLayout() {
  const [currentTab, setCurrentTab] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { authState, setAuthState } = useAuth()
  const [openSidebar, setOpenSidebar] = useState(false)

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
    <div className='lg:flex'>
      <div className={`lg:hidden ${openSidebar ? 'w-60' : 'w-0'} h-dvh overflow-hidden fixed z-[1] top-0 left-0 bg-slate-100 rounded-br-3xl rounded-tr-3xl shadow-lg overflow-x-hidden pt-8 transition-all`}>
        <button onClick={() => setOpenSidebar(false)} className='absolute top-4 right-[20px] bg-slate-300 px-2 py-1 rounded-full'>X</button>
        <div className='flex flex-col justify-around'>
          <div className='flex flex-col items-center gap-2 h-[15dvh]'>
            <img
              className='w-[40%] h-96 rounded-[50%]'
              src={authState.avatarUrl}
            />
            <div className='text-xl font-bold mt-3'>
              {authState.username}
            </div>
          </div>

          <div className='py-10 flex flex-col gap-7 items-center h-[72dvh]'>
            {
              Object.keys(INSTRUCTOR_ROUTES).map((route) => {
                return (
                  <Link key={INSTRUCTOR_ROUTES[route]} to={INSTRUCTOR_ROUTES[route]} className={`block w-[90%] text-center font-bold text-lg py-1 px-2 rounded-2xl shadow-2xl ${location.pathname == INSTRUCTOR_ROUTES[route] ? 'bg-blue-400 text-white' : 'bg-slate-300'}`}>
                    {INSTRUCTOR_NAVBAR[route]}
                  </Link>
                )
              })
            }
            <button onClick={handleLogout} className={`block w-[90%] text-center font-bold text-lg py-1 px-2 rounded-2xl shadow-2xl bg-slate-300`}>
              Logout
            </button>
          </div>

          <div className="text-2xl font-bold text-blue-700 flex justify-center items-center py-3 px-4">
            <p>Hust Academy</p>
          </div>
        </div>
      </div>

      <div className='lg:hidden flex justify-between py-2 px-5 rounded-b-2xl shadow-lg'>
        <div className='text-xl font-bold'>
          {currentTab}
        </div>
        <div>
          <button onClick={() => setOpenSidebar(!openSidebar)}>
            <MenuIcon />
          </button>
        </div>
      </div>

      <div className='hidden lg:block h-dvh w-[15vw] pt-5 bg-slate-100 rounded-br-3xl rounded-tr-3xl shadow-lg overflow-hidden'>
        <div className='w-full flex flex-col justify-around'>
          <div className='flex flex-col items-center gap-2 h-[15dvh]'>
            <img
              className='w-[40%] h-96 rounded-[50%]'
              src={authState.avatarUrl}
            />
            <div className='text-xl text-center font-bold mt-3'>
              {authState.username}
            </div>
          </div>

          <div className='py-10 flex flex-col gap-7 items-center h-[72dvh]'>
            {
              Object.keys(INSTRUCTOR_ROUTES).map((route) => {
                return (
                  <Link key={INSTRUCTOR_ROUTES[route]} to={INSTRUCTOR_ROUTES[route]} className={`block w-[90%] text-center font-bold text-lg py-1 px-2 rounded-2xl shadow-2xl ${location.pathname == INSTRUCTOR_ROUTES[route] ? 'bg-blue-400 text-white' : 'bg-slate-300'}`}>
                    {INSTRUCTOR_NAVBAR[route]}
                  </Link>
                )
              })
            }
            <button onClick={handleLogout} className={`block w-[90%] text-center font-bold text-lg py-1 px-2 rounded-2xl shadow-2xl bg-slate-300`}>
              Logout
            </button>
          </div>

          <div className="text-2xl font-bold text-blue-700 flex justify-center items-center py-3 px-4">
            <p className='text-center'>Hust Academy</p>
          </div>
        </div>
      </div>

      <div className='lg:mt-10 lg:ml-10'>
        <div className='hidden lg:block lg:font-bold px-10 text-3xl'>
          {currentTab}
        </div>
        <div className='lg:w-[80vw]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default InstructorMainLayout