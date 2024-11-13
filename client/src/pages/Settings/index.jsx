import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const FieldName = ()  => {
    return (
        <div className="flex flex-col">
        <label className="text-xl">Full Name</label>
        <input
          value="PhucPham"
          className="w-5/6 border-2 border-gray-500 p-2 text-xl"
        />
      </div>
    );
  }


const index = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/3 flex flex-col items-center pt-20">
        <div className="bg-white mb-4">
          <AccountCircleIcon className="text-blue-500" sx={{ fontSize: 300 }} />
        </div>
        <div className="text-3xl">Change your avatar</div>
      </div>
      <div className="w-2/3 h-screen">
        <div className=" mt-20 mr-20 w-5/6">
          <div className="bg-white p-10 shadow-lg rounded-sm flex flex-col">
            <div className="text-3xl font-semibold mb-10">Account</div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-y-10">
                <FieldName />
                <FieldName />
                <FieldName />
                <button className=" border-2 w-1/4 border-blue-500 text-2xl p-2 rounded-md hover:bg-blue-500 hover:text-white">Save</button>
              </div>
              <div className="flex flex-col gap-y-10 ">
              <FieldName />
              <FieldName />
              <FieldName />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
