import CustomError from "../errors/customError.js"
import categoryDaos from "../daos/categoryDaos.js"
import courseDaos from "../daos/courseDaos.js"
import instructorDaos from "../daos/instructorDaos.js"
import excludeObjectKeys from "../utils/excludeObjectKeys.js"
import includeObjectKeys from "../utils/includeObjectKeys.js"
import moduleDaos from "../daos/moduleDaos.js"
import exerciseDaos from "../daos/exerciseDaos.js"

//GET COURSE
/*recommended course  */
const getRecommendedCourses = async () => {
  let result = courseDaos.findRecommendedCourses()
  return result
}

/*free course  */
const getFreeCourses = async () => {
  let result = courseDaos.findFreeCourses()
  return result
}

/*most popular course  */
const getMostPopularCourses = async () => {
  let result = courseDaos.findMostPopularCourses()
  return result
}

const getCourseDetail = async(courseId) => {
  let foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) {
    return {}
  }

  // Get instructor information
  let instructorInfo = await instructorDaos.findInstructorById(foundCourse.courseInstructor)
  if (!instructorInfo) {
    throw new CustomError.NotFoundError("No instructor found!")
  }
  instructorInfo = includeObjectKeys(instructorInfo, [
    'instructorName',
    'instructorAvatar'
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
      foundModuleInfo.moduleExercises.push(exerciseInfo)
    }
    moduleInfo.push(foundModuleInfo)
  }
  foundCourse.courseModules = moduleInfo
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
  foundCourses = foundCourses.map(foundCourse => {
    return excludeObjectKeys(foundCourse, [
      'courseInstructor',
      'coursePrice',
      'courseModules',
      'courseReviews',
      'courseLearnerCount',
      'createdAt',
      'updatedAt'
    ])
  })
  return {
    data: foundCourses,
    pagination: {
      totalPages,
      currentPage: page,
      itemPerPage: limit,
    }
  }
}

export default {
  getCourseDetail,
  searchCourses,
  getFreeCourses,
  getMostPopularCourses,
  getRecommendedCourses
}