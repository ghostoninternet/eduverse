import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getModuleList = async (page, limit) => {
  try {
    const response = await customFetch(
      `${BASE_URL}/dashboard/admin/modules?page=${page}&limit=${limit}`
    );
    console.log("Response list:", response);

    if (!response.ok) {
      console.error("Failed Response:", await response.text()); // Log chi tiết
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getModuleList:", error);
    throw error; // Để component xử lý lỗi
  }
};

export default getModuleList;
