import Courses from "../models/courseModel.js"
import CustomError from '../errors/customError.js'

const findRecommendedCourses = async () => {
  return await Courses.aggregate([
    {
      $sort: { "courseRatingAvg": -1 } //-1: sort descending
    },
    {
      //get 3 fields: title, imgURL, description
      $project: {
        "courseTitle": 1,
        "courseImgUrl": 1,
        "courseDescription": 1
      }
    },
    {
      $limit: 4
    }
  ])
}

const findFreeCourses = async () => {
  return await Courses.aggregate([
    {
      $match: { coursePrice: 0 }
    },
    {
      $sort: { "courseRatingAvg": -1 }
    },
    {
      $project: {
        "courseTitle": 1,
        "courseImgUrl": 1,
        "courseDescription": 1
      }
    },
    {
      $limit: 4
    }
  ])
}

const findMostPopularCourses = async () => {
  return await Courses.aggregate([
    {
      $sort: { "courseLearnerCount": -1 } //sort by descending
    },
    {
      $project: {
        "courseTitle": 1,
        "courseImgUrl": 1,
        "courseDescription": 1
      }
    },
    {
      $limit: 4
    }
  ])
}
const countNumberOfCourses = async (filter = {}) => {
  return await Courses.countDocuments(filter)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const findCourses = async (filter = {}, limit = 12, page = 1) => {
  return await Courses.find(filter).skip((page - 1) * limit).limit(limit)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const findCourseById = async (courseId) => {
  return await Courses.findById(courseId)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const createNewCourse = async (newCourseDocument) => {
  return await Courses.create(newCourseDocument)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const updateCourse = async (courseId, updateCourseData) => {
  return await Courses.findOneAndUpdate(
    { _id: courseId },
    updateCourseData,
    { new: true }
  )
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const deleteCourse = async (courseId) => {
  return await Courses.findOneAndDelete({ _id: courseId })
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

export default {
  countNumberOfCourses,
  findCourses,
  findRecommendedCourses,
  findFreeCourses,
  findMostPopularCourses,
  findCourseById,
  createNewCourse,
  updateCourse,
  deleteCourse,
}