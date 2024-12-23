import customFetch from "../../helpers/customFetch";

export default async function getInstructorStats() {
  try {
    const response = await customFetch("http://localhost:8000/api/dashboard/instructor");
    const data = await response.json();
    console.log("API response:", data); // Log the entire response
    return data;
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

