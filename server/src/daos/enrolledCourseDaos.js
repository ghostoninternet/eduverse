import EnrolledCourses from "../models/enrolledCourseModel.js"

const findEnrolledCourse = async (filter) => {
  return await EnrolledCourses.findOne(filter)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const createNewEnrolledCourse = async (newEnrolledCourseData) => {
  return await EnrolledCourses.create(newEnrolledCourseData)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const updateEnrolledCourse = async (userId, courseId, updateEnrolledCourseDocument) => {
  return await EnrolledCourses.findOneAndUpdate(
    {
      userId: userId,
      courseId: courseId,
    },
    updateEnrolledCourseDocument,
    {
      new: true
    }
  )
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const deleteEnrolledCourse = async (filter) => {
  return await EnrolledCourses.findOneAndDelete(filter)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

export default {
  findEnrolledCourse,
  createNewEnrolledCourse,
  updateEnrolledCourse,
  deleteEnrolledCourse,
}