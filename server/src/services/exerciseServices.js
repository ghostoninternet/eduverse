import mongoose from "mongoose"
import exerciseDaos from "../daos/exerciseDaos.js"
import moduleDaos from "../daos/moduleDaos.js"
import excludeObjectKeys from "../utils/excludeObjectKeys.js"
import CustomError from "../errors/customError.js"

const getExercises = async (instructorId, limit=10, page=1) => {
  let foundExercises = await exerciseDaos.findExercises({ exerciseInstructor: instructorId }, limit, page)
  if (foundExercises.length == 0) return []

  foundExercises = foundExercises.map(async (foundExercise) => {
    let foundModule = await moduleDaos.findModuleById(foundExercise.exerciseModule)
    if (foundModule) {
      foundExercise.exerciseModule = foundModule.moduleTitle
    } else {
      foundExercise.exerciseModule = null
    }
    return excludeObjectKeys(foundExercise, [
      'exerciseInstructor',
      'exerciseQuizes',
      'updatedAt'
    ])
  })

  const totalExercises = await exerciseDaos.countExercises({ exerciseInstructor: instructorId })
  const totalPages = Math.ceil(totalExercises / limit)

  return {
    data: foundExercises,
    pagination: {
      totalPages: totalPages,
      currentPage: page,
      limitPerPage: limit,
    }
  }
}

const getExerciseDetail = async (exerciseId) => {
  const foundExercise = await exerciseDaos.findExerciseById(exerciseId)
  if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")

  let foundModule = await moduleDaos.findModuleById(foundExercise.exerciseModule)
  if (foundModule) {
    foundExercise.exerciseModule = foundModule.moduleTitle
  } else {
    foundExercise.exerciseModule = null
  }

  return excludeObjectKeys(foundExercise, [
    'exerciseInstructor',
    'updatedAt'
  ])
}

const searchExercise = async (query, limit, page) => {
  const filter = {
    $text: { $search: query }
  }

  const foundExercises = await exerciseDaos.findExercises(filter, limit, page)
  if (foundExercises.length == 0) return []

  foundExercises = foundExercises.map(async (foundExercise) => {
    let foundModule = await moduleDaos.findModuleById(foundExercise.exerciseModule)
    if (foundModule) {
      foundExercise.exerciseModule = foundModule.moduleTitle
    } else {
      foundExercise.exerciseModule = null
    }
    return excludeObjectKeys(foundExercise, [
      'exerciseInstructor',
      'exerciseQuizes',
      'updatedAt'
    ])
  })
  
  const totalExercises = await exerciseDaos.countExercises(filter)
  const totalPages = Math.ceil(totalExercises / limit)

  return {
    data: foundExercises,
    pagination: {
      totalPages: totalPages,
      currentPage: page,
      limitPerPage: limit,
    }
  }
}

const createNewExercise = async (instructorId, newExerciseData) => {
  const foundModule = await moduleDaos.findModuleById(newExerciseData.exerciseModule)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

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
  newExercise.exerciseModule = updatedModule.moduleTitle

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

  const updateExerciseDocument = {
    ...updateExerciseData,
    exerciseModule: new mongoose.Types.ObjectId(foundExercise.exerciseModule),
    exerciseInstructor: new mongoose.Types.ObjectId(instructorId),
  }

  const updatedExercise = await exerciseDaos.updateExercise(exerciseId, updateExerciseDocument)
  updatedExercise.exerciseModule = foundModule.moduleTitle

  return excludeObjectKeys(updateExercise, [
    'exerciseInstructor',
    'exerciseQuizes',
    'updatedAt'
  ])
}

const deleteExercise = async (exerciseId) => {
  const foundExercise = await exerciseDaos.findExerciseById(exerciseId)
  if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")

  const deletedExercise = await exerciseDaos.deleteExercise(exerciseId)

  if (!deleteExercise) throw new CustomError.InternalServerError("Something went wrong")

  const updateModuleData = {
    $pull: { moduleExercises: deletedExercise._id }
  }
  await moduleDaos.updateModule(deletedExercise._id, updateModuleData)

  return true
}

export default {
  getExercises,
  getExerciseDetail,
  searchExercise,
  createNewExercise,
  updateExercise,
  deleteExercise,
}