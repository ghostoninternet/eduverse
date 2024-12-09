import customFetch from "../../helpers/customFetch";

const deleteCourseReview = async (reviewId) => {
  const url = `http://localhost:8000/api/review/${reviewId}`;
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
