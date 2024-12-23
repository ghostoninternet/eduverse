import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const deleteCourseReview = async (reviewId) => {
  const url = `${BASE_URL}/review/${reviewId}`;
  try {
    const response = await customFetch(url, {
      method: 'DELETE',
    });
    const json = await response.json();
    return json
  } catch (error) {
    console.error(error);
  }
};

export default deleteCourseReview;
