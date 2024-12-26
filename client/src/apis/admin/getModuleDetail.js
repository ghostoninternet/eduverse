import customFetch from "../../helpers/customFetch";
import BASE_URL from "../../constants/api";

const getModuleDetail = async (moduleId) => {
  try {
    const response = await customFetch(
      `${BASE_URL}/dashboard/admin/modules/${moduleId}`
    );
    console.log("Response detail:", response);

    if (!response.ok) {
      console.error("Failed Response:", await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getModuleDetail:", error);
    throw error; // Để component xử lý lỗi
  }
};

export default getModuleDetail;
