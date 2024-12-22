import customFetch from "../../helpers/customFetch";

const getInstructorCourseReview = async (courseId, limit, page) => {
  const url = `http://localhost:8000/api/review/${courseId}?limit=${limit}&page=${page}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default getInstructorCourseReview;
