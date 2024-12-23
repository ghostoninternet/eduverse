import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

export async function getAdminStats() {
  try {
    const response = await customFetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw new Error(error);
  }
}
