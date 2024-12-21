import customFetch from "../../helpers/customFetch";

const updateCourseReview = async (reviewId, updatedContent) => {
  const url = `http://localhost:8000/api/review/${reviewId}`;
  
  try {
    const response = await customFetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContent),
    });
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