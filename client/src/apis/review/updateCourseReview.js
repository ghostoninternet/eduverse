import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const updateCourseReview = async (reviewId, updatedContent) => {
  const url = `${BASE_URL}/review/${reviewId}`;
  
  try {
    const response = await customFetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContent),
    });
    console.log("Updated review:", response);
    if (!response.ok) {
      throw new Error(`Failed to update review: ${response.statusText}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export default updateCourseReview;