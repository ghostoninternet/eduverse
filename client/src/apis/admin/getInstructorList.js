import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getInstructorList = async (page = 1, limit = 10) => {
  try {
    const response = await customFetch(`${BASE_URL}/dashboard/admin/instructors?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch instructor list: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched instructor list:", data);
    return data.data; // Trả về toàn bộ dữ liệu nhận được từ API
  } catch (error) {
    console.error("Failed to fetch instructor list:", error);
    throw error; // Ném lỗi để xử lý tại nơi sử dụng hàm
  }
};

export default getInstructorList;
