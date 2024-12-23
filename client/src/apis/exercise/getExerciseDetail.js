import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getExerciseDetail = async (exerciseId) => {
  const url = `${BASE_URL}/exercises/instructor/${exerciseId}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default getExerciseDetail;
