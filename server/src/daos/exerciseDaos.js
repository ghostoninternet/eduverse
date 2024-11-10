import Exercises from "../models/exerciseModel"

const findExerciseById = async (exerciseId) => {
  return await Exercises.findById(exerciseId)
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

export default {
  findExerciseById,
}