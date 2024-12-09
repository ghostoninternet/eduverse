import courseDaos from "../daos/courseDaos.js"
import reviewDaos from "../daos/reviewDaos.js"
import userDaos from "../daos/userDaos.js"
import CustomError from "../errors/customError.js"
import formatValue from "../utils/formatValue.js"
import includeObjectKeys from "../utils/includeObjectKeys.js"

const recalculateRatingAvg = async (courseId, course) => {
  const allReviews = await reviewDaos.findAllCourseReviews(courseId)
  let ratingAvg
  const ratingScore = allReviews.reduce((prevResult, currentValue) => {
    return prevResult + currentValue.ratingStar
  }, 0)
  ratingAvg = ratingScore / allReviews.length
  course.courseRatingAvg = ratingAvg
  course.courseReviewCount += 1
  await courseDaos.updateCourse(courseId, course)
}

const getInstructorCourseReview = async (courseId, limit, page) => {
  // Check course exist
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")
  
  // Find reviews
  let foundReviews = await reviewDaos.findCourseReviews({ courseId: foundCourse._id }, limit, page)
  if (foundReviews.length == 0) return []
  let allReviews = await reviewDaos.findAllCourseReviews(foundCourse._id)
  if (allReviews.length == 0) return []
  // Find user info
  for (let i = 0; i < foundReviews.length; i++) {
    let foundUser = await userDaos.findOneUser({ _id: foundReviews[i].userId })
    if (foundUser) {
      foundUser = includeObjectKeys(foundUser, [
        'username',
        'avatarUrl',
      ])
      //  foundReviews[i] = {...foundReviews[i], userId: foundUser};
      foundReviews[i].userInfo = foundUser;
    }
  }
  // Calculate number of pages and current page
  const totalReviews = await reviewDaos.countNumberOfReviews({ courseId: foundCourse._id })
  const totalPages = Math.ceil(totalReviews / limit)

  let totalStar = 0;
  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let fourStar = 0;
  let fiveStar = 0;

  allReviews.forEach((review) => {
    totalStar += review.ratingStar
    switch(review.ratingStar){
      case 1: {
        oneStar++;
        break;
      }
      case 2 : {
        twoStar++;
        break;
      }
      case 3 : {
        threeStar++;
        break;
      }
      case 4 : {
        fourStar++;
        break;
      }
      case 5 : {
        fiveStar++;
        break;
      }
    }
  })
  const avgRating = totalStar/(totalReviews)
  await courseDaos.updateCourse({_id: foundCourse._id}, {courseRatingAvg: formatValue(avgRating), courseReviewCount: totalReviews})
  return {
    data: foundReviews,
    rating: {
      oneStar: formatValue(oneStar/totalReviews * 100),   //percentage = number of 1 star / total Reviews
      twoStar: formatValue(twoStar/totalReviews * 100),
      threeStar: formatValue(threeStar/totalReviews * 100),
      fourStar: formatValue(fourStar/totalReviews * 100),
      fiveStar: formatValue(fiveStar/totalReviews * 100)
    },
    pagination: {
      totalReviews,
      totalPages,
      currentPage: page,
      limitPerPage: limit,
    }
  }
}

