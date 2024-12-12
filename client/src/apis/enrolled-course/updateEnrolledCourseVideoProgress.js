import customFetch from "../../helpers/customFetch";

const updateEnrolledCourseVideoProgress = async (
  userId,
  courseId,
  updatedData
) => {
  const url = `http://localhost:8000/api/enrolled-courses/video-progress/${courseId}`;
  try {
    const response = await customFetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({moduleId: updatedData.moduleId, videoTitle: updatedData.videoTitle}),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default updateEnrolledCourseVideoProgress;
