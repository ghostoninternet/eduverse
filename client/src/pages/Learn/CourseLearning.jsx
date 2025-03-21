import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify"
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import StarIcon from "@mui/icons-material/Star";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Module from "../../components/Module";
import ExerciseDetail from "../../components/ExerciseDetail";
import getEnrolledCourseList from "../../apis/enrolled-course/getEnrolledCourseList";
import updateEnrolledCourseVideoProgress from "../../apis/enrolled-course/updateEnrolledCourseVideoProgress";
import createCourseReview from "../../apis/review/createCourseReview";
import updateExerciseProgress from "../../apis/exercise/updateExerciseProgress";
import getCourseReview from "../../apis/review/getCourseReview.js";

const CourseLearning = () => {
  const [isLoading, setIsLoading] = useState(true);
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
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    moduleId: null,
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
          authState?._id.toString(),
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
        const response = await getEnrolledCourseList.getEnrolledCourseDetail(
          params.courseId
        );
        let currentModule = response?.courseModulesProgress?.filter(
          (module) => module.moduleId == currentExercise.moduleId
        );
        let isExercise = currentModule[0]?.moduleExercises?.filter(
          (exercise) => exercise.exerciseName == currentExercise.exerciseName
        );
        setQuizes(isExercise?.[0]);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchedEnrolledCourse();
  }, [params.courseId, update, location.search, score, isSubmitted, isLoading, currentExercise.moduleId, currentExercise.exerciseName]);

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
    setCorrectCount(0);
    setIsSubmitted(false);
    setIsReady(!isReady);
  };
  const handleExerciseClick = (
    courseId,
    exerciseId,
    moduleId,
    exerciseName
  ) => {
    setScore(0);
    setIsLoading(true);
    setCurrentExercise({
      exerciseId: exerciseId,
      moduleId: moduleId,
      exerciseName: exerciseName,
    });
    navigate(`/enrolledCourse/${courseId}?exercise=${exerciseId}`);
    setIsReady(false);
    setDisplayType("exercise");
    exerciseRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitReview = async () => {
    if (!newReview.content || newReview.rating === 0) {
      toast("Please provide both content and a rating.", {
        type: 'error',
        autoClose: 2000,
      });
      return;
    }
    console.log("Sending courseId:", enrolledCoursesDetail._id);
    const reviewData = {
      courseId: enrolledCoursesDetail.courseId,
      reviewContent: newReview.content,
      ratingStar: newReview.rating,
    };

    try {
      const response = await createCourseReview(authState?._id, reviewData);
      console.log("Review created:", response);

      // Reset form sau khi gửi thành công
      setNewReview({ content: "", rating: 0 });

      const updatedReviews = await getCourseReview(enrolledCoursesDetail.courseId, 1);
      // setNewReview(updatedReviews);

      toast("Review submitted successfully!", {
        type: 'success',
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Review created:", error);
      alert("Review submitted successfully!");
    }
  };
  const handleCancelReview = () => {
    setNewReview({
      content: "",
      rating: 0,
    });
  };

  const handleSubmitAnswer = () => {
    setIsSubmitted(true);
  };

  const [correctCount, setCorrectCount] = useState(0);
  const handleCorrectAnswer = (isCorrect) => {
    // Increment count if correct
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const tempScore = (correctCount / quizes?.exerciseQuizes?.length) * 100;
    setScore(tempScore);
  }, [correctCount, quizes?.exerciseQuizes?.length]);

  useEffect(() => {
    console.log(score);
  }, [score]);

  useEffect(() => {
    const updateEx = async () => {
      try {
        await updateExerciseProgress(
          authState?._id.toString(),
          params.courseId,
          {
            moduleId: currentExercise.moduleId,
            exerciseId: currentExercise.exerciseId,
            userScore: score,
            hasPassed: score >= 50,
          }
        );
      } catch (error) {
        console.error("Error updating exercise progress:", error);
      }
    };

    if (isSubmitted) {
      updateEx(); // Call the function
    }
  }, [isSubmitted, score, authState?._id, currentExercise.exerciseId, currentExercise.moduleId, params.courseId]);

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
            {isLoading || !quizes ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <CircularProgress />
              </div>
            ) : (
              <ExerciseDetail
                quizes={quizes?.exerciseQuizes}
                exerciseName={quizes?.exerciseName}
                isReady={isReady}
                handleStartClick={handleStartClick}
                handleSubmitAnswer={handleSubmitAnswer}
                isSubmitted={isSubmitted}
                onCorrectAnswer={handleCorrectAnswer}
              />
            )}
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
                    onClick={handleSubmitReview}
                    className="px-4 text-xl py-2 bg-green-500 text-white rounded-md"
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-4">
                  <button
                    disabled
                    onClick={handleSubmitReview}
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
                    handleExerciseClick={(exerciseId, exerciseName) =>
                      handleExerciseClick(
                        params.courseId,
                        exerciseId,
                        module.moduleId,
                        exerciseName
                      )
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
