import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Module from "../../components/Module";
import getEnrolledCourseList from "../../apis/enrolled-course/getEnrolledCourseList";
import { useParams } from "react-router"
const CourseLearning = () => {
  let params = useParams()
  const [enrolledCoursesDetail, setEnrolledCourseDetail] = useState({})
  
  const modules = [
    {
      id: 1,
      title: "Part 1: hello",
      moduleVideo: [
        { id: 1, videoTitle: "Hello" },
        { id: 2, videoTitle: "WOrld" },
      ],
    },
    {
      id: 2,
      title: "Part 2: World",
      moduleVideo: [
        { id: 1, videoTitle: "Hello" },
        { id: 2, videoTitle: "Bida" },
        { id: 3, videoTitle: "Football" },
      ],
    },
  ];
  const [isTab, setIsTab] = useState("Contents");
  useEffect(() => {
    if (window.location.hash) {
      window.location.hash = ""; // Clear the hash on page load
      setIsTab("Contents"); // Set the default tab to 'home'
    }
  }, []);
  const handleContentsClick = () => {
    window.location.hash = "contents"
    setIsTab("Contents");
  };
  const handleOverviewClick = () => {
    window.location.hash = "overview"
    setIsTab("Overview");
  };

  useEffect(() => {
    const fetchedEnrolledCourse = async () => {
      try {
        const response = await getEnrolledCourseList.getEnrolledCourseDetail(params.courseId);
        setEnrolledCourseDetail(response);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    
    fetchedEnrolledCourse();
  }, [params.courseId])

  return (
    <div>
      <div className=" px-8 bg-black py-2 flex text-white items-center gap-x-2">
        <Link to={"/"}>
          <KeyboardBackspaceIcon fontSize="large" className="cursor-pointer" />
        </Link>

        <h1 className="font-semibold text-3xl">The Complete Web development</h1>
      </div>

      <div className="flex justify-center bg-gray-600">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          width="100%"
          height={520}
          playing={false}
          controls
        />
      </div>
      <div className="flex flex-col mt-10">
        <div className="flex border-b-2">
          <h2
            onClick={handleContentsClick}
            className={`w-1/2 text-center text-xl text-gray-400 py-2 cursor-pointer ${
              isTab == "Contents" &&
              "font-bold text-black bg-gray-100 border-b-gray-600 border-b-2"
            }`}
          >
            Contents
          </h2>
          <h2
            onClick={handleOverviewClick}
            className={`w-1/2 text-center text-xl text-gray-400 py-2 cursor-pointer ${
              isTab == "Overview" &&
              "font-bold text-black bg-gray-100 border-b-gray-600 border-b-2"
            }`}
          >
            Overview
          </h2>
        </div>
        {isTab == "Contents" ? (
          <div className="mt-16 px-16">
            <div className="flex flex-col items-center">
              {enrolledCoursesDetail.courseModulesProgress?.map((module, index) => {
                let count = 0;
                module.moduleVideoProgress.forEach((module) => {
                  if(module.isFinish == true){
                    count++;
                  }
                })
                return (
                  <Module
                    index={index + 1}
                    key={module._id}
                    title={module.moduleTitle}
                    videos={module.moduleVideoProgress}
                    totalVideos={module.moduleVideoProgress.length}
                    seenVideo={count}
                  />
                )
              })}
            </div>
          </div>
        ) : (
          <div className="mt-10 px-16">
            <h3 className="text-3xl font-semibold w-2/3">
              Become a Full-Stack Web Developer with just ONE course. HTML, CSS,
              Javascript, Node, React, PostgreSQL, Web3 and DApps
            </h3>
            <div>
              <div className="flex gap-x-10 my-6">
                <div>
                  <div className="flex items-center">
                    <p className="font-semibold text-xl">4.7</p>
                    <StarIcon color="primary" fontSize="medium" />
                  </div>
                  <p>293829 reviews</p>
                </div>
                <div className="">
                  <p className="font-semibold text-xl">2132</p>
                  <p>members</p>
                </div>
                <div>
                  <p className="font-semibold text-xl">2132</p>
                  <p>hours</p>
                </div>
              </div>
              <div className="">Description</div>
              <div>instructor</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseLearning;
