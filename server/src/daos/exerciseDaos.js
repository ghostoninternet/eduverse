import Exercises from "../models/exerciseModel.js"

const countExercises = async (filter) => {
  return await Exercises.countDocuments(filter)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const findExerciseById = async (exerciseId) => {
  return await Exercises.findById(exerciseId).lean()
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const findExercises = async (filter, limit = 10, page = 1) => {
  return await Exercises.find(filter).skip((page - 1) * limit).limit(limit)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const createNewExercise = async (newExerciseDocument) => {
  return await Exercises.create(newExerciseDocument)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const updateExercise = async (exerciseId, updateExerciseData) => {
  return await Exercises.findOneAndUpdate(
    { _id: exerciseId },
    updateExerciseData,
    { new: true }
  )
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const deleteExercise = async (exerciseId) => {
  return await Exercises.findOneAndDelete({ _id: exerciseId })
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

export default {
  countExercises,
  findExercises,
  findExerciseById,
  createNewExercise,
  updateExercise,
  deleteExercise,
}