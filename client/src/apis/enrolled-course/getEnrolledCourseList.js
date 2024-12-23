import customFetch from "../../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/enrolled-courses"
const getCompletedEnrolledCourses = async () => {
  const url = `${BASE_URL}/completed`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getInProgressEnrolledCourses = async () => {
  const url = `${BASE_URL}/inProgress`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getEnrolledCourseDetail = async (courseId) => {
  const url = `${BASE_URL}/${courseId}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default { getCompletedEnrolledCourses, getInProgressEnrolledCourses,getEnrolledCourseDetail };
