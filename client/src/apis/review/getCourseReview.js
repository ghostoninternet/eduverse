import customFetch from "../../helpers/customFetch";

const getCourseReview = async (courseId) => {
  const url = `http://localhost:8000/api/review/${courseId}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default getCourseReview;
