import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import MyLearningTab from "../../components/Home/MyLearningTab";
import HomeTab from "../../components/Home/HomeTab";
import { Link, useNavigate } from "react-router-dom";
import getEnrolledCourseList from "../../apis/enrolled-course/getEnrolledCourseList";
const HomePage = () => {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState("home");
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const { authState } = useAuth();


  const handleCourseClick = (course) => {
    navigate(`/learn/${course._id}`);
  };
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
        const url = "http://localhost:8000/api/courses/popular";
        const response = await fetch(url);
        const json = await response.json();
        setPopularCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchPopularCourses();
  }, []);

  useEffect(() => {
    const fetchCompletedCourse = async () => {
      try {
        const json = await getEnrolledCourseList.getCompletedEnrolledCourses();
        setCompletedCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCompletedCourse();
  }, []);

  useEffect(() => {
    const fetchInProgressCourse = async () => {
      try {
        const json = await getEnrolledCourseList.getInProgressEnrolledCourses();
        setInProgressCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchInProgressCourse();
  }, []);

  const handleEnrolledCourseClick = (course) => {
    navigate(`/enrolledCourse/${course._id}`);
  };

  const handleTabClick = (tab) => {
    setActiveItem(tab);
  };
  return (
    <div>
      {authState && (
        <div>
          <ul className="flex gap-x-8 pl-20 border-b-2">
            <li
              onClick={() => handleTabClick("home")}
              className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                activeItem === "home"
                  ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                  : "text-slate-500 font-medium"
              } `}
            >
              Home
            </li>
            <li
              onClick={()=> handleTabClick("my-learning")}
              className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                activeItem === "my-learning"
                  ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                  : "text-slate-500 font-medium"
              } `}
            >
              My learning
            </li>
          </ul>
        </div>
      )}
      {authState && activeItem === "my-learning" ? (
        <MyLearningTab
          courseInProgress={inProgressCourses}
          courseInCompleted={completedCourses}
          handleEnrolledCourseClick={handleEnrolledCourseClick}
        />
      ) : (
        <HomeTab
          recommend={recommendedCourses}
          free={freeCourses}
          popular={popularCourses}
          handleCourseClick={handleCourseClick}
        />
      )}
    </div>
  );
};

export default HomePage;
