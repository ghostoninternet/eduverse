import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";
const getAllCourses = async () => {
    const url = `${BASE_URL}/courses/allCourses`;
    try {
      const response = await customFetch(url);
      const json = await response.json();
      return json
    } catch (error) {
      console.error(error);
    }
}

export default getAllCourses;