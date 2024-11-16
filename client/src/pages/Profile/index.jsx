import React from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../contexts/authContext";
import PropTypes from "prop-types";
export const Infor = (props) => {
  return (
    <div className="flex flex-col gap-y-10 border-2 w-5/6 p-12 bg-white rounded-md">
      <h2 className="text-2xl font-semibold">{props.title}</h2>
      <div>dlkajflksad</div>
    </div>
  );
};

const Profile = () => {
  const users = [
    {
      id: 1,
      username: "jsmith89",
      email: "jsmith89@example.com",
      gender: "male",
      avatarUrl:
        "https://marketplace.canva.com/EAFltFTo1p0/1/0/1600w/canva-cute-anime-illustration-boy-avatar-d8N3f7Rn9aU.jpg",
      location: "new york, usa",
    },
  ];

  const { authState } = useAuth();
  const navigate = useNavigate();

  if (!authState) {
    navigate("/");
    return;
  }
  return (
    <div className="bg-slate-200">
      <div className="flex min-h-screen pb-16">
        <div className="w-1/3 flex flex-col items-center mt-20 gap-y-4">
          <img
            src={users[0].avatarUrl}
            width={300}
            height={300}
            className="shadow-lg"
          />
          <div className="flex items-center justify-center gap-x-2">
            <h2 className="text-2xl font-semibold">Edit your avatar</h2>
            <EditIcon />
          </div>
        </div>
        <div className="w-2/3 mt-20 flex flex-col gap-y-10">
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl font-semibold">Experience</h2>
            <Infor title="Projects" />
            <Infor title="Work history" />
          </div>
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl font-semibold">Education</h2>
            <Infor title="Certificates" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
