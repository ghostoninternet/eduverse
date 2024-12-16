import mongoose from "mongoose"
import CustomError from "../errors/customError.js"
import userDaos from "../daos/userDaos.js"
import courseDaos from "../daos/courseDaos.js"
import moduleDaos from "../daos/moduleDaos.js"
import exerciseDaos from "../daos/exerciseDaos.js"
import enrolledCourseDaos from "../daos/enrolledCourseDaos.js"
import excludeObjectKeys from "../utils/excludeObjectKeys.js"
import formatValue from '../utils/formatValue.js'
const getEnrolledCourseDetail = async (userId, courseId) => {
  let enrolledCourse = await enrolledCourseDaos.findEnrolledCourse(
    {
      userId: userId,
      courseId: courseId
    }
  )
  if (!enrolledCourse) throw new CustomError.NotFoundError("No enrolled course found!")

  for (let i = 0; i < enrolledCourse.courseModulesProgress.length; i++) {
    let foundModule = await moduleDaos.findModuleById(enrolledCourse.courseModulesProgress[i].moduleId)
    if (!foundModule) throw new CustomError.NotFoundError("No module found!")
    foundModule = excludeObjectKeys(foundModule, [
      '_id',
      '__v',
      'courseId',
      'moduleInstructor',
      'createdAt',
      'updatedAt',
    ])

    let exercises = []
    for (let j = 0; j < foundModule.moduleExercises.length; j++) {
      let foundExercise = await exerciseDaos.findExerciseById(foundModule.moduleExercises[j])
      if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")
      foundExercise = excludeObjectKeys(foundExercise, [
        'exerciseInstructor',
        'createdAt',
        'updatedAt',
      ])
      exercises.push(foundExercise)
      enrolledCourse.courseModulesProgress[i].moduleExerciseProgress[j].exerciseName = foundExercise.exerciseName
      enrolledCourse.courseModulesProgress[i].moduleExerciseProgress[j].exerciseDuration = foundExercise.exerciseDuration
    }

    foundModule.moduleExercises = exercises

    enrolledCourse.courseModulesProgress[i] = {
      ...enrolledCourse.courseModulesProgress[i],
      ...foundModule
    }
  }
  let course = await courseDaos.findCourseById(enrolledCourse.courseId)
  let instructor = await userDaos.findOneUser(course.courseInstructor)
  enrolledCourse = {
    ...enrolledCourse,
    courseTitle : course.courseTitle,
    courseDescription :  course.courseDescription,
    courseRatingAvg: formatValue(course.courseRatingAvg),
    courseInstuctor: {
      username: instructor.username,
      location: instructor.location,
      jobTitle: instructor.jobTitle,
      organization: instructor.organization,
      email: instructor.email,
      avatarUrl: instructor.avatarUrl
    },
    courseReviewCount: course.courseReviewCount,
    courseLearnerCount: course.courseLearnerCount,
  }
  return enrolledCourse
}

const createNewEnrolledCourse = async (userId, courseId) => {
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  let enrolledCourseDocument = {
    courseId: courseId,
    userId: userId,
    courseProgress: 0,
  }

  let courseEstimateDeadline = 0
  let videoLengths = 0
  let exerciseLengths = 0
  let courseModulesProgress = []
  for (let i = 0; i < foundCourse.courseModules.length; i++) {
    let foundModule = await moduleDaos.findModuleById(foundCourse.courseModules[i])
    if (!foundModule) throw new CustomError.NotFoundError("No module found!")

    videoLengths = foundModule.moduleVideoLessons.reduce((prev, curr) => {
      return prev + curr.videoLength
    }, 0)

    for (let j = 0; j < foundModule.moduleExercises.length; i++) {
      let foundExercise = await exerciseDaos.findExerciseById(foundModule.moduleExercises[i])
      if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")

      exerciseLengths += foundExercise.exerciseDuration
    }

    let moduleProgress = {
      moduleId: foundCourse.courseModules[i],
      isFinish: false,
      moduleVideoProgress: foundModule.moduleVideoLessons.map(moduleVideo => {
        return {
          videoTitle: moduleVideo.videoTitle,
          isFinish: false
        }
      }),
      moduleExerciseProgress: foundModule.moduleExercises.map(moduleExercise => {
        return {
          exerciseId: moduleExercise,
          userScore: 0,
          hasPassed: false,
          previousSubmitDate: null,
        }
      })
    }
    courseModulesProgress.push(moduleProgress)
  }
  courseEstimateDeadline += videoLengths + exerciseLengths
  const bonusTime = foundCourse.courseModules.length * 7 * 24 * 60 * 60 * 1000
  courseEstimateDeadline = new Date((new Date().getTime() + courseEstimateDeadline + bonusTime))
  
  enrolledCourseDocument = {
    ...enrolledCourseDocument,
    courseEstimateDeadline,
    courseModulesProgress,
  }

  const newEnrolledCourse = await enrolledCourseDaos.createNewEnrolledCourse(enrolledCourseDocument)
  return newEnrolledCourse
}

