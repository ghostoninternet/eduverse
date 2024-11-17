import React, { useEffect, useState } from "react";
import Course from "../../components/Course";
import { useAuth } from "../../contexts/authContext";
import MyLearningTab from "../../components/Home/MyLearningTab";
import HomeTab from "../../components/Home/HomeTab";
const HomePage = () => {
  const coursesInfo = [
    {
      id: 1,
      courseTitle: "Introduction to Web Development",
      courseDescription: "Learn the basics of HTML, CSS, and JavaScript.",
      courseImgUrl: "/course_img.png",
    },
    {
      id: 2,
      courseTitle: "Data Structures and Algorithms",
      courseDescription:
        "Understand key data structures and algorithms to improve coding efficiency.",
      courseImgUrl: "/course_img.png",
    },
    {
      id: 3,
      courseTitle: "Modern React Development",
      courseDescription:
        "Master React.js and build interactive UIs for web applications.",
      courseImgUrl: "/course_img.png",
    },
    {
      id: 4,
      courseTitle: "Full-Stack JavaScript",
      courseDescription:
        "Become proficient in both front-end and back-end JavaScript programming.",
      courseImgUrl: "/course_img.png",
    },
    // {
    //   id: 5,
    //   courseTitle: "Machine Learning Basics",
    //   courseDescription:
    //     "Get started with machine learning concepts and simple models.",
    //     courseImgUrl: "/course_img.png",
    // },
  ];
  const [activeItem, setActiveItem] = useState("Home");
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const { authState } = useAuth();
  
  const handleHomeClick = () => {
    setActiveItem("Home");
  };
  const handleMyLearningClick = () => {
    setActiveItem("My Learning");
  };
  // useEffect(() => {
  //   const fetchRecommendedCourses = async () => {
  //     try {
  //       const url = "http://localhost:8000/api/courses/recommended";
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       setRecommendedCourses(json);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };

  //   fetchRecommendedCourses();
  // }, []);

  // useEffect(() => {
  //   const fetchFreeCourses = async () => {
  //     try {
  //       const url = "http://localhost:8000/api/courses/free";
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       setFreeCourses(json);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };

  //   fetchFreeCourses();
  // }, []);

  // useEffect(() => {
  //   const fetchPopularCourses = async () => {
  //     try {
  //       const url = "http://localhost:8000/api/courses/popular";
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       setPopularCourses(json);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };

  //   fetchPopularCourses();
  // }, []);
  return (
    <div>
      {authState && (
        <div>
          <ul className="flex gap-x-8 pl-20 border-b-2">
            <li
              onClick={handleHomeClick}
              className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                activeItem === "Home"
                  ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                  : "text-slate-500 font-medium"
              } `}
            >
              Home
            </li>
            <li
              onClick={handleMyLearningClick}
              className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                activeItem === "My Learning"
                  ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                  : "text-slate-500 font-medium"
              } `}
            >
              My learning
            </li>
          </ul>
        </div>
      )}
      {activeItem === "My Learning" ? (
        <MyLearningTab courseInfo={coursesInfo} />
      ) : (
        <HomeTab courseInfo={coursesInfo} />
      )}
    </div>
  );
};

export default HomePage;
