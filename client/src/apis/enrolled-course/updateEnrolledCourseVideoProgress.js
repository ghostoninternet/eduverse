import customFetch from "../../helpers/customFetch";

const updateEnrolledCourseVideoProgress = async (userId, courseId, updatedData) => {
    const url = `http://localhost:8000/api/enrolled-courses/video-progress/${courseId}`;
    try {
      const response = await customFetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

export default updateEnrolledCourseVideoProgress;