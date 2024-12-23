import customFetch from "../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/category";
export const getCategory = async () => {
  try {
    const response = await customFetch(BASE_URL)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}
