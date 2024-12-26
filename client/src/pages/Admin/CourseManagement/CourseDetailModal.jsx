import React, { useState, useEffect } from "react";
import getCourseReview from "../../../apis/review/getCourseReview";

function CourseDetailModal({ isOpen, onClose, courseDetail }) {
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const getEmbedUrl = (videoUrl) => {
    const videoId = videoUrl.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useEffect(() => {
    if (!isOpen) {
      setReviewPage(1);
      setReviews([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && courseDetail) {
      async function fetchReviews() {
        try {
          setLoadingMore(true);
          const reviewData = await getCourseReview(courseDetail.id, reviewPage);
          setReviews((prevReviews) => [
            ...prevReviews,
            ...(reviewData?.data || []),
          ]);
          setTotalReviews(reviewData?.pagination?.totalReviews || 0);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
        } finally {
          setLoadingMore(false);
        }
      }
      fetchReviews();
    }
  }, [isOpen, courseDetail, reviewPage]);

  const hasMoreReviews = reviews.length < totalReviews;

  if (!isOpen || !courseDetail) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white rounded-lg p-6 w-full max-w-4xl relative max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">Course Details</h2>

        {/* Course Information */}
        <div className="mb-4">
          <h3 className="text-lg font-bold">Course Information</h3>
          {/* Course Image */}
          {courseDetail.courseImgUrl && (
          <div className="flex flex-col justify-center items-center mb-4">
            <img
              src={courseDetail.courseImgUrl}
              alt="Course Thumbnail"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
            {/* Title */}
            <p className="mt-2 text-xl font-bold">{courseDetail.title || "N/A"}</p>
          </div>
        )}
          <p><strong>Description:</strong> {courseDetail.description || "No description available"}</p>
          <p><strong>Instructor:</strong> {courseDetail.instructor?.name || "No Instructor"}</p>
          <p><strong>Rating:</strong> {courseDetail.rating?.toFixed(1) || "No ratings yet"}</p>
          <p><strong>Price:</strong> {courseDetail.price === 0 ? "Free" : `$${courseDetail.price}`}</p>
          <p><strong>Learners:</strong> {courseDetail.totalLearners || 0}</p>
          <p><strong>Created At:</strong> {new Date(courseDetail.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Course Modules */}
        <div className="mb-4">
          <h3 className="text-lg font-bold">Course Modules</h3>
          {Array.isArray(courseDetail.modules) && courseDetail.modules.length > 0 ? (
            courseDetail.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="my-4 bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold">{module.moduleTitle || `Module ${moduleIndex + 1}`}</h4>
                <p>{module.moduleDescription || "No description available."}</p>
                <div className="mt-2">
                  <p className="font-bold">Module contents:</p>
                  <div className="ml-4">
                    <p className="font-bold mb-2">Videos:</p>
                    {Array.isArray(module.moduleVideoLessons) && module.moduleVideoLessons.length > 0 ? (
                      module.moduleVideoLessons.map((video, videoIndex) => (
                        <div key={videoIndex} className="flex items-center space-x-2">
                          <span>🎥 {video.videoTitle || "Untitled"}</span>
                          <button
                            onClick={() => setCurrentVideoUrl(video.videoUrl)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Play
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>No videos available.</p>
                    )}

                    <p className="font-bold mt-4 mb-2">Exercises:</p>
                    {Array.isArray(module.moduleExercises) && module.moduleExercises.length > 0 ? (
                      module.moduleExercises.map((exercise, exerciseIndex) => (
                        <p key={exerciseIndex} className="flex items-center">
                          📝 {exercise.exerciseName || "Untitled"} • {exercise.exerciseDuration || 0} minutes
                        </p>
                      ))
                    ) : (
                      <p>No exercises available.</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No modules available.</p>
          )}
        </div>

        {/* Video Player */}
        {currentVideoUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Playing Video:</h3>
            <iframe
              className="w-full h-64 mt-2"
              src={getEmbedUrl(currentVideoUrl)}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Reviews */}
        <div className="mt-6">
          <h3 className="text-lg font-bold">User Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 my-2 rounded-lg flex items-start space-x-4"
              >
                {review.userId?.avatarUrl && (
                  <img
                    src={review.userId.avatarUrl}
                    alt={`${review.userId.username || "User"} Avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p>
                    <strong>User:</strong> {review.userId?.username || "Anonymous"}
                  </p>
                  <p>
                    <strong>Comment:</strong>{" "}
                    {review.reviewContent || "No comment provided"}
                  </p>
                  <p>
                    <strong>Rating:</strong> {review.ratingStar || "Not rated"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}

          {/* Load More Button */}
          {hasMoreReviews && (
            <button
              onClick={() => setReviewPage((prev) => prev + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More Reviews"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailModal;
