import courseServices from '../services/courseService.js'

const getRecommendedCourses = async (req, res, next) => {
  const response = await courseServices.getRecommendedCourses();
  res.status(200).json(response)
}

const getFreeCourses = async (req, res, next) => {
  const response = await courseServices.getFreeCourses();
  res.status(200).json(response)
}

const getMostPopularCourses = async (req, res, next) => {
  const response = await courseServices.getMostPopularCourses();
  res.status(200).json(response)
}

const getCourseDetail = async (req, res, next) => {
  const courseDetail = await courseServices.getCourseDetail(req.params.courseId)
  res.status(200).json(courseDetail)
}

const searchCourses = async (req, res, next) => {
  const searchRequest = await courseServices.searchCourses(req.query, req.query.limit, req.query.page)
  res.status(200).json(searchRequest)
}

export default {
  searchCourses,
  getRecommendedCourses,
  getFreeCourses,
  getMostPopularCourses,
  getCourseDetail,
}
