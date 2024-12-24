import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

export async function getAdminStats() {
  try {
    const response = await customFetch(`${BASE_URL}/dashboard/admin/stats`);
    const data = await response.json();
    console.log("API Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return { error: error.message };
  }
}

export default getAdminStats;