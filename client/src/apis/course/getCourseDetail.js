import customFetch from "../../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/courses/detail";
const getCourseDetail = async (courseId) => {
  const url = `${BASE_URL}/${courseId}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default getCourseDetail;
