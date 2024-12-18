import customFetch from "../../helpers/customFetch";

const getCourseDetail = async (courseSlug) => {
  const url = `http://localhost:8000/api/courses/detail/${courseSlug}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default getCourseDetail;
