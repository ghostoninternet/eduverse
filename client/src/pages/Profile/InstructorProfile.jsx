import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import getUser from "../../apis/getUser";

export const Infor = (props) => {
  return (
    <div className="flex flex-col gap-y-4 w-5/6 border-2 p-6 bg-white rounded-md">
      <h2 className="text-xl font-semibold">{props.title}</h2>
      <p className="text-base">{props.description || "No details provided."}</p>
    </div>
  );
};

const Profile = () => {
  const { authState, setAuthState } = useAuth();
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
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setAuthState, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authState) {
    navigate("/");
    return null;
  }

  return (
    <div className="bg-slate-200">
      <div className="flex min-h-screen pb-16">
        <div className="w-1/3 flex flex-col items-center mt-20 gap-y-6">
          <img
            src={authState.user.avatarUrl || "https://via.placeholder.com/300"}
            alt="User Avatar"
            width={300}
            height={300}
            className="rounded-full shadow-lg"
          />
          <h2 className="text-2xl font-semibold">{authState.user.username}</h2>
          <p className="text-lg">{authState.user.email}</p>
        </div>
<<<<<<< HEAD
       
=======

>>>>>>> 50344c4d1b9232480b7c573152d6f5cd3fe8f8b7
        <div className="w-2/3 mt-20 flex flex-col gap-y-10">
          {/* Personal Information Section */}
          <div className="flex flex-col gap-y-6">
            <h2 className="text-3xl font-semibold">Personal Information</h2>
<<<<<<< HEAD
            <Infor title="Full Name" description={authState.user.fullName} />
=======
>>>>>>> 50344c4d1b9232480b7c573152d6f5cd3fe8f8b7
            <Infor title="Email" description={authState.user.email} />
            <Infor
              title="Location"
              description={authState.user.location || "Unknown"}
            />
<<<<<<< HEAD
            <Infor
              title="Bio"
              description={authState.user.bio || "No bio provided."}
            />
=======
>>>>>>> 50344c4d1b9232480b7c573152d6f5cd3fe8f8b7
          </div>

          {/* Professional Section */}
          <div className="flex flex-col gap-y-6">
            <h2 className="text-3xl font-semibold">Professional Details</h2>
            <Infor
              title="Job Title"
              description={authState.user.jobTitle || "No job title provided."}
            />
            <Infor
              title="Organization"
              description={
                authState.user.organization || "No organization specified."
              }
            />
          </div>

<<<<<<< HEAD
          {/* Social Media Section */}
=======
          {/* Social Media Section
>>>>>>> 50344c4d1b9232480b7c573152d6f5cd3fe8f8b7
          <div className="flex flex-col gap-y-6">
            <h2 className="text-3xl font-semibold">Social Media</h2>
            <Infor
              title="LinkedIn"
              description={
                authState.user.linkedin || "No LinkedIn profile linked."
              }
            />
            <Infor
              title="GitHub"
              description={authState.user.github || "No GitHub profile linked."}
            />
<<<<<<< HEAD
          </div>
=======
          </div> */}
>>>>>>> 50344c4d1b9232480b7c573152d6f5cd3fe8f8b7
        </div>
      </div>
    </div>
  );
};

export default Profile;
