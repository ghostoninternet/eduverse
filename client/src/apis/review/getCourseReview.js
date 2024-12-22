import customFetch from "../../helpers/customFetch";

const getCourseReview = async (courseId, page) => {
  const url = `http://localhost:8000/api/review/${courseId}?limit=${3 * page}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default getCourseReview;
