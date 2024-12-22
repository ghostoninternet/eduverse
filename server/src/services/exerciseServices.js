import mongoose from "mongoose"
import exerciseDaos from "../daos/exerciseDaos.js"
import moduleDaos from "../daos/moduleDaos.js"
import excludeObjectKeys from "../utils/excludeObjectKeys.js"
import CustomError from "../errors/customError.js"

const getExercises = async (instructorId, moduleId) => {
  const foundModule = await moduleDaos.findModuleById(moduleId)
  if (!foundModule) throw new CustomError.NotFoundError('No module found!')

  const foundExercises = await exerciseDaos.findExercises({
    exerciseInstructor: new mongoose.Types.ObjectId(instructorId),
    exerciseModule: new mongoose.Types.ObjectId(moduleId),
  })
  if (foundExercises.length == 0) return []

  const transformedExercises = []
  for (let i = 0; i < foundExercises.length; i++) {
    const foundExercise = foundExercises[i]
    const exerciseInfo = {
      ...foundExercise,
      exerciseModule: excludeObjectKeys(foundModule, [
        'moduleExercises',
        'createdAt',
        'updatedAt',
        '__v',
        'moduleVideoLessons',
      ])
    }

    transformedExercises.push(exerciseInfo)
  }

  return transformedExercises
}

const getExerciseDetail = async (exerciseId, instructorId) => {
  const foundExercise = await exerciseDaos.findOneExercise({
    exerciseInstructor: new mongoose.Types.ObjectId(instructorId),
    _id: new mongoose.Types.ObjectId(exerciseId),
  })
  if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")

  let foundModule = await moduleDaos.findModuleById(foundExercise.exerciseModule)
  foundExercise.exerciseModule = foundModule

  return excludeObjectKeys(foundExercise, [
    'exerciseInstructor',
    'updatedAt'
  ])
}

const createNewExercise = async (instructorId, newExerciseData) => {
  const foundModule = await moduleDaos.findModuleById(newExerciseData.exerciseModule)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

  const foundExercise = await exerciseDaos.findOneExercise({
    exerciseName: newExerciseData.exerciseName,
    exerciseModule: new mongoose.Types.ObjectId(newExerciseData.exerciseModule)
  })
  if (foundExercise) throw new CustomError.BadRequestError("There's already an exercise with the same name in this module")

  const newExerciseDocument = {
    ...newExerciseData,
    exerciseModule: new mongoose.Types.ObjectId(newExerciseData.exerciseModule),
    exerciseInstructor: new mongoose.Types.ObjectId(instructorId),
  }

  const newExercise = await exerciseDaos.createNewExercise(newExerciseDocument)

  const updateModuleData = {
    $push: { moduleExercises: newExercise._id }
  }
  const updatedModule = await moduleDaos.updateModule(newExercise.exerciseModule, updateModuleData)
  newExercise.exerciseModule = excludeObjectKeys(updatedModule, [
    'moduleExercises',
    'createdAt',
    'updatedAt',
    '__v',
    'moduleVideoLessons',
  ])

  return excludeObjectKeys(newExercise, [
    'exerciseInstructor',
    'exerciseQuizes',
    'updatedAt'
  ])
}

const updateExercise = async (exerciseId, instructorId, updateExerciseData) => {
  const foundExercise = await exerciseDaos.findExerciseById(exerciseId)
  if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")

  const foundModule = await moduleDaos.findModuleById(updateExerciseData.exerciseModule)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

  if (updateExerciseData?.exerciseName) {
    const foundSameNameExercise = await exerciseDaos.findOneExercise({
      exerciseName: updateExerciseData?.exerciseName,
      exerciseModule: new mongoose.Types.ObjectId(updateExerciseData.exerciseModule),
      _id: { $ne: exerciseId }
    })
    if (foundSameNameExercise) throw new CustomError.BadRequestError("There's already an exercise with the same name in this module")
  }

  const updateExerciseDocument = {
    ...updateExerciseData,
    exerciseModule: new mongoose.Types.ObjectId(foundExercise.exerciseModule),
    exerciseInstructor: new mongoose.Types.ObjectId(instructorId),
  }

  const updatedExercise = await exerciseDaos.updateExercise(exerciseId, updateExerciseDocument)
  updatedExercise.exerciseModule = excludeObjectKeys(foundModule, [
    'moduleExercises',
    'createdAt',
    'updatedAt',
    '__v',
    'moduleVideoLessons',
  ])

  return excludeObjectKeys(updatedExercise, [
    'exerciseInstructor',
    'exerciseQuizes',
    'updatedAt'
  ])
}

const deleteExercise = async (exerciseId) => {
  const foundExercise = await exerciseDaos.findExerciseById(exerciseId)
  if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")
  if (foundExercise.isDeleted) throw new CustomError.BadRequestError("Exercise has already been deleted!")

  const deletedExercise = await exerciseDaos.updateExercise(exerciseId, { isDeleted: true })
  if (!deletedExercise) throw new CustomError.InternalServerError("Something went wrong")

  const updateModuleData = {
    $pull: { moduleExercises: deletedExercise._id }
  }
  moduleDaos.updateModule(foundExercise.exerciseModule, updateModuleData)

  return true
}

export default {
  getExercises,
  getExerciseDetail,
  createNewExercise,
  updateExercise,
  deleteExercise,
}