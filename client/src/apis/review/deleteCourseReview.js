import customFetch from "../../helpers/customFetch";

const deleteCourseReview = async (reviewId) => {
  console.log("Frontend: reviewId being sent:", reviewId);
  const url = `http://localhost:8000/api/review/${reviewId}`;
  try {
    const response = await customFetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete review');
    }
    const json = await response.json();
    return { success: true, ...json };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

export default deleteCourseReview;
