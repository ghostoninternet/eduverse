// Home page
import React from "react";
import Course from "../../components/Course.jsx"

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-11 px-6 my-4">
      <div>
        <div>
          <h2 className="text-2xl font-semibold">Recommended Course</h2>
          <div className="grid grid-cols-4 gap-6">
            <Course/>
            <Course/>
            <Course/>
            <Course/>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Free Course</h2>
        <div className="grid grid-cols-4 gap-6">
            <Course/>
            <Course/>
            <Course/>
            <Course/>
          </div>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Most Popular Course</h2>
        <div className="grid grid-cols-4 gap-6">
            <Course/>
            <Course/>
            <Course/>
            <Course/>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
