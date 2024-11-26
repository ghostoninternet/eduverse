import customFetch from "../../helpers/customFetch";

const getCompletedEnrolledCourses = async () => {
  const url = `http://localhost:8000/api/enrolled-courses/completed`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

const getInProgressEnrolledCourses = async () => {
    const url = `http://localhost:8000/api/enrolled-courses/inProgress`;
    try {
      const response = await customFetch(url);
      const json = await response.json();
      return json
    } catch (error) {
      console.error(error);
    }
  };


export default {getCompletedEnrolledCourses, getInProgressEnrolledCourses}
