import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const updateExerciseProgress = async (userId, courseId, updateddData) => {
  const url = `${BASE_URL}/enrolled-courses/exercise-progress/${courseId}`;
  try {
    const response = await customFetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        moduleId: updateddData.moduleId,
        exerciseId: updateddData.exerciseId,
        userScore: updateddData.userScore,
        hasPassed: updateddData.hasPassed,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default updateExerciseProgress;
