import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

export default async function getInstructorStats() {
  try {
    const response = await customFetch(`${BASE_URL}/dashboard/instructor`);
    const data = await response.json();
    console.log("API response:", data); // Log the entire response
    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

