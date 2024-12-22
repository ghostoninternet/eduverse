import mongoose from 'mongoose'
import dashboardDaos from '../daos/dashboardDaos.js';
import courseDaos from '../daos/courseDaos.js';
import moduleDaos from '../daos/moduleDaos.js';
import exerciseDaos from '../daos/exerciseDaos.js';
import categoryDaos from '../daos/categoryDaos.js';
import userDaos from '../daos/userDaos.js';
import CustomError from '../errors/customError.js';
import excludeObjectKeys from '../utils/excludeObjectKeys.js';
import includeObjectKeys from '../utils/includeObjectKeys.js';
import { USER_ROLE } from '../constants/user.js';

const getInstructorStats = async (instructorId) => {
  const [
    totalCourses,
    totalLearners,
    monthlyLearners,
    coursesByLearners,
    coursesByRating
  ] = await Promise.all([
    dashboardDaos.instructorStats.getTotalCourses(instructorId),
    dashboardDaos.instructorStats.getTotalLearners(instructorId),
    dashboardDaos.instructorStats.getMonthlyLearners(instructorId, new Date().getFullYear()),
    dashboardDaos.instructorStats.getCoursesByLearners(instructorId),
    dashboardDaos.instructorStats.getCoursesByRating(instructorId)
  ]);

  return {
    totalCourses,
    totalLearners,
    monthlyLearners,
    coursesByLearners,
    coursesByRating
  };
}

const getAdminStats = async () => {
  const [
    userStats,
    monthlyStats,
    topCoursesByLearners,
    topCoursesByRating
  ] = await Promise.all([
    dashboardDaos.adminStats.getUsersAndInstructorsCount(),
    dashboardDaos.adminStats.getMonthlyStats(new Date().getFullYear()),
    dashboardDaos.adminStats.getTopCoursesByLearners(),
    dashboardDaos.adminStats.getTopCoursesByRating()
  ]);

  return {
    userStats,
    monthlyStats,
    topCoursesByLearners,
    topCoursesByRating
  };
}

const getCourses = async (limit, page) => {
  let foundCourses = await courseDaos.findCourses({}, limit, page)

  const transformedCourses = []
  for (let i = 0; i < foundCourses.length; i++) {
    let categories = []
    for (let j = 0; j < foundCourses[i].courseCategory.length; j++) {
      let foundCategory = await categoryDaos.findCategoryById(foundCourses[i].courseCategory[j])
      if (foundCategory) {
        categories.push(foundCategory.categoryName)
      }
    }
    foundCourses[i].courseCategory = categories

    const transformedCourse = excludeObjectKeys(foundCourses[i], [
      'courseDescription',
      'courseInstructor',
      'courseImgUrl',
      'courseModules',
      'updatedAt',
      '__v',
    ])
    transformedCourses.push(transformedCourse)
  }

  const totalCourses = await courseDaos.countNumberOfCourses({})
  const totalPages = Math.ceil(totalCourses / limit)

  return {
    data: transformedCourses,
    pagination: {
      totalPages: totalPages,
      currentPage: page,
      limitPerPage: limit,
      totalCourses: totalCourses,
    }
  }
}

const getCourseDetail = async (courseId) => {
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  const transformedCourse = foundCourse.toObject()
  const categories = []
  for (let i = 0; i < transformedCourse.courseCategory.length; i++) {
    const foundCategory = await categoryDaos.findCategoryById(transformedCourse.courseCategory[i])
    if (foundCategory) {
      categories.push(foundCategory.categoryName)
    }
  }
  transformedCourse.courseCategory = categories

  let modules = []
  for (let i = 0; i < transformedCourse.courseModules.length; i++) {
    let foundModule = await moduleDaos.findModuleById(transformedCourse.courseModules[i])
    if (foundModule) {
      let moduleExercises = []
      for (let j = 0; j < foundModule.moduleExercises.length; j++) {
        let foundExercise = await exerciseDaos.findExerciseById(foundModule.moduleExercises[j])
        if (foundExercise) {
          moduleExercises.push(includeObjectKeys(foundExercise, [
            '_id',
            'exerciseName',
            'exerciseDuration'
          ]))
        }
      }
      foundModule.moduleExercises = moduleExercises
      modules.push(excludeObjectKeys(foundModule, [
        'courseId',
        'moduleInstructor',
        'createdAt',
        'updatedAt'
      ]))
    }
  }

  transformedCourse.courseModules = modules

  return transformedCourse;
}

const getModules = async (limit, page) => {
  const foundModules = await moduleDaos.findModules({}, limit, page)
  const totalModules = await moduleDaos.countNumberOfModule()
  const totalPages = Math.ceil(totalModules / limit)

  let transformedModules = []
  for (let i = 0; i < foundModules.length; i++) {
    const foundCourse = await courseDaos.findCourseById(foundModules[i].courseId)
    if (!foundCourse) throw new CustomError.NotFoundError('No course found!')

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

  let foundModuleInstructor = await userDaos.findOneUser({
    _id: foundModule.moduleInstructor
  })
  if (!foundModuleInstructor) {
    throw new CustomError.NotFoundError("No instructor for this module found!")
  }
  foundModule.moduleInstructor = {
    username: foundModuleInstructor.username,
    avatarUrl: foundModuleInstructor.avatarUrl,
  }

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
    foundModule.courseId = foundCourse._id
    foundModule.courseTitle = foundCourse.courseTitle
  }

  return foundModule
}

const getExerciseDetail = async (exerciseId) => {
  const foundExercise = await exerciseDaos.findOneExercise({
    _id: new mongoose.Types.ObjectId(exerciseId),
  })
  if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")

  let foundModule = await moduleDaos.findModuleById(foundExercise.exerciseModule)
  foundExercise.exerciseModule = foundModule

  return foundExercise
}

const getUsers = async (limit, page) => {
  const foundUsers = await userDaos.findUsers({ role: USER_ROLE.USER }, limit, page)
  const transformedUsers = foundUsers.map(user => excludeObjectKeys(user, ['password']))
  const totalUsers = await userDaos.countTotalOfUsers({ role: USER_ROLE.USER })
  const totalPages = Math.ceil(totalUsers / limit)

  return {
    data: transformedUsers,
    pagination: {
      totalUsers: totalUsers,
      totalPages: totalPages,
      limitPerPage: limit,
      currentPage: page,
    }
  }
}

const getUserDetail = async (userId) => {
  const foundUser = await userDaos.findOneUser({ _id: new mongoose.Types.ObjectId(userId) })
  if (!foundUser) throw new CustomError.NotFoundError('User not found!')
  return excludeObjectKeys(foundUser, ['password', '__v', 'createdAt', 'updatedAt'])
}

const getInstructors = async (limit, page) => {
  const foundUsers = await userDaos.findUsers({ role: USER_ROLE.INSTRUCTOR }, limit, page)
  const transformedUsers = foundUsers.map(user => excludeObjectKeys(user, ['password']))
  const totalUsers = await userDaos.countTotalOfUsers({ role: USER_ROLE.INSTRUCTOR })
  const totalPages = Math.ceil(totalUsers / limit)

  return {
    data: transformedUsers,
    pagination: {
      totalUsers: totalUsers,
      totalPages: totalPages,
      limitPerPage: limit,
      currentPage: page,
    }
  }
}

const getInstructorDetail = async (userId) => {
  const foundUser = await userDaos.findOneUser({ _id: new mongoose.Types.ObjectId(userId) })
  if (!foundUser) throw new CustomError.NotFoundError('User not found!')
  return excludeObjectKeys(foundUser, ['password', '__v', 'createdAt', 'updatedAt'])
}

export default {
  getInstructorStats,
  getAdminStats,
  getCourses,
  getCourseDetail,
  getModules,
  getExerciseDetail,
  getModuleDetail,
  getUsers,
  getUserDetail,
  getInstructors,
  getInstructorDetail,
};