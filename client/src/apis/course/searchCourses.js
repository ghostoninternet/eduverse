import customFetch from "../../helpers/customFetch";

const searchCourses = async (query) => {
  const apiUrl = `http://localhost:8000/api/courses/search`;
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
