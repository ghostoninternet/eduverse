import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const deleteCourseReview = async (reviewId) => {
  const url = `${BASE_URL}/review/${reviewId}`;
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
