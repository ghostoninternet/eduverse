import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getCourseList = async (page, limit) => {
  try {
    const response = await customFetch(
      `${BASE_URL}/dashboard/admin/courses?page=${page}&limit=${limit}`
    );
    console.log("Response:", response);

    if (!response.ok) {
      console.error("Failed Response:", await response.text()); // Log chi tiết
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getCourseList:", error);
    throw error; // Để component xử lý lỗi
  }
};

export default getCourseList;
