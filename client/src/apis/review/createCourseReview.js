import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const createCourseReview = async (userId, reviewData) => {
  const url = `${BASE_URL}/review?userId=${userId}`;
  try {
    const response = await customFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export default createCourseReview;