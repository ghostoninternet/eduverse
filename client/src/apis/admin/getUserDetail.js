import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getUserDetail = async (userId) => {
  try {
    const response = await customFetch(`${BASE_URL}/dashboard/admin/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user detail: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("User detail fetched:", data);
    return data.data; // Trả về dữ liệu chi tiết của người dùng
  } catch (error) {
    console.error("Failed to fetch user detail:", error);
    throw error; // Ném lỗi để xử lý tại nơi sử dụng
  }
};

export default getUserDetail;
