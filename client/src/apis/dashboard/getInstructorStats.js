import customFetch from "../../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/dashboard/instructor";
export default async function getInstructorStats() {
  try {
    const response = await customFetch(BASE_URL);
    const data = await response.json();
    console.log("API response:", data); // Log the entire response
    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

