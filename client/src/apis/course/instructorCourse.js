import customFetch from "../../helpers/customFetch";

export const getInstructorCourse = async (limit, page) => {
  try {
    const apiUrl = `http://localhost:8000/api/courses/instructor?userId=67501a5bab44b20719bd60cf&limit=${limit}&page=${page}`
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
    const apiUrl = `http://localhost:8000/api/courses/instructor/${courseId}`
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
    const apiUrl = `http://localhost:8000/api/courses/instructor/search?userId=67501a5bab44b20719bd60cf&query=${query}&limit=${limit}&page=${page}`
    const response = await customFetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const createNewCourse = async (data) => {
  console.log('🚀 ~ createNewCourse ~ data:', data)
  
  try {
    const apiUrl = `http://localhost:8000/api/courses/instructor?userId=67501a5bab44b20719bd60cf`
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
    const apiUrl = `http://localhost:8000/api/courses/instructor/${courseId}`
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
    const apiUrl = `http://localhost:8000/api/courses/instructor/${courseId}`
    const response = await customFetch(apiUrl, {
      method: 'DELETE',
    })
    const deleteResult = await response.json()
    console.log('🚀 ~ deleteCourse ~ deleteResult:', deleteResult)
    return deleteResult
  } catch (error) {
    console.error(error)
    throw new Error(error.message)
  }
}