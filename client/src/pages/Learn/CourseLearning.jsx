import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Module from "../../components/Module";
import getEnrolledCourseList from "../../apis/enrolled-course/getEnrolledCourseList";
import { useParams, useLocation } from "react-router";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router";
import updateEnrolledCourseVideoProgress from "../../apis/enrolled-course/updateEnrolledCourseVideoProgress";
import ExerciseDetail from "../../components/ExerciseDetail";
import getExerciseDetail from "../../apis/exercise/getExerciseDetail";
const CourseLearning = () => {
  let location = useLocation();
  let params = useParams();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const videoRef = useRef(null);
  const exerciseRef = useRef(null);
  const playedRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [newReview, setNewReview] = useState({
    content: "",
    rating: 0,
  });
  const [displayType, setDisplayType] = useState("video");
  const [enrolledCoursesDetail, setEnrolledCourseDetail] = useState({});
  const [quizes, setQuizes] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({
    videoId: null,
    moduleId: null,
    videoTitle: null,
    videoUrl: null,
    isPlaying: false,
  });
  const [currentExercise, setCurrentExercise] = useState({
    exerciseId: null,
    exerciseName: null,
    choices: [],
  });

  const [isTab, setIsTab] = useState("Overview");
  useEffect(() => {
    if (window.location.hash) {
      window.location.hash = "";
      setIsTab("Overview");
    }
  }, []);
  const handleRatingClick = () => {
    window.location.hash = "rating";
    setIsTab("Rating");
  };
  const handleOverviewClick = () => {
    window.location.hash = "overview";
    setIsTab("Overview");
  };
  const [update, setUpdate] = useState(true);
  const handleProgressVideo = async (progress) => {
    if (playedRef.current) {
      const duration = playedRef.current.getDuration();
      const playedSeconds = progress.playedSeconds;
      if (playedSeconds / duration > 0.99) {
        // Call the API to mark the video as completed
        setUpdate(!update);
        await updateEnrolledCourseVideoProgress(
          authState?.user._id.toString(),
          params.courseId,
          {
            moduleId: currentVideo?.moduleId,
            videoTitle: currentVideo?.videoTitle,
          }
        );
      }
    }
  };
  useEffect(() => {
    const fetchedEnrolledCourse = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const exerciseIdValue = queryParams.get("exercise");

        const response = await getEnrolledCourseList.getEnrolledCourseDetail(
          params.courseId
        );
        const fetchedExercise = await getExerciseDetail(exerciseIdValue);
        setQuizes(fetchedExercise);
        setCurrentExercise({ exerciseId: exerciseIdValue });
        setEnrolledCourseDetail(response);
        for (let i = 0; i < response?.courseModulesProgress.length; i++) {
          const unfinishedVideo = response?.courseModulesProgress[
            i
          ]?.moduleVideoProgress?.find((video) => !video.isFinish);
          if (unfinishedVideo) {
            setCurrentVideo({
              videoId: unfinishedVideo._id,
              moduleId: response?.courseModulesProgress?.[i].moduleId,
              videoTitle: unfinishedVideo.videoTitle,
              videoUrl: unfinishedVideo.videoUrl,
              isPlaying: true,
            });
            break;
          } else {
            continue;
          }
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchedEnrolledCourse();
  }, [params.courseId, update, location.search]);

  const handleVideoClick = (videoTitle, moduleId, videoUrl, videoId) => {
    navigate(location.pathname);
    setDisplayType("video");
    setCurrentVideo({
      videoTitle: videoTitle,
      moduleId: moduleId,
      videoUrl: videoUrl,
      videoId: videoId,
      isPlaying: true,
    });
    videoRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleStartClick = () => {
    setIsReady(!isReady);
  };
  const handleExerciseClick = (courseId, exerciseId) => {
    navigate(`/enrolledCourse/${courseId}?exercise=${exerciseId}`);
    setIsReady(false);
    setDisplayType("exercise");
    exerciseRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleCancelReview = () => {
    setNewReview({
      content: "",
      rating: 0,
    });
  };

  if (!authState) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="flex">
      {/*left */}
      <div className="w-2/3 border-r-2">
        {/* mui ten + ten khoa hoc */}
        <div className=" px-8 bg-black py-2 flex text-white items-center gap-x-2">
          <Link to={"/"}>
            <KeyboardBackspaceIcon
              fontSize="large"
              className="cursor-pointer"
            />
          </Link>

          <h1 className="font-semibold text-3xl">
            {enrolledCoursesDetail.courseTitle}
          </h1>
        </div>
        {/* video player */}
        {displayType === "video" ? (
          <div className="flex justify-center bg-gray-600" ref={videoRef}>
            <ReactPlayer
              ref={playedRef}
              url={currentVideo.videoUrl}
              width="100%"
              height={520}
              playing={false}
              controls
              onProgress={handleProgressVideo}
            />
          </div>
        ) : (
          <div ref={exerciseRef}>
            <ExerciseDetail
              quizes={quizes.exerciseQuizes}
              exerciseName={quizes.exerciseName}
              isReady={isReady}
              handleStartClick={handleStartClick}
            />
          </div>
        )}

        {/* Overview + rating bar*/}
        <div className="flex border-b-2">
          <h2
            onClick={handleOverviewClick}
            className={`w-1/2 text-center text-xl text-gray-400 py-2 cursor-pointer ${
              isTab == "Overview" &&
              "font-bold text-black bg-gray-100 border-b-gray-600 border-b-2"
            }`}
          >
            Overview
          </h2>
          <h2
            onClick={handleRatingClick}
            className={`w-1/2 text-center text-xl text-gray-400 py-2 cursor-pointer ${
              isTab == "Rating" &&
              "font-bold text-black bg-gray-100 border-b-gray-600 border-b-2"
            }`}
          >
            Rating
          </h2>
        </div>

        {/*overview tab*/}
        {isTab == "Overview" ? (
          <div className="mt-10 px-16">
            <h3 className="text-3xl font-semibold w-2/3">
              {enrolledCoursesDetail?.courseTitle}
            </h3>
            <div>
              <div className="flex gap-x-10 my-6">
                <div>
                  <div className="flex items-center">
                    <p className="font-semibold text-xl">4.7</p>
                    <StarIcon color="primary" fontSize="medium" />
                  </div>
                  <p>{enrolledCoursesDetail?.courseReviewCount} reviews</p>
                </div>
                <div className="">
                  <p className="font-semibold text-xl">
                    {enrolledCoursesDetail?.courseLearnerCount}
                  </p>
                  <p>members</p>
                </div>
              </div>
              <div className="text-2xl">
                {enrolledCoursesDetail?.courseDescription}
              </div>
              <div className="border-t-2 mt-6">
                <div className="flex text-2xl font-semibold my-6 items-center">
                  <img
                    src={enrolledCoursesDetail?.courseInstuctor?.avatarUrl}
                    width={50}
                    height={50}
                    className="rounded-full "
                  />
                  <p className="ml-6">
                    {enrolledCoursesDetail?.courseInstuctor?.username}
                  </p>
                </div>
                <div className="flex flex-col gap-y-3 mb-6">
                  <p className="text-xl">
                    <span className="font-semibold">Email: </span>
                    {enrolledCoursesDetail?.courseInstuctor?.email}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Location: </span>
                    {enrolledCoursesDetail?.courseInstuctor?.location}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Title: </span>
                    {enrolledCoursesDetail?.courseInstuctor?.jobTitle}
                  </p>
                  <p className="text-xl">
                    <span className="font-semibold">Organization: </span>
                    {enrolledCoursesDetail?.courseInstuctor?.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="bg-white p-8 rounded-md shadow-md ">
              <h2 className="text-4xl font-semibold mb-4">Leave a Review</h2>
              <textarea
                value={newReview.content}
                onChange={(e) =>
                  setNewReview({ ...newReview, content: e.target.value })
                }
                className="w-full border rounded-md p-3 mb-4 text-xl"
                rows="6"
                placeholder="Write your review..."
              ></textarea>
              <div className="flex items-center mb-4">
                <p className="mr-4 text-2xl">Rating:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    fontSize="large"
                    key={star}
                    className={`cursor-pointer ${
                      newReview.rating >= star
                        ? "text-blue-600"
                        : "text-gray-300"
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
              {newReview.content.length > 0 && newReview.rating > 0 ? (
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 text-xl py-2 bg-gray-300 text-gray-700 rounded-md"
                    onClick={handleCancelReview}
                  >
                    Cancel
                  </button>
                  <button
                    // onClick={handleSubmitReview}
                    className="px-4 text-xl py-2 bg-green-500 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-4">
                  <button
                    disabled
                    // onClick={handleSubmitReview}
                    className="px-4 text-xl py-2 bg-gray-500 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/*right */}
      <div className="w-1/3 overflow-auto">
        <h2 className="text-4xl px-3 py-2 border-t-2 font-semibold ">
          Course contents
        </h2>
        {/*module list */}
        <div className="">
          <div className="flex flex-col mb-6">
            {enrolledCoursesDetail.courseModulesProgress?.map(
              (module, index) => {
                let count = 0;
                module.moduleVideoProgress.map((video) => {
                  if (video.isFinish == true) {
                    count++;
                  }
                });
                return (
                  <Module
                    moduleId={module?.moduleId}
                    index={index + 1}
                    key={module?.moduleId}
                    title={module?.moduleTitle}
                    videos={module?.moduleVideoProgress}
                    totalVideos={module?.moduleVideoProgress?.length}
                    seenVideo={count}
                    currentVideoId={currentVideo?.videoId}
                    handleVideoClick={handleVideoClick}
                    handleExerciseClick={(exerciseId) =>
                      handleExerciseClick(params.courseId, exerciseId)
                    }
                    exercises={module?.moduleExerciseProgress}
                    exerciseId={currentExercise?.exerciseId}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;