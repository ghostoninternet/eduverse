import BASE_URL from "../constants/api"
import customFetch from "../helpers/customFetch"

export const pingServer = async () => {
  try {
    const response = await customFetch(`${BASE_URL}/ping`)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
