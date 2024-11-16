import React from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../../contexts/authContext";

export const FieldName = (props) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-xl">{props.title}</label>
      <input
        value={props.value}
        className=" border-2 border-gray-500 p-2 text-xl"
      />
    </div>
  );
};

const Settings = () => {
  const users = [
    {
      id: 1,
      username: "jsmith89",
      email: "jsmith89@example.com",
      gender: "male",
      avatarUrl:
        "https://marketplace.canva.com/EAFltFTo1p0/1/0/1600w/canva-cute-anime-illustration-boy-avatar-d8N3f7Rn9aU.jpg",
      location: "new york, usa",
      preferences:{
        theme: "light",
        language: "English"
      }
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
      {users.map((user) => (
        <div key={user.id} className="flex min-h-screen">
          <div className="w-1/3 flex flex-col items-center mt-20 gap-y-4">
            <img src={user.avatarUrl} width={300} height={300} className="shadow-lg"/>
            <div className="flex items-center justify-center gap-x-2">
            <h2 className="text-2xl font-semibold">Edit your avatar</h2>
            <EditIcon/>
            </div>
            
          </div>
          <div className="w-2/3 mt-20 ">
            <div className="flex flex-col gap-y-10 border-2 w-5/6 p-12 bg-white rounded-md shadow-lg">
              <h2 className="text-2xl font-semibold">Account</h2>
              <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                <FieldName title="Fullname" value={user.username}/>
                <FieldName title="Email" value={user.email} />
                <FieldName title="Gender" value={user.gender} />
                <FieldName title="Address" value={user.location} />
                <FieldName title="Theme" value={user.preferences.theme} />
                <FieldName title="Language" value={user.preferences.language} />
                <button className="text-xl border-2 w-1/3 p-2 rounded-md text-blue-600 hover:text-white hover:bg-blue-500 border-blue-500 font-semibold">Save</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Settings;
