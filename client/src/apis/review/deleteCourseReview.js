import customFetch from "../../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/review";
const deleteCourseReview = async (reviewId) => {
  const url = `${BASE_URL}/${reviewId}`;
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
