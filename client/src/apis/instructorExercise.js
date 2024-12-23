import customFetch from "../helpers/customFetch"
import BASE_URL from "../constants/api"

const INSTRUCTOR_BASE_URL = `${BASE_URL}/exercises/instructor`

export const getExerciseDetail = async (exerciseId) => {
  try {
    const response = await customFetch(`${INSTRUCTOR_BASE_URL}/${exerciseId}`)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const createNewExercise = async (data) => {
  try {
    const response = await customFetch(`${INSTRUCTOR_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const updateExercise = async (exerciseId, updateData) => {
  try {
    const response = await customFetch(`${INSTRUCTOR_BASE_URL}/${exerciseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const deleteExercise = async (exerciseId) => {
  try {
    const response = await customFetch(`${INSTRUCTOR_BASE_URL}/${exerciseId}`, {
      method: 'DELETE'
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}