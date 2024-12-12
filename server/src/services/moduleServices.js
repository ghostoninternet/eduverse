import mongoose from 'mongoose'
import courseDaos from "../daos/courseDaos.js"
import exerciseDaos from "../daos/exerciseDaos.js"
import moduleDaos from "../daos/moduleDaos.js"
import CustomError from "../errors/customError.js"
import excludeObjectKeys from "../utils/excludeObjectKeys.js"

const getModules = async (instructorId, limit = 10, page = 1) => {
  let foundModules = await moduleDaos.findModuleByInstructor(instructorId, limit, page)
  const totalModules = await moduleDaos.countNumberOfModule({ moduleInstructor: instructorId })
  const totalPages = Math.ceil(totalModules / limit)

  foundModules = foundModules.map(async (foundModule) => {
    const foundCourse = await courseDaos.findCourseById(foundModule.courseId)
    let moduleInfo = {
      ...foundModule,
      courseId: 'None'
    }

    if (foundCourse) {
      moduleInfo.courseId = foundCourse.courseTitle
    }

    return excludeObjectKeys(moduleInfo, [
      'moduleInstructor',
      'moduleVideoLessons',
      'moduleExercises',
      'updatedAt'
    ])
  })

  return {
    data: foundModules,
    pagination: {
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
  let moduleInfo = {
    ...foundModule,
    courseId: 'None'
  }

  if (foundModule) {
    moduleInfo.courseId = foundCourse.courseTitle
  }

  return excludeObjectKeys(moduleInfo, ['moduleInstructor'])
}

const searchModule = async (query, limit, page) => {
  let filter = {
    $text: { $search: query },
  }

  let foundModules = await moduleDaos.findModules(filter, limit, page)
  const totalModules = await moduleDaos.countNumberOfModule(filter)
  const totalPages = Math.ceil(totalModules / limit)

  foundModules = foundModules.map(async (foundModule) => {
    const foundCourse = await courseDaos.findCourseById(foundModule.courseId)
    let moduleInfo = {
      ...foundModule,
      courseId: 'None'
    }

    if (foundCourse) {
      moduleInfo.courseId = foundCourse.courseTitle
    }

    return excludeObjectKeys(foundModule, [
      'moduleInstructor',
      'moduleVideoLessons',
      'moduleExercises',
      'updatedAt'
    ])
  })

  return {
    data: foundModules,
    pagination: {
      totalPages,
      currentPage: page,
      itemPerPage: limit,
    }
  }
}



const createNewModule = async (instructorId, newModuleData) => {
  const foundCourse = await courseDaos.findCourseById(newModuleData.courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  const newModuleDocument = {
    ...newModuleData,
    moduleInstructor: new mongoose.Types.ObjectId(instructorId),
    courseId: new mongoose.Types.ObjectId(newModuleData.courseId),
  }

  const newModule = await moduleDaos.createNewModule(newModuleDocument)

  const updateCourseData = {
    $push: { courseModules: newModule._id }
  }

  await courseDaos.updateCourse(foundCourse._id, updateCourseData)

  return excludeObjectKeys(newModule, [
    'moduleInstructor',
    'moduleVideoLessons',
    'moduleExercises',
    'updatedAt'
  ])
}

const updateModule = async (moduleId, instructorId, updateModuleData) => {
  const foundModule = await moduleDaos.findModuleById(moduleId)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

  const updateModuleDocument = {
    ...updateModuleData,
    courseId: new mongoose.Types.ObjectId(updateModuleData.courseId),
    moduleInstructor: new mongoose.Types.ObjectId(instructorId),
  }

  const updatedModule = await moduleDaos.updateModule(moduleId, updateModuleDocument)
  return updatedModule
}

const deleteModule = async (moduleId) => {
  const foundModule = await moduleDaos.findModuleById(moduleId)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

  const foundCourse = await courseDaos.findCourseById(foundModule.courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  const updateCourseData = {
    $pull: { courseModules: foundModule._id }
  }

  await courseDaos.updateCourse(foundCourse._id, updateCourseData)
  return true
}

const getModuleByCourseId = async (courseId) => {
  const foundModule = await moduleDaos.findModules({filter : courseId})
  return foundModule
}


export default {
  getModules,
  getModuleDetail,
  searchModule,
  createNewModule,
  updateModule,
  deleteModule,
  getModuleByCourseId
}