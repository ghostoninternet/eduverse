import mongoose from "mongoose"
import CustomError from "../errors/customError.js"
import categoryDaos from "../daos/categoryDaos.js"
import courseDaos from "../daos/courseDaos.js"
import excludeObjectKeys from "../utils/excludeObjectKeys.js"
import includeObjectKeys from "../utils/includeObjectKeys.js"
import moduleDaos from "../daos/moduleDaos.js"
import exerciseDaos from "../daos/exerciseDaos.js"
import userDaos from "../daos/userDaos.js"
import formatValue from "../utils/formatValue.js"
import Courses from "../models/courseModel.js"

//GET COURSE
/*recommended course  */
const getRecommendedCourses = async (categoryId) => {
  let result = await courseDaos.findRecommendedCourses(categoryId)
  return result
}

/*free course  */
const getFreeCourses = async (categoryId) => {
  let result = await courseDaos.findFreeCourses(categoryId)
  return result
}

/*most popular course  */
const getMostPopularCourses = async (categoryId) => {
  let result = await courseDaos.findMostPopularCourses(categoryId)
  return result
}

const getCourseDetail = async (courseSlug) => {
  let foundCourse = await courseDaos.findCourseBySlug(courseSlug)
  if (!foundCourse) {
    return {}
  }

  // Get instructor information
  let instructorInfo = await userDaos.findOneUser(foundCourse.courseInstructor)
  if (!instructorInfo) {
    throw new CustomError.NotFoundError("No instructor found!")
  }
  instructorInfo = includeObjectKeys(instructorInfo, [
    'username',
    'avatarUrl',
    'jobTitle'
  ])

  foundCourse = excludeObjectKeys(foundCourse, [
    'updatedAt'
  ])
  foundCourse.courseInstructor = instructorInfo
  // Get all category name
  let categoryNames = []
  for (let i = 0; i < foundCourse.courseCategory.length; i++) {
    let foundCategoryName = await categoryDaos.findCategoryById(foundCourse.courseCategory[i])
    if (foundCategoryName) {
      categoryNames.push(foundCategoryName.categoryName)
    }
  }
  foundCourse.courseCategory = categoryNames

  // Get all modules information
  let moduleInfo = []
  for (let i = 0; i < foundCourse.courseModules.length; i++) {
    let foundModuleInfo = await moduleDaos.findModuleById(foundCourse.courseModules[i])
    if (foundModuleInfo) {
      // Get module exercise info
      let exerciseInfo = []
      for (let j = 0; j < foundModuleInfo.moduleExercises.length; j++) {
        let foundExerciseInfo = await exerciseDaos.findExerciseById(foundModuleInfo.moduleExercises[j])
        if (foundExerciseInfo) {
          foundExerciseInfo = includeObjectKeys(foundExerciseInfo, [
            'exerciseName',
            'exerciseDuration'
          ])
          exerciseInfo.push(foundExerciseInfo)
        }
      }
      foundModuleInfo.moduleExercises = exerciseInfo
    }
    moduleInfo.push(foundModuleInfo)
  }
  foundCourse.courseModules = moduleInfo
  foundCourse.courseRatingAvg = formatValue(foundCourse.courseRatingAvg)
  return foundCourse
}

//search course
const searchCourses = async (queryParams, limit, page) => {
  let { query, courseCategory } = queryParams

  let filter = {
    $text: { $search: query },
  }

  if (courseCategory) {
    if (!Array.isArray(courseCategory)) {
      courseCategory = [courseCategory]
    }

    const categoryIds = await Promise.all(
      courseCategory.map(async (category) => await categoryDaos.findCategoryByName(category).then(data => data._id))
    )

    filter = {
      ...filter,
      courseCategory: { $in: categoryIds },
    }
  }

  const totalCourses = await courseDaos.countNumberOfCourses(filter)
  const totalPages = Math.ceil(totalCourses / limit)
  let foundCourses = await courseDaos.findCourses(filter, limit, page)

  foundCourses = await Promise.all(
    foundCourses.map(async (foundCourse) => {
      let instructor = await userDaos.findOneUser(foundCourse.courseInstructor)
      foundCourse = {
        ...foundCourse, 
      courseInstructor: instructor.username, 
      }
      return excludeObjectKeys(foundCourse, [
        'coursePrice',
        'courseModules',
        'courseReviews',
        'courseLearnerCount',
        'createdAt',
        'updatedAt'
      ])
    }
  ) )
    
  return {
    data: foundCourses,
    pagination: {
      totalPages,
      currentPage: page,
      itemPerPage: limit,
    }
  }
}

// For instructor, optimized later :v
const getInstructorCourses = async (instructorId, limit = 10, page = 1) => {
  let foundCourses = await courseDaos.findCourses({ courseInstructor: instructorId }, limit, page)
  if (foundCourses.length == 0) return []

  foundCourses = foundCourses.map(async (foundCourse) => {
    let categories = []
    for (let i = 0; i < foundCourse.courseCategory.length; i++) {
      let foundCategory = await categoryDaos.findCategoryById(foundCourse.courseCategory[i])
      if (foundCategory) {
        categories.push(foundCategory.categoryName)
      }
    }
    foundCourse.courseCategory = categories

    return excludeObjectKeys(foundCourse, [
      'courseInstructor',
      'courseImgUrl',
      'courseModules',
      'updatedAt'
    ])
  })

  const totalCourses = await courseDaos.countNumberOfCourses({ courseInstructor: instructorId })
  const totalPages = Math.ceil(totalCourses / limit)

  return {
    data: foundCourses,
    pagination: {
      totalPages: totalPages,
      currentPage: page,
      limitPerPage: limit
    }
  }
}

