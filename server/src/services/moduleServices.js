import mongoose from 'mongoose'
import courseDaos from "../daos/courseDaos.js"
import exerciseDaos from "../daos/exerciseDaos.js"
import moduleDaos from "../daos/moduleDaos.js"
import CustomError from "../errors/customError.js"
import excludeObjectKeys from "../utils/excludeObjectKeys.js"

const getAllModulesTitle = async (instructorId) => {
  const foundModules = await moduleDaos.findAllModules({
    moduleInstructor: new mongoose.Types.ObjectId(instructorId),
  })
  const allModules = []
  for (let i = 0; i < foundModules.length; i++) {
    allModules.push({
      moduleId: foundModules[i]._id,
      moduleTitle: foundModules[i].moduleTitle,
    })
  }
  return allModules
}

const getModules = async (instructorId, limit = 10, page = 1) => {
  const foundModules = await moduleDaos.findModuleByInstructor(instructorId, limit, page)
  const totalModules = await moduleDaos.countNumberOfModule({ moduleInstructor: instructorId })
  const totalPages = Math.ceil(totalModules / limit)

  let transformedModules = []
  for (let i = 0; i < foundModules.length; i++) {
    const foundCourse = await courseDaos.findCourseById(foundModules[i].courseId)
    if (!foundCourse) throw new NotFoundError('No course found!')

    const moduleInfo = {
      ...foundModules[i],
      courseId: foundCourse.courseTitle,
    }
    transformedModules.push(excludeObjectKeys(moduleInfo, [
      'moduleInstructor',
      'moduleVideoLessons',
      'moduleExercises',
      'updatedAt',
      "__v",
    ]))
  }

  return {
    data: transformedModules,
    pagination: {
      totalModules,
      totalPages,
      currentPage: page,
      itemPerPage: limit,
    }
  }
}

const getModuleDetail = async (moduleId) => {
  let foundModule = await moduleDaos.findModuleById(moduleId)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

  let foundExercises = []
  for (let i = 0; i < foundModule.moduleExercises.length; i++) {
    let foundExercise = await exerciseDaos.findExerciseById(foundModule.moduleExercises[i])
    if (foundExercise) {
      foundExercise = excludeObjectKeys(foundExercise, [
        'exerciseQuizes',
        'updatedAt',
      ])
      foundExercises.push(foundExercise)
    }
  }
  foundModule.moduleExercises = foundExercises

  const foundCourse = await courseDaos.findCourseById(foundModule.courseId)
  if (foundModule) {
    foundModule.courseId = foundCourse.courseTitle
  }

  return excludeObjectKeys(foundModule, ['moduleInstructor'])
}

const searchModule = async (userId, query, limit, page) => {
  let filter = {
    moduleTitle: { $regex: query, $options: 'i' },
    moduleInstructor: new mongoose.Types.ObjectId(userId),
  }

  let foundModules = await moduleDaos.findModules(filter, limit, page)
  const totalModules = await moduleDaos.countNumberOfModule(filter)
  const totalPages = Math.ceil(totalModules / limit)

  let transformedModules = []
  for (let i = 0; i < foundModules.length; i++) {
    const foundCourse = await courseDaos.findCourseById(foundModules[i].courseId)
    if (!foundCourse) throw new NotFoundError('No course found!')

    const moduleInfo = {
      ...foundModules[i],
      courseId: foundCourse.courseTitle,
    }
    transformedModules.push(excludeObjectKeys(moduleInfo, [
      'moduleInstructor',
      'moduleVideoLessons',
      'moduleExercises',
      'updatedAt',
      '__v',
    ]))
  }

  return {
    data: transformedModules,
    pagination: {
      totalModules,
      totalPages,
      currentPage: page,
      itemPerPage: limit,
    }
  }
}



const createNewModule = async (instructorId, newModuleData) => {
  const foundCourse = await courseDaos.findCourseById(newModuleData.courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  const foundModule = await moduleDaos.findOneModule({
    courseId: newModuleData.courseId,
    moduleTitle: newModuleData.moduleTitle,
  })
  if (foundModule) throw new CustomError.BadRequestError("There is already a module with the same name in this course")

  const newModuleDocument = {
    ...newModuleData,
    moduleInstructor: new mongoose.Types.ObjectId(instructorId),
    courseId: new mongoose.Types.ObjectId(newModuleData.courseId),
  }

  const newModule = await moduleDaos.createNewModule(newModuleDocument)

  const updateCourseData = {
    $push: { courseModules: newModule._id }
  }

  courseDaos.updateCourse(foundCourse._id, updateCourseData)

  return excludeObjectKeys(newModule, [
    'moduleInstructor',
    'moduleVideoLessons',
    'moduleExercises',
    'updatedAt',
    '__v',
  ])
}

const updateModule = async (moduleId, instructorId, updateModuleData) => {
  const foundModule = await moduleDaos.findModuleById(moduleId)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

  if (updateModuleData?.moduleTitle) {
    const foundSameNameModule = await moduleDaos.findOneModule({
      courseId: updateModuleData.courseId,
      moduleTitle: updateModuleData.moduleTitle,
    })
    if (foundSameNameModule) throw new CustomError.BadRequestError("There is already a module with the same name in this course")  
  }

  const updateModuleDocument = {
    ...updateModuleData,
    courseId: new mongoose.Types.ObjectId(updateModuleData.courseId),
    moduleInstructor: new mongoose.Types.ObjectId(instructorId),
  }

  const updatedModule = await moduleDaos.updateModule(moduleId, updateModuleDocument)
  return updatedModule
}

const deleteModule = async (moduleId, instructorId) => {
  const foundModule = await moduleDaos.findOneModule({
    _id: new mongoose.Types.ObjectId(moduleId),
    moduleInstructor: new mongoose.Types.ObjectId(instructorId)
  })
  if (!foundModule) throw new CustomError.NotFoundError('No module found!')
  if (foundModule.isDeleted) throw new CustomError.BadRequestError('This module has already been deleted!')

  const foundCourse = await courseDaos.findCourseById(foundModule.courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  await moduleDaos.updateModule(moduleId, { isDeleted: true })

  const updateCourseData = {
    $pull: { courseModules: foundModule._id }
  }
  courseDaos.updateCourse(foundCourse._id, updateCourseData)
  return true
}

const getModuleByCourseId = async (courseId) => {
  const foundModule = await moduleDaos.findModules({ filter: courseId })
  return foundModule  
}

export default {
  getAllModulesTitle,
  getModules,
  getModuleDetail,
  searchModule,
  createNewModule,
  updateModule,
  deleteModule,
  getModuleByCourseId
}