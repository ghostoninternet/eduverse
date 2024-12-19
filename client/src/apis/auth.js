import customFetch from "../helpers/customFetch"

const BASE_URL = 'http://localhost:8000/api'

export const signUpApi = async (data) => {
  try {
    const response = await customFetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    const responseData = await response.json()
    console.log(responseData)
    return responseData
  } catch (error) {
    console.error("Error during sign up:", error)
  }
}

export const signInApi = async (data) => {
  try {
    const response = await customFetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    const responseData = await response.json()
    console.log(responseData)
    return responseData
  } catch (error) {
    console.error("Error during sign in:", error)
  }
}