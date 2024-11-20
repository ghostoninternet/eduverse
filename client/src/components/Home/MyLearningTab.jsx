import React, { useState } from "react";
import Course from "../Course";
import PropTypes from "prop-types";
const MyLearningTab = ({myCourse}) => {
  const [isTab, setIsTab] = useState("In Progress");
  const handleInProgressClick = () => {
    setIsTab("In Progress");
  };
  const handleCompletedClick = () => {
    setIsTab("Completed");
  };
  return (
    <div>
      <div className="px-16">
        <h2 className="sm:text-3xl text-3xl font-semibold my-4">My Learning</h2>
        {isTab === "In Progress" ? (
          <div>
            <div className="flex gap-x-4 mb-8">
              <button
                onClick={handleInProgressClick}
                className="px-3 py-1 border bg-slate-500 rounded-full text-lg text-white font-semibold"
              >
                In Progress
              </button>
              <button
                onClick={handleCompletedClick}
                className="px-3 py-1 border rounded-full text-lg border-black font-semibold hover:text-blue-700 hover:bg-blue-200 hover:border-blue-600"
              >
                Completed
              </button>
            </div>

            <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4 mb-8">
              {myCourse.map((course) => (
                <Course
                  key={course.id}
                  title={course.courseTitle}
                  description={course.courseDescription}
                  imgUrl={course.courseImgUrl}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-x-4 mb-8">
              <button
                onClick={handleInProgressClick}
                className="px-3 py-1 border rounded-full text-lg border-black font-semibold hover:text-blue-700 hover:bg-blue-200 hover:border-blue-600"
              >
                In Progress
              </button>
              <button
                onClick={handleInProgressClick}
                className="px-3 py-1 border bg-slate-500 rounded-full text-lg text-white font-semibold"
              >
                Completed
              </button>
            </div>

            <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4 mb-8">
              {myCourse.map((course) => (
                <Course
                  key={course.id}
                  title={course.courseTitle}
                  description={course.courseDescription}
                  imgUrl={course.courseImgUrl}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearningTab;

MyLearningTab.propTypes = {
  myCourse: PropTypes.array,
};
