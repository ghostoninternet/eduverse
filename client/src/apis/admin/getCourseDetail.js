import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getCourseDetail = async (courseId) => {
  try {
    const response = await customFetch(`${BASE_URL}/dashboard/admin/courses/${courseId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course detail: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching course detail:", error);
    throw error;
  }
};

export default getCourseDetail;
