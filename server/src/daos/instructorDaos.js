import Instructors from '../models/instructorModel.js'

const findInstructorById = async (instructorId) => {
  return await Instructors.findById(instructorId).lean()
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

export default {
  findInstructorById,
}