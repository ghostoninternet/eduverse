import React, { useState, useEffect } from "react";
import getExerciseDetail from "../../../apis/admin/getExerciseDetail";

function ModuleDetail({ isOpen, onClose, moduleDetail }) {
  const [exercisesDetail, setExercisesDetail] = useState([]);

  useEffect(() => {
    if (moduleDetail?.exercises?.length > 0) {
      async function fetchExercises() {
        try {
          const details = await Promise.all(
            moduleDetail.exercises.map(async (exerciseId) => {
              const exercise = await getExerciseDetail(exerciseId);
              console.log("Exercise detail fetched:", exercise); 
              return exercise.data; 
            })
          );
          setExercisesDetail(details);
          console.log("All Exercise details:", details); 
        } catch (error) {
          console.error("Error fetching exercise details:", error);
          setExercisesDetail([]);
        }
      }
      fetchExercises();
    } else {
      setExercisesDetail([]);
    }
  }, [moduleDetail]);
  

  if (!isOpen || !moduleDetail) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white rounded-lg p-6 w-full max-w-4xl relative max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Module Details</h2>

        <div className="mb-4">
          <h3 className="text-lg font-bold">Module Information</h3>
          <p>
            <strong>Title:</strong> {moduleDetail.title || "N/A"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {moduleDetail.description || "No description available"}
          </p>
          <p>
            <strong>Course:</strong> {moduleDetail.courseTitle || "Unknown"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(moduleDetail.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Video Lessons */}
        <div className="mb-4">
          <h3 className="text-lg font-bold">Video Lessons</h3>
          {Array.isArray(moduleDetail.videoLessons) &&
          moduleDetail.videoLessons.length > 0 ? (
            moduleDetail.videoLessons.map((video, index) => (
              <div key={index} className="bg-gray-100 p-2 my-2 rounded-lg">
                <p className="font-bold">{video.videoTitle}</p>
                <p>
                  <strong>Duration:</strong> {video.videoLength} minutes
                </p>

                {/* Video Player */}
                {video.videoUrl.includes("youtube.com") ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={video.videoUrl.replace("watch?v=", "embed/")}
                      title={video.videoTitle}
                      className="w-full h-60 rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <video
                    controls
                    className="w-full h-60 rounded-lg"
                    src={video.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))
          ) : (
            <p>No video lessons available.</p>
          )}
        </div>

        {/* Exercises */}
        <div className="mb-4">
          <h3 className="text-lg font-bold">Exercises</h3>
          {Array.isArray(exercisesDetail) && exercisesDetail.length > 0 ? (
            exercisesDetail.map((exercise, index) => (
              <div key={index} className="bg-gray-100 p-4 my-2 rounded-lg">
              <h4 className="font-bold">{exercise?.exerciseName || `Exercise ${index + 1}`}</h4>
              <p>
                <strong>Duration:</strong> {exercise?.exerciseDuration || "N/A"} minutes
              </p>
              <p>
                <strong>Pass Score:</strong> {exercise?.exercisePassScore || "N/A"}
              </p>
              {Array.isArray(exercise?.exerciseQuizes) && exercise.exerciseQuizes.length > 0 ? (
                <div>
                  <h5 className="font-bold mt-2">Quizzes:</h5>
                  {exercise.exerciseQuizes.map((quiz, quizIndex) => (
                    <div key={quizIndex} className="my-2">
                      <p><strong>Question {quizIndex + 1}:</strong> {quiz?.question || "N/A"}</p>
                      <ul className="list-disc ml-6">
                        {quiz?.choices?.map((choice, choiceIndex) => (
                          <li key={choiceIndex}>{choice || "N/A"}</li>
                        ))}
                      </ul>
                      <p><strong>Answer:</strong> {quiz?.answer || "N/A"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No quizzes available.</p>
              )}
            </div>

            ))
          ) : (
            <p>No exercises available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModuleDetail;