// updateData: { 
//   moduleId,
//   videoTitle,
// }
const updateEnrolledCourseVideoProgress = async (userId, courseId, updateData) => {
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  const foundModule = await moduleDaos.findModuleById(updateData.moduleId)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

  let foundEnrolledCourse = await enrolledCourseDaos.findEnrolledCourse({
    userId: userId,
    courseId: courseId
  })
  if (!foundEnrolledCourse) throw new CustomError.NotFoundError("No enrolled course found!")

  foundEnrolledCourse.courseModulesProgress = foundEnrolledCourse.courseModulesProgress.map(moduleProgress => {
    if (moduleProgress.moduleId == updateData.moduleId) {
      moduleProgress.moduleVideoProgress = moduleProgress.moduleVideoProgress.map(videoProgress => {
        if (videoProgress.videoTitle == updateData.videoTitle) {
          videoProgress.isFinish = true
        }
        return videoProgress
      })
    }
    return moduleProgress
  })

  let totalVideosAndExercises = 0
  let totalFinishedVideosAndExercises = 0
  
  for (let i = 0; i < foundEnrolledCourse.courseModulesProgress.length; i++) {
    for (let j = 0; j < foundEnrolledCourse.courseModulesProgress[i].moduleVideoProgress.length; j++) {
      if (foundEnrolledCourse.courseModulesProgress[i].moduleVideoProgress[j].isFinish) {
        totalFinishedVideosAndExercises += 1
      }
      totalVideosAndExercises += 1
    }
    for (let k = 0; k < foundEnrolledCourse.courseModulesProgress[i].moduleExerciseProgress.length; k++) {
      if (foundEnrolledCourse.courseModulesProgress[i].moduleExerciseProgress[k].hasPassed) {
        totalFinishedVideosAndExercises += 1
      }
      totalVideosAndExercises += 1
    }
    let hasFinishedAllVideos = foundEnrolledCourse.courseModulesProgress[i].moduleVideoProgress.find(videoProgress => {
      if (!videoProgress.isFinish) return true
      return false
    })
    let hasFinishedAllExercises = foundEnrolledCourse.courseModulesProgress[i].moduleExerciseProgress.find(exerciseProgress => {
      if (!exerciseProgress.hasPassed) return true
      return false
    })

    if (hasFinishedAllVideos && hasFinishedAllExercises) {
      foundEnrolledCourse.courseModulesProgress[i].isFinish = true
    }
  }

  foundEnrolledCourse.courseProgress = Math.round((totalFinishedVideosAndExercises / totalVideosAndExercises) * 100)

  const updatedEnrolledCourse = await enrolledCourseDaos.updateEnrolledCourse(userId, courseId, foundEnrolledCourse)
  return excludeObjectKeys(updatedEnrolledCourse, [
    'courseId',
    'userId',
    'courseEstimateDeadline',
    'createdAt',
    'updatedAt'
  ])
}

// updateData: { 
//   moduleId,
//   exerciseId,
//   userScore,
//   hasPassed,
// }
const updateEnrolledCourseExerciseProgress = async (userId, courseId, updateData) => {
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")

  const foundModule = await moduleDaos.findModuleById(updateData.moduleId)
  if (!foundModule) throw new CustomError.NotFoundError("No module found!")

  const foundExercise = await exerciseDaos.findExerciseById(updateData.exerciseId)
  if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!")

  let foundEnrolledCourse = await enrolledCourseDaos.findEnrolledCourse({
    userId: userId,
    courseId: courseId
  })
  if (!foundEnrolledCourse) throw new CustomError.NotFoundError("No enrolled course found!")

  foundEnrolledCourse.courseModulesProgress = foundEnrolledCourse.courseModulesProgress.map(moduleProgress => {
    if (moduleProgress.moduleId.equals(updateData.moduleId)) {
      moduleProgress.moduleExerciseProgress = moduleProgress.moduleExerciseProgress.map(exerciseProgress => {
        if (exerciseProgress.exerciseId.equals(updateData.exerciseId)) {
          exerciseProgress.userScore = updateData.userScore
          exerciseProgress.hasPassed = updateData.hasPassed
          exerciseProgress.previousSubmitDate = new Date()
        }
        return exerciseProgress
      })
    }
    return moduleProgress
  })

  let totalVideosAndExercises = 0
  let totalFinishedVideosAndExercises = 0
  
  for (let i = 0; i < foundEnrolledCourse.courseModulesProgress.length; i++) {
    for (let j = 0; j < foundEnrolledCourse.courseModulesProgress[i].moduleVideoProgress.length; j++) {
      if (foundEnrolledCourse.courseModulesProgress[i].moduleVideoProgress[j].isFinish) {
        totalFinishedVideosAndExercises += 1
      }
      totalVideosAndExercises += 1
    }
    for (let k = 0; k < foundEnrolledCourse.courseModulesProgress[i].moduleExerciseProgress.length; k++) {
      if (foundEnrolledCourse.courseModulesProgress[i].moduleExerciseProgress[k].hasPassed) {
        totalFinishedVideosAndExercises += 1
      }
      totalVideosAndExercises += 1
    }
    let hasFinishedAllVideos = foundEnrolledCourse.courseModulesProgress[i].moduleVideoProgress.find(videoProgress => {
      if (!videoProgress.isFinish) return true
      return false
    })
    let hasFinishedAllExercises = foundEnrolledCourse.courseModulesProgress[i].moduleExerciseProgress.find(exerciseProgress => {
      if (!exerciseProgress.hasPassed) return true
      return false
    })

    if (hasFinishedAllVideos && hasFinishedAllExercises) {
      foundEnrolledCourse.courseModulesProgress[i].isFinish = true
    }
  }

  foundEnrolledCourse.courseProgress = Math.round((totalFinishedVideosAndExercises / totalVideosAndExercises) * 100)

  const updatedEnrolledCourse = await enrolledCourseDaos.updateEnrolledCourse(userId, courseId, foundEnrolledCourse)
  return excludeObjectKeys(updatedEnrolledCourse, [
    'courseId',
    'userId',
    'courseEstimateDeadline',
    'createdAt',
    'updatedAt'
  ])
}

const deleteEnrolledCourse = async (userId, courseId) => {
  const foundUserWithEnrolledCourse = await userDaos.findOneUser({
    _id: userId,
    enrolledCourses: new mongoose.Types.ObjectId(courseId)
  })
  if (!foundUserWithEnrolledCourse) throw new CustomError.NotFoundError("User hasn't enrolled this course yet!")

  const foundEnrolledCourse = await enrolledCourseDaos.deleteEnrolledCourse({
    userId: userId,
    courseId: courseId,
  })
  if (!foundEnrolledCourse) throw new CustomError.NotFoundError("No enrolled course found!")

  await enrolledCourseDaos.deleteEnrolledCourse({
    userId: userId,
    courseId: courseId,
  })

  const updateUserData = {
    $pull: { enrolledCourses: courseId }
  }

  await userDaos.updateUser(userId, updateUserData)

  return true
}

const getCompletedEnrolledCourses = async(userId) => {
  const response = await enrolledCourseDaos.getCompletedEnrolledCourses(userId)
  return response
}

const getInProgressEnrolledCourses = async(userId) => {
  const response = await enrolledCourseDaos.getInProgressEnrolledCourses(userId)
  return response
}
export default {
  getEnrolledCourseDetail,
  createNewEnrolledCourse,
  updateEnrolledCourseVideoProgress,
  updateEnrolledCourseExerciseProgress,
  deleteEnrolledCourse,
  getCompletedEnrolledCourses,
  getInProgressEnrolledCourses
}