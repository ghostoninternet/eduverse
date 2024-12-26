import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import MyLearningTab from "../../components/Home/MyLearningTab";
import HomeTab from "../../components/Home/HomeTab";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router'
import getEnrolledCourseList from "../../apis/enrolled-course/getEnrolledCourseList";
import { getFreeCourses, getPopularCourses, getRecommendedCourse } from "../../apis/getHomepageCourses";
import CourseCatalog from "../../components/Home/CourseCatalog";
import getAllCourses from "../../apis/course/getAllCourses"
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
        const response = await getRecommendedCourse();
        setRecommendedCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchRecommendedCourses();
  }, [location.search]);
  useEffect(() => {
    const fetchFreeCourses = async () => {
      try {
        const response = await getFreeCourses();
        setFreeCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchFreeCourses();
  }, [location.search]);
  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const response = await getPopularCourses();
        setPopularCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchPopularCourses();
  }, [location.search]);
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    const fetchedAllCourses = async () => {
      try {
        const response = await getAllCourses();
        setAllCourses(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchedAllCourses();
  }, [])
  const handleEnrolledCourseClick = (course) => {
    navigate(`/enrolledCourse/${course._id}`);
  };
  const [completedCourses, setCompletedCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const handleTabClick = (tab) => {
    navigate(`/#${tab}`);
    setActiveItem(tab);
    window.location.hash = tab;
    const fetchCompletedCourses = async () => {
          try {
            const data = await getEnrolledCourseList.getCompletedEnrolledCourses();
            setCompletedCourses(data);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setCompletedCourses(null);
          }
        };

        const fetchInProgressCourses = async () => {
              try {
                const data = await getEnrolledCourseList.getInProgressEnrolledCourses();
                setInProgressCourses(data);
              } catch (error) {
                console.error("Error fetching user data:", error);
                setInProgressCourses(null);
              }
            };
        
        fetchInProgressCourses();
        fetchCompletedCourses();
  };
  if(authState && activeItem === "home"){
    return (
      <div className="mt-5">
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
              onClick={()=> handleTabClick("browse-courses")}
              className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                activeItem === "browse-courses"
                  ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                  : "text-slate-500 font-medium"
              } `}
            >
              Browse courses
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
          <HomeTab
          recommend={recommendedCourses}
          free={freeCourses}
          popular={popularCourses}
          handleCourseClick={handleCourseClick}
        />
        </div>
    )
  }else if(authState && activeItem === "browse-courses"){
    return (
      <div className="mt-5">
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
              onClick={()=> handleTabClick("browse-courses")}
              className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                activeItem === "browse-courses"
                  ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                  : "text-slate-500 font-medium"
              } `}
            >
              Browse courses
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
          <CourseCatalog allCourses={allCourses}/>
        </div>
    )
  }else if(authState && activeItem === "my-learning"){
    return (
      <div className="mt-5">
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
              onClick={()=> handleTabClick("browse-courses")}
              className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                activeItem === "browse-courses"
                  ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                  : "text-slate-500 font-medium"
              } `}
            >
              Browse courses
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
          <MyLearningTab
          courseInProgress={inProgressCourses}
          courseInCompleted={completedCourses}
          handleEnrolledCourseClick={handleEnrolledCourseClick}
        />
        </div>
    )
  } else {
    if(activeItem === "home"){
      return (
        <div className="mt-5">
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
                onClick={()=> handleTabClick("browse-courses")}
                className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                  activeItem === "browse-courses"
                    ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                    : "text-slate-500 font-medium"
                } `}
              >
                Browse courses
              </li>
            </ul>
            <HomeTab
            recommend={recommendedCourses}
            free={freeCourses}
            popular={popularCourses}
            handleCourseClick={handleCourseClick}
          />
          </div>
      )
    }else{
      return (
        <div className="mt-5">
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
                onClick={()=> handleTabClick("browse-courses")}
                className={`pb-2 text-xl hover:text-blue-500 cursor-pointer ${
                  activeItem === "browse-courses"
                    ? "border-b-4 border-blue-700 text-blue-700 font-semibold scale-110"
                    : "text-slate-500 font-medium"
                } `}
              >
                Browse courses
              </li>
            </ul>
            <CourseCatalog allCourses={allCourses}/>
          </div>
      )
  }

};
}
export default HomePage;