const getInstructorCourseDetail = async (courseId) => {
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  let categories = []
  for (let i = 0; i < foundCourse.courseCategory.length; i++) {
    let foundCategory = await categoryDaos.findCategoryById(foundCourse.courseCategory[i])
    if (foundCategory) {
      categories.push(foundCategory.categoryName)
    }
  }
  foundCourse.courseCategory = categories

  let modules = []
  for (let i = 0; i < foundCourse.courseModules.length; i++) {
    let foundModule = await moduleDaos.findModuleById(foundCourse.courseModules[i])
    if (foundModule) {
      let moduleExercises = []
      for (let j = 0; j < foundModule.moduleExercises.length; j++) {
        let foundExercise = await exerciseDaos.findExerciseById(foundModule.moduleExercises[j])
        if (foundExercise) {
          moduleExercises.push(includeObjectKeys(foundExercise, [
            '_id',
            'exerciseName',
            'exerciseDuration'
          ]))
        }
      }
      foundModule.moduleExercises = moduleExercises
      modules.push(excludeObjectKeys(foundModule, [
        'courseId',
        'moduleInstructor',
        'createdAt',
        'updatedAt'
      ]))
    }
  }

  foundCourse.courseModules = modules

  return foundCourse
}

const searchInstructorCourses = async (instructorId, query, limit, page) => {
  let filter = {
    $text: { $search: query },
    courseInstructor: new mongoose.Types.ObjectId(instructorId)
  }

  let foundCourses = await courseDaos.findCourses(filter, limit, page)
  if (foundCourses.length == 0) return []

  foundCourses = foundCourses.map(async (foundCourse) => {
    let categories = []
    for (let i = 0; i < foundCourse.courseCategory.length; i++) {
      let foundCategory = await categoryDaos.findCategoryById(foundCourse.courseCategory[i])
      if (foundCategory) {
        categories.push(foundCategory.categoryName)
      }
    }
    foundCourse.courseCategory = categories

    return excludeObjectKeys(foundCourse, [
      'courseInstructor',
      'courseImgUrl',
      'courseModules',
      'updatedAt'
    ])
  })

  const totalCourses = await courseDaos.countNumberOfCourses(filter)
  const totalPages = Math.ceil(totalCourses / limit)

  return {
    data: foundCourses,
    pagination: {
      totalPages: totalPages,
      currentPage: page,
      limitPerPage: limit
    }
  }
}

const createNewCourse = async (instructorId, newCourseData) => {
  const categories = []
  for (let i = 0; i < newCourseData.courseCategory.length; i++) {
    let foundCategory = await categoryDaos.findCategoryById(newCourseData.courseCategory[i])
    if (!foundCategory) throw new CustomError.NotFoundError("No category found!")
    categories.push(foundCategory._id)
  }

  const newCourseDocument = {
    ...newCourseData,
    courseCategory: categories,
    courseInstructor: new mongoose.Types.ObjectId(instructorId),
  }

  const newCourse = await courseDaos.createNewCourse(newCourseDocument)

  return excludeObjectKeys(newCourse, [
    'courseInstructor',
    'courseImgUrl',
    'courseModules',
    'updatedAt'
  ])
}

const updateCourse = async (courseId, updateCourseData) => {
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  const categories = []
  for (let i = 0; i < updateCourseData.courseCategory.length; i++) {
    let foundCategory = await categoryDaos.findCategoryById(updateCourseData.courseCategory[i])
    if (!foundCategory) throw new CustomError.NotFoundError("No category found!")
    categories.push(foundCategory._id)
  }

  const modules = []
  for (let i = 0; i < updateCourseData.courseModules.length; i++) {
    let foundModule = await moduleDaos.findModuleById(updateCourseData.courseModules[i])
    if (!foundModule) throw new CustomError.NotFoundError("No module found!")
    modules.push(foundModule._id)
  }

  let updateCourseDocument = {
    ...updateCourseData,
    courseCategory: categories,
    courseModules: modules,
    courseInstructor: new mongoose.Types.ObjectId(foundCourse.courseInstructor)
  }

  const updatedCourse = await courseDaos.updateCourse(courseId, updateCourseDocument)

  return excludeObjectKeys(updatedCourse, [
    'courseInstructor',
    'courseImgUrl',
    'courseModules',
    'updatedAt'
  ])
}

const deleteCourse = async (courseId) => {
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  const deletedCourse = await courseDaos.deleteCourse(foundCourse._id)
  for (let i = 0; i < deletedCourse.courseModules.length; i++) {
    const deletedModule = await moduleDaos.deleteModuleById(deletedCourse.courseModules[i])
    if (deletedModule) {
      for (let j = 0; j < deletedModule.moduleExercises.length; j++) {
        await exerciseDaos.deleteExercise(deletedModule.moduleExercises[i])
      }
    }
  }
  return true
}

export default {
  getCourseDetail,
  searchCourses,
  getFreeCourses,
  getMostPopularCourses,
  getRecommendedCourses,
  getInstructorCourses,
  getInstructorCourseDetail,
  searchInstructorCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
}