import courseServices from '../services/courseService'

const searchCourses = async (req, res, next) => {
  const searchRequest = await courseServices.searchCourses(req.query, req.query.limit, req.query.page)
  res.status(200).json(searchRequest)
}

export default {
  searchCourses
}
