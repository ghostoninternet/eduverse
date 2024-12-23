import customFetch from "../../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/review";
const createCourseReview = async (userId, reviewData) => {
  const url = `${BASE_URL}?userId=${userId}`;
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