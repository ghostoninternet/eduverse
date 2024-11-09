import React, { useEffect, useState } from "react";
import Course from "../../components/Course.jsx";

const HomePage = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      try {
        const url = "http://localhost:8000/api/courses/recommended";
        const response = await fetch(url);
        const json = await response.json();
        setRecommendedCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchRecommendedCourses();
  }, []);

  useEffect(() => {
    const fetchFreeCourses = async () => {
      try {
        const url = "http://localhost:8000/api/courses/free";
        const response = await fetch(url);
        const json = await response.json();
        setFreeCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchFreeCourses();
  }, []);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const url = "http://localhost:8000/api//courses/popular";
        const response = await fetch(url);
        const json = await response.json();
        setPopularCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchPopularCourses();
  }, []);

  return (
    <div className="sm:flex sm:flex-col sm:gap-y-11 sm:px-6 sm:my-4 my-3 gap-y-5">
      <div>
        <h2 className="sm:text-2xl text-3xl font-semibold m-3">
          Recommended Course
        </h2>
        <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4">
          {recommendedCourses.map((course) => (
            <Course
              key={course._id} 
              title={course.courseTitle}
              description={course.courseDescription}
              imgUrl={course.courseImgUrl}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl sm:text-2xl font-semibold m-3">Free Course</h2>
        <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4">
          {freeCourses.map((course) => (
            <Course
              key={course._id}
              title={course.courseTitle}
              description={course.courseDescription}
              imgUrl={course.courseImgUrl}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="sm:text-2xl text-3xl font-semibold m-3">
          Most Popular Course
        </h2>
        <div className="sm:grid grid-cols-4 sm:gap-6 flex flex-col gap-y-4">
          {popularCourses.map((course) => (
            <Course
              key={course._id}
              title={course.courseTitle}
              description={course.courseDescription}
              imgUrl={course.courseImgUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
