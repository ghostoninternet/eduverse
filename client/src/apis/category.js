import customFetch from "../helpers/customFetch";
import BASE_URL from "../constants/api";

export const getCategory = async () => {
  try {
    const apiUrl = `${BASE_URL}/category`
    const response = await customFetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}
