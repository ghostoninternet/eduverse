import customFetch from "../../helpers/customFetch";

const BASE_URL = 'http://localhost:8000/api/courses/instructor'

export const getInstructorCourse = async (limit, page) => {
  try {
    const apiUrl = `${BASE_URL}?limit=${limit}&page=${page}`
    const response = await customFetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const getInstructorCourseDetail = async (courseId) => {
  try {
    const apiUrl = `${BASE_URL}/${courseId}`
    const response = await customFetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const searchInstructorCourse = async (query, limit, page) => {
  try {
    const apiUrl = `${BASE_URL}/search?query=${query}&limit=${limit}&page=${page}`
    const response = await customFetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const createNewCourse = async (data) => {  
  try {
    const apiUrl = `${BASE_URL}`
    const response = await customFetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const newCourse = await response.json()
    if (newCourse?.statusCode) throw new Error(newCourse.message)
    return newCourse
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const editCourse = async (courseId, data) => {
  try {
    const apiUrl = `${BASE_URL}/${courseId}`
    const response = await customFetch(apiUrl, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const newCourse = await response.json()
    if (newCourse?.statusCode) throw new Error(newCourse.message)
    return newCourse
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const deleteCourse = async (courseId) => {
  try {
    const apiUrl = `${BASE_URL}/${courseId}`
    const response = await customFetch(apiUrl, {
      method: 'DELETE',
    })
    const deleteResult = await response.json()
    return deleteResult
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const getAllCoursesTitle = async () => {
  try {
    const response = await customFetch(`${BASE_URL}/all-courses`)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}