import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import MyLearningTab from "../../components/Home/MyLearningTab";
import HomeTab from "../../components/Home/HomeTab";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../../contexts/CourseContext";
import { useLocation } from 'react-router'
const HomePage = () => {
  const navigate = useNavigate()
  let location = useLocation()

  const [activeItem, setActiveItem] = useState("home");
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [freeCourses, setFreeCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const { authState } = useAuth();

  const handleCourseClick = (course) => {
    navigate(`/learn/${course.courseSlug}`,{
      state: { courseId: course._id }
    });
  };


  useEffect(() => {
    let hash = window.location.hash;
    if (hash){
      hash = window.location.hash.replace("#","")
      setActiveItem(hash)
    }
  },[])

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      try {
        const url = `http://localhost:8000/api/courses/recommended${location.search}`;
        const response = await fetch(url);
        const json = await response.json();
        setRecommendedCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchRecommendedCourses();
  }, [location.search]);
  useEffect(() => {
    const fetchFreeCourses = async () => {
      try {
        const url = `http://localhost:8000/api/courses/free${location.search}`;
        const response = await fetch(url);
        const json = await response.json();
        setFreeCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchFreeCourses();
  }, [location.search]);
  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const url = `http://localhost:8000/api/courses/popular${location.search}`;
        const response = await fetch(url);
        const json = await response.json();
        setPopularCourses(json);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchPopularCourses();
  }, [location.search]);


  const {completedCourses, inProgressCourses} = useCourse();

  const handleEnrolledCourseClick = (course) => {
    navigate(`/enrolledCourse/${course._id}`);
  };

  const handleTabClick = (tab) => {
    setActiveItem(tab);
    window.location.hash = tab; 
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
