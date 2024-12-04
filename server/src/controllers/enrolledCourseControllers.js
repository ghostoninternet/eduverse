import enrolledCourseService from "../services/enrolledCourseService.js"

const getEnrolledCourseDetail = async (req, res, next) => {
  const { userId } = req
  const { courseId } = req.params
  const enrolledCourseDetail = await enrolledCourseService.getEnrolledCourseDetail(userId, courseId)
  res.status(200).json(enrolledCourseDetail)
}

const createNewEnrolledCourse = async (req, res, next) => {
  const { userId } = req.userId
  const { courseId } = req.params
  const newEnrolledCourse = await enrolledCourseService.createNewEnrolledCourse(userId, courseId)
  res.status(200).json(newEnrolledCourse)
}

const updateEnrolledCourseVideoProgress = async (req, res, next) => {
  const { userId } = req
  const { courseId } = req.params
  const updatedEnrolledCourseProgress = await enrolledCourseService.updateEnrolledCourseVideoProgress(userId, courseId, req.body)
  res.status(200).json(updatedEnrolledCourseProgress)
}

const updateEnrolledCourseExerciseProgress = async (req, res, next) => {
  const { userId } = req.userId
  const { courseId } = req.params
  const updatedEnrolledCourseProgress = await enrolledCourseService.updateEnrolledCourseExerciseProgress(userId, courseId, req.body)
  res.status(200).json(updatedEnrolledCourseProgress)
}

const deleteEnrolledCourse = async (req, res, next) => {
  const { userId } = req.userId
  const { courseId } = req.params
  const deletedResult = await enrolledCourseService.deleteEnrolledCourse(userId, courseId)
  res.status(200).json({
    data: deletedResult
  })
}

const getCompletedEnrolledCourses = async (req, res, next) => {
  const {userId} = req
  const getResult = await enrolledCourseService.getCompletedEnrolledCourses(userId)
  res.status(200).json({
    data: getResult
  })
}

const getInProgressEnrolledCourses = async (req, res, next) => {
  const {userId} = req
  const getResult = await enrolledCourseService.getInProgressEnrolledCourses(userId)
  res.status(200).json({
    data: getResult
  })
}

export default {
  getEnrolledCourseDetail,
  createNewEnrolledCourse,
  updateEnrolledCourseVideoProgress,
  updateEnrolledCourseExerciseProgress,
  deleteEnrolledCourse,
  getCompletedEnrolledCourses,
  getInProgressEnrolledCourses
}