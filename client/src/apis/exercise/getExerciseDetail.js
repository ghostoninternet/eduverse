import customFetch from "../../helpers/customFetch";

const getExerciseDetail = async (exerciseId) => {
  const url = `http://localhost:8000/api/exercises/instructor/${exerciseId}`;
  try {
    const response = await customFetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default getExerciseDetail;
