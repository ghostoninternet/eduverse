import customFetch from "../../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/courses/search";
const searchCourses = async (query) => {
  const apiUrl = BASE_URL;
  const queryParams = {
    query,
  };
  const queryString = new URLSearchParams(queryParams).toString();

  const fullUrl = `${apiUrl}?${queryString}`;
  try {
    const response = await customFetch(fullUrl);
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default searchCourses;
