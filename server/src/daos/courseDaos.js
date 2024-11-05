import Courses from "../models/courseModel"
import CustomError from '../errors/customError'

const countNumberOfCourses = async (filter={}) => {
  return await Courses.countDocuments(filter)
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

const findCourses = async (filter={}, limit=12, page=1) => {
  return await Courses.find(filter).skip((page - 1)*limit).limit(limit)
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

export default {
  countNumberOfCourses,
  findCourses,
}