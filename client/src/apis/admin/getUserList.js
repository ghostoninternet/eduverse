import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getUserList = async (page = 1, limit = 10) => {
  try {
    const response = await customFetch(`${BASE_URL}/dashboard/admin/users?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user list: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched user list:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch user list:", error);
    throw error;
  }
};

export default getUserList;
