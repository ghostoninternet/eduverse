import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getCompletedEnrolledCourses = async () => {
  const url = `${BASE_URL}/enrolled-courses/completed`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getInProgressEnrolledCourses = async () => {
  const url = `${BASE_URL}/enrolled-courses/inProgress`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const getEnrolledCourseDetail = async (courseId) => {
  const url = `${BASE_URL}/enrolled-courses/${courseId}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default { getCompletedEnrolledCourses, getInProgressEnrolledCourses,getEnrolledCourseDetail };
