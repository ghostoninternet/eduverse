import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getCourseDetail = async (courseId) => {
  const url = `${BASE_URL}/courses/detail/${courseId}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default getCourseDetail;
