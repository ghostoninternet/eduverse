import categoryDaos from "../daos/categoryDaos.js"
import courseDaos from "../daos/courseDaos.js"
import excludeObjectKeys from "../utils/excludeObjectKeys.js"

//GET COURSE
/*recommened course  */



/*free course  */




/*most popular course  */






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
  searchCourses
}