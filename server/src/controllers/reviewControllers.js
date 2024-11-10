import reviewServices from "../services/reviewServices"

const getCourseReviews = async (req, res, next) => {
  const { courseId } = req.params.courseId
  const { limit, page } = req.query
  const courseReviews = await reviewServices.getCourseReviews(courseId, limit, page)
  res.status(200).json(courseReviews)
}

const createCourseReview = async (req, res, next) => {
  const { userId } = req.userId
  const newCourseReview = await reviewServices.createCourseReview(userId, req.body)
  res.status(200).json(newCourseReview)
}

const updateCourseReview = async (req, res, next) => {
  const { reviewId } = req.params
  const { userId } = req.userId
  const updatedCourseReview = await reviewServices.updateCourseReview(reviewId, userId, req.body)
  res.status(200).json(updatedCourseReview)
}

const deleteCourseReview = async (req, res, next) => {
  const deletedCourseReview = await reviewServices.deleteCourseReview(req.params.reviewId)
  res.status(200).json(deletedCourseReview)
}

export default {
  getCourseReviews,
  createCourseReview,
  updateCourseReview,
  deleteCourseReview,
}