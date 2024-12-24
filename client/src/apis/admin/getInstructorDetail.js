import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getInstructorDetail = async (instructorId) => {
  try {
    const response = await customFetch(`${BASE_URL}/dashboard/admin/instructors/${instructorId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch instructor detail: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Fetched instructor detail:", data);
    return data.data; // Trả về dữ liệu chi tiết của giảng viên
  } catch (error) {
    console.error("Failed to fetch instructor detail:", error);
    throw error; // Ném lỗi để xử lý tại nơi sử dụng
  }
};

export default getInstructorDetail;
