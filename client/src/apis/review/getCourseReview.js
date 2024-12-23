import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getCourseReview = async (courseId, page) => {
  const url = `${BASE_URL}/review/${courseId}?limit=${3 * page}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default getCourseReview;
