import customFetch from "../../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/exercises/instructor";
const getExerciseDetail = async (exerciseId) => {
  const url = `${BASE_URL}/${exerciseId}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default getExerciseDetail;
