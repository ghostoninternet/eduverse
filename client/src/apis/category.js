import customFetch from "../helpers/customFetch";

export const getCategory = async () => {
  try {
    const apiUrl = `http://localhost:8000/api/category`
    const response = await customFetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}
