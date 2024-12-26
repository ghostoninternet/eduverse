import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getExerciseDetail = async (exerciseId) => {
  try {
    const response = await customFetch(
      `${BASE_URL}/dashboard/admin/exercises/${exerciseId}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed Response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Exercise detail fetched:", data);
    return data;
  } catch (error) {
    console.error("Error in getExerciseDetail:", error);
    throw error;
  }
};

export default getExerciseDetail;
