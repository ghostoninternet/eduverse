import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ROUTES } from "../constants/routes";
import { ADMIN_NAVBAR } from "../constants/navbar";
import { useAuth } from "../contexts/AuthContext";
import logout from "../apis/logout";
import { toast } from "react-toastify";

function AdminMainLayout() {
  const [currentTab, setCurrentTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await logout();
      toast(response.message, { type: "success", autoClose: 2000 });
      setAuthState(null);
      navigate("/signin", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      toast(error.message, { type: "error", autoClose: 2000 });
    }
  };

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
          <div className="mb-4 flex flex-col items-center">
            <img
              src={authState?.avatarUrl || "/path/to/default-avatar.jpg"} 
              alt="Admin Avatar"
              className="w-20 h-20 rounded-full mb-2 object-cover shadow-md"
            />
            <h3 className="text-lg font-bold">{authState?.username || "Admin Name"}</h3>
          </div>

          <nav className="flex flex-col gap-4 w-full">
            {Object.keys(ADMIN_ROUTES).map((route) => (
              <Link
                key={ADMIN_ROUTES[route]}
                to={ADMIN_ROUTES[route]}
                className={`block w-[90%] mx-auto text-center font-bold text-lg h-12 py-2 rounded-xl shadow-lg transition-colors duration-200 
                  ${
                    location.pathname.startsWith(ADMIN_ROUTES[route])
                      ? 'bg-blue-700 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-black hover:bg-gray-400'
                  }`}
              >
                {ADMIN_NAVBAR[route]}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="block w-[90%] mx-auto text-center font-bold text-lg h-12 py-2 rounded-xl shadow-lg bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Sidebar cho mobile */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-screen bg-slate-100 shadow-lg z-20 transition-all duration-300 
        ${openSidebar ? "w-60" : "w-0"} overflow-hidden`}
      >
        <button
          onClick={() => setOpenSidebar(false)}
          className="absolute top-4 right-4 bg-slate-300 px-2 py-1 rounded-full"
        >
          X
        </button>
        <nav className="flex flex-col items-center py-10">
          {Object.keys(ADMIN_ROUTES).map((route) => (
            <Link
              key={ADMIN_ROUTES[route]}
              to={ADMIN_ROUTES[route]}
              className={`block w-[90%] text-center font-bold text-lg py-2 px-4 rounded-2xl shadow-lg 
                ${
                  location.pathname.startsWith(ADMIN_ROUTES[route])
                    ? "bg-blue-700 text-white"
                    : "bg-slate-300"
                }`}
              onClick={() => setOpenSidebar(false)}
            >
              {ADMIN_NAVBAR[route]}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="block w-[90%] text-center font-bold text-lg py-2 px-4 rounded-2xl shadow-lg bg-red-600 text-white"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Nút mở sidebar cho mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white flex justify-between items-center py-3 px-5 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src={authState?.avatar || "/default-avatar.png"}
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg font-semibold">{authState?.username || "Admin"}</span>
        </div>
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

export default AdminMainLayout;
