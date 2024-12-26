import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";
const getAllCourses = async (page) => {
    const url = `${BASE_URL}/courses/allCourses/?limit=8&page=${page}`;
    try {
      const response = await customFetch(url);
      const json = await response.json();
      return json
    } catch (error) {
      console.error(error);
    }
}

export default getAllCourses;