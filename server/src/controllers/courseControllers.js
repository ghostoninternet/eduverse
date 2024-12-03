import categoryServices from '../services/categoryServices.js';
import courseServices from '../services/courseService.js'

const getRecommendedCourses = async (req, res, next) => {
  let {categoryName = ""} = req.query 
  let categories = await categoryServices.findCategoryByName(categoryName) || [];
  let categoriesId = [];
  categories.forEach((category) => {
    categoriesId.push(category._id)
  })
  if(categoriesId.length == 0){
    categoriesId = null
  }
  const response = await courseServices.getRecommendedCourses(categoriesId);
  res.status(200).json(response)
}

const getFreeCourses = async (req, res, next) => {
  let {categoryName = ""} = req.query
  let categories = await categoryServices.findCategoryByName(categoryName) || [];
  let categoriesId = [];
  categories.forEach((category) => {
    categoriesId.push(category._id)
  })
  if(categoriesId.length == 0){
    categoriesId = null
  }
  let response = await courseServices.getFreeCourses(categoriesId);
  res.status(200).json(response)
}

const getMostPopularCourses = async (req, res, next) => {
  let {categoryName = ""} = req.query
  let categories = await categoryServices.findCategoryByName(categoryName) || [];
  let categoriesId = [];
    categories.forEach((category) => {
      categoriesId.push(category._id)
    })
    if(categoriesId.length == 0){
      categoriesId = null
    }
  
  const response = await courseServices.getMostPopularCourses(categoriesId);
  
  res.status(200).json(response)
}

const getCourseDetail = async (req, res, next) => {
  const {courseSlug} = req.params
  const courseDetail = await courseServices.getCourseDetail(courseSlug)
  res.status(200).json(courseDetail)
}

const searchCourses = async (req, res, next) => {
  const searchRequest = await courseServices.searchCourses(req.query, req.query.limit, req.query.page)
  res.status(200).json(searchRequest)
}

const getInstructorCourses = async (req, res, next) => {
  const { limit, page } = req.query
  const { userId } = req.userId
  const foundCourses = await courseServices.getInstructorCourses(userId, limit, page)
  res.status(200).json(foundCourses)
}

const getInstructorCourseDetail = async (req, res, next) => {
  const { courseId } = req.params
  const foundCourse = await courseServices.getInstructorCourseDetail(courseId)
  res.status(200).json(foundCourse)
}

const searchInstructorCourses = async (req, res, next) => {
  const { query, limit, page } = req.query
  const { userId } = req.params
  const foundCourses = await courseServices.searchInstructorCourses(userId, query, limit, page)
  res.status(200).json(foundCourses)
}

const createNewCourse = async (req, res, next) => {
  const { userId } = req.params
  const newCourse = await courseServices.createNewCourse(userId, req.body)
  res.status(200).json(newCourse) 
}

const updateCourse = async (req, res, next) => {
  const { courseId } = req.params
  const updatedCourse = await courseServices.updateCourse(courseId, req.body)
  res.status(200).json(updatedCourse) 
}

const deleteCourse = async (req, res, next) => {
  const { courseId } = req.params
  const deletedResult = await courseServices.deleteCourse(courseId)
  res.status(200).json({
    data: deletedResult
  }) 
}

export default {
  searchCourses,
  getRecommendedCourses,
  getFreeCourses,
  getMostPopularCourses,
  getCourseDetail,
  getInstructorCourses,
  getInstructorCourseDetail,
  searchInstructorCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
}
