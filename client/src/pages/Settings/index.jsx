import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../contexts/authContext";
import getUser from "../../apis/getUser";
import updateUser from "../../apis/user/updateUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Settings = () => {
  const { authState, setAuthState } = useAuth();
  console.log(authState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setAuthState(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuthState(null);
        navigate("/"); // Redirect to home on error
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setAuthState, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await updateUser({
        updatedUser: authState.user,
        userId: authState.user._id,
      });
      console.log("User updated successfully:", updatedUser);

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
      }));
      toast.success("MY SUCCESS", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("Error", {
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 1500,
      });
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!authState) {
    navigate("/");
    return null;
  }

  return (
    <div className="bg-slate-200">
      <div key={authState.user._id} className="flex min-h-screen">
        <div className="w-1/3 flex flex-col items-center mt-20 gap-y-4">
          <img
            src={authState.user?.avatarUrl}
            width={300}
            height={300}
            className="shadow-lg"
          />
          <div className="flex items-center justify-center gap-x-2">
            <h2 className="text-2xl font-semibold">Edit your avatar</h2>
            <EditIcon />
          </div>
        </div>
        <div className="w-2/3 mt-20 ">
          <div className="flex flex-col gap-y-10 border-2 w-5/6 p-12 bg-white rounded-md shadow-lg">
            <h2 className="text-2xl font-semibold">Account</h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-y-8 gap-x-16"
            >
              <div className="flex flex-col gap-y-1">
                <label className="text-xl">Full Name</label>
                <input
                  value={authState.user.username}
                  onChange={(e) =>
                    setAuthState((prev) => ({
                      ...prev,
                      user: { ...prev.user, username: e.target.value },
                    }))
                  }
                  className="border-2 border-gray-500 p-2 text-xl"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-xl">Email</label>
                <input
                  value={authState.user.email}
                  disabled
                  className="border-2 border-gray-500 p-2 text-xl"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-xl">Gender</label>
                <select
                  className="border-2 border-gray-500 p-2 text-xl"
                  value={authState.user.gender}
                  onChange={(e) =>
                    setAuthState((prev) => ({
                      ...prev,
                      user: { ...prev.user, gender: e.target.value },
                    }))
                  }
                >
                  <option value="Male ">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-xl">Address</label>
                <input
                  value={authState.user.location}
                  onChange={(e) =>
                    setAuthState((prev) => ({
                      ...prev,
                      user: { ...prev.user, location: e.target.value },
                    }))
                  }
                  className="border-2 border-gray-500 p-2 text-xl"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-xl">Theme</label>
                <input
                  value={authState.user.preferences.theme}
                  onChange={(e) =>
                    setAuthState((prev) => ({
                      ...prev,
                      user: {
                        ...prev.user,
                        preferences: {
                          ...prev.user.preferences,
                          theme: e.target.value,
                        },
                      },
                    }))
                  }
                  className="border-2 border-gray-500 p-2 text-xl"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="text-xl">Language</label>
                <input
                  value={authState.user.preferences.language}
                  onChange={(e) =>
                    setAuthState((prev) => ({
                      ...prev,
                      user: {
                        ...prev.user,
                        preferences: {
                          ...prev.user.preferences,
                          language: e.target.value,
                        },
                      },
                    }))
                  }
                  className="border-2 border-gray-500 p-2 text-xl"
                />
              </div>

              <button
                type="submit"
                className="text-xl border-2 w-1/3 p-2 rounded-md text-blue-600 hover:text-white hover:bg-blue-500 border-blue-500 font-semibold"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