const getCourseReviews = async (courseSlug, limit, page) => {
  // Check course exist
  const foundCourse = await courseDaos.findCourseBySlug(courseSlug)
  if (!foundCourse) {
    throw new CustomError.NotFoundError("No course found!")
  }

  // Find reviews
  let foundReviews = await reviewDaos.findCourseReviews({ courseId: foundCourse._id }, limit, page)
  if (foundReviews.length == 0) return []
  let allReviews = await reviewDaos.findAllCourseReviews(foundCourse._id)
  if (allReviews.length == 0) return []
  // Find user info
  for (let i = 0; i < foundReviews.length; i++) {
    let foundUser = await userDaos.findOneUser({ _id: foundReviews[i].userId })
    if (foundUser) {
      foundUser = includeObjectKeys(foundUser, [
        'username',
        'avatarUrl',
      ])
      //  foundReviews[i] = {...foundReviews[i], userId: foundUser};
      foundReviews[i].userId = foundUser;
    }
  }
  // Calculate number of pages and current page
  const totalReviews = await reviewDaos.countNumberOfReviews({ courseId: foundCourse._id })
  const totalPages = Math.ceil(totalReviews / limit)

  let totalStar = 0;
  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let fourStar = 0;
  let fiveStar = 0;

  allReviews.forEach((review) => {
    totalStar += review.ratingStar
    switch(review.ratingStar){
      case 1: {
        oneStar++;
        break;
      }
      case 2 : {
        twoStar++;
        break;
      }
      case 3 : {
        threeStar++;
        break;
      }
      case 4 : {
        fourStar++;
        break;
      }
      case 5 : {
        fiveStar++;
        break;
      }
    }
  })
  const avgRating = totalStar/(totalReviews)
  await courseDaos.updateCourse({_id: foundCourse._id}, {courseRatingAvg: formatValue(avgRating), courseReviewCount: totalReviews})
  return {
    data: foundReviews,
    rating: {
      oneStar: formatValue(oneStar/totalReviews * 100),   //percentage = number of 1 star / total Reviews
      twoStar: formatValue(twoStar/totalReviews * 100),
      threeStar: formatValue(threeStar/totalReviews * 100),
      fourStar: formatValue(fourStar/totalReviews * 100),
      fiveStar: formatValue(fiveStar/totalReviews * 100)
    },
    pagination: {
      totalPages,
      currentPage: page,
      itemPerPage: limit,
    }
  }
}

const createCourseReview = async (userId, newReviewData) => {
  // Check course exist
  const foundCourse = await courseDaos.findCourseById(newReviewData.courseId)
  if (!foundCourse) {
    throw new CustomError.NotFoundError("No course found!")
  }

  // Create new review document to insert to MongoDB
  const newReviewDocument = {
    ...newReviewData,
    userId: userId
  }
  const newReview = await reviewDaos.createCourseReview(newReviewDocument)

  // Recalculate rating average and update number of reviews
  await recalculateRatingAvg(foundCourse._id, foundCourse)

  // Find user info
  let foundUser = await userDaos.findOneUser({ _id: newReview.userId })
  if (foundUser) {
    foundUser = includeObjectKeys(foundUser, [
      'username',
      'avatarUrl',
    ])
    newReview.userId = foundUser
  }

  return newReview
}

const updateCourseReview = async (reviewId, userId, updateCourseReviewData) => {
  // Check review exist
  const foundReview = await reviewDaos.findCourseReviewById(reviewId)
  if (!foundReview) {
    throw new CustomError.NotFoundError("No course found!")
  }

  // Check course exist
  const foundCourse = await courseDaos.findCourseById(foundReview.courseId)
  if (!foundCourse) {
    throw new CustomError.NotFoundError("No course found!")
  }

  let updateCourseReviewDocument = {
    ...updateCourseReviewData,
    userId: userId,
  }
  const updatedCourseReview = await reviewDaos.updateCourseReview(reviewId, updateCourseReviewDocument)

  if (foundReview.ratingStar !== updateCourseReviewData.ratingStar) {
    // Recalculate rating average and update number of reviews
    await recalculateRatingAvg(foundCourse._id, foundCourse)
  }

  // Find user info
  let foundUser = await userDaos.findOneUser({ _id: updatedCourseReview.userId })
  if (foundUser) {
    foundUser = includeObjectKeys(foundUser, [
      'username',
      'avatarUrl',
    ])
    updatedCourseReview.userId = foundUser
  }

  return updatedCourseReview
}

const deleteCourseReview = async (reviewId) => {
  // Check review exist
  const foundReview = await reviewDaos.findCourseReviewById(reviewId)
  if (!foundReview) {
    throw new CustomError.NotFoundError("No review found!")
  }
  // Check course exist
  const foundCourse = await courseDaos.findCourseById(foundReview.courseId)
  if (!foundCourse) {
    throw new CustomError.NotFoundError("No course found!")
  }

  // Delete review
  await reviewDaos.deleteCourseReview(reviewId)

  // Recalculate rating average and update number of reviews
  await recalculateRatingAvg(foundCourse._id, foundCourse)

  return true
}

export default {
  getInstructorCourseReview,
  getCourseReviews,
  createCourseReview,
  updateCourseReview,
  deleteCourseReview,
}