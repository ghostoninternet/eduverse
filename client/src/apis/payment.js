import customFetch from "../helpers/customFetch"

const BASE_URL = 'http://localhost:8000/api'

export const createCheckoutSession = async (courseId) => {
  try {
    const response = await customFetch(`${BASE_URL}/payment/${courseId}`, {
      method: "POST"
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
