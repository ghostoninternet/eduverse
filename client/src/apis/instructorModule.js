import customFetch from "../helpers/customFetch"

const BASE_URL = 'http://localhost:8000/api/modules/instructor'

export const getModules = async (limit, page) => {
  try {
    const response = await customFetch(`${BASE_URL}?limit=${limit}&page=${page}`)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const getModuleDetail = async (moduleId) => {
  try {
    const response = await customFetch(`${BASE_URL}/${moduleId}`)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const searchModules = async (query, limit, page) => {
  try {
    const response = await customFetch(`${BASE_URL}/search?query=${query}&limit=${limit}&page=${page}`)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const createNewModule = async (data) => {
  try {
    const response = await customFetch(`${BASE_URL}`, {
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

export const editModule = async (moduleId, data) => {
  try {
    const response = await customFetch(`${BASE_URL}/${moduleId}`, {
      method: 'PUT',
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

export const deleteModule = async (moduleId) => {
  try {
    const response = await customFetch(`${BASE_URL}/${moduleId}`, {
      method: 'DELETE'
    })
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
