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
    coursesByRating: coursesByRating.map(course => ({
      title: course.courseTitle,
      rating: course.courseRatingAvg,
    })),
    coursesByLearners: coursesByLearners.map(course => ({
      title: course.courseTitle,
      learners: course.courseLearnerCount,
    })),
    monthlyLearners: monthlyLearners.map(month => ({
      month: month._id,
      count: month.totalLearners,
    }))
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
  const foundCourses = await courseDaos.findCourses({}, limit, page);

  // Lấy tất cả categoryId từ tất cả các khóa học
  const categoryIds = foundCourses.flatMap((course) => course.courseCategory);

  // Tìm tất cả danh mục trong một lần truy vấn
  const foundCategories = await categoryDaos.findAllCategories(categoryIds);

  // Tạo một map để tra cứu danh mục theo id
  const categoryMap = new Map();
  foundCategories.forEach((category) => {
    categoryMap.set(category._id.toString(), category.categoryName);
  });

  // Xử lý dữ liệu khóa học
  const transformedCourses = foundCourses.map((course) => {
    const categories = course.courseCategory.map(
      (categoryId) => categoryMap.get(categoryId.toString()) || "Unknown"
    );

    return {
      ...excludeObjectKeys(course, [
        "courseDescription",
        "courseInstructor",
        "courseImgUrl",
        "courseModules",
        "updatedAt",
        "__v",
      ]),
      courseCategory: categories,
    };
  });

  const totalCourses = await courseDaos.countNumberOfCourses({});
  const totalPages = Math.ceil(totalCourses / limit);

  return {
    data: transformedCourses,
    pagination: {
      totalPages,
      currentPage: page,
      limitPerPage: limit,
      totalCourses,
    },
  };
};



const getCourseDetail = async (courseId) => {
  // Tìm khóa học theo ID
  const foundCourse = await courseDaos.findCourseById(courseId);
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!");

  // Lấy thông tin danh mục (category)
  const categories = [];
  for (let i = 0; i < foundCourse.courseCategory.length; i++) {
    const foundCategory = await categoryDaos.findCategoryById(foundCourse.courseCategory[i]);
    if (foundCategory) {
      categories.push(foundCategory.categoryName);
    }
  }

  // Lấy thông tin instructor
  const foundInstructor = await userDaos.findOneUser({ _id: foundCourse.courseInstructor });
  const instructorInfo = foundInstructor
    ? {
        id: foundInstructor._id,
        name: foundInstructor.username,
        email: foundInstructor.email,
        avatarUrl: foundInstructor.avatarUrl,
      }
    : null;

  // Lấy danh sách module
  const modules = [];
  for (let i = 0; i < foundCourse.courseModules.length; i++) {
    const foundModule = await moduleDaos.findModuleById(foundCourse.courseModules[i]);
    if (foundModule) {
      modules.push({
        id: foundModule._id,
        title: foundModule.moduleTitle,
        description: foundModule.moduleDescription,
        totalLessons: foundModule.moduleVideoLessons.length,
      });
    }
  }

  // Chuẩn bị dữ liệu khóa học
  const courseDetail = {
    id: foundCourse._id,
    title: foundCourse.courseTitle,
    slug: foundCourse.courseSlug,
    description: foundCourse.courseDescription,
    price: foundCourse.coursePrice,
    status: foundCourse.courseStatus,
    category: categories,
    instructor: instructorInfo,
    modules: modules,
    rating: foundCourse.courseRatingAvg,
    totalReviews: foundCourse.courseReviewCount,
    totalLearners: foundCourse.courseLearnerCount,
    createdAt: foundCourse.createdAt,
    updatedAt: foundCourse.updatedAt,
  };

  return courseDetail;
};


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
  const foundUsers = await userDaos.findUsers({ role: USER_ROLE.USER }, limit, page);
  const transformedUsers = foundUsers.map(user => ({
    id: user._id,
    name: user.username,
    email: user.email,
  }));
  const totalUsers = await userDaos.countTotalOfUsers({ role: USER_ROLE.USER });
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    users: transformedUsers,
    pagination: {
      totalUsers,
      totalPages,
      currentPage: page,
      limitPerPage: limit,
    },
  };
};

const getUserDetail = async (userId) => {
  const foundUser = await userDaos.findOneUser({ _id: new mongoose.Types.ObjectId(userId) })
  if (!foundUser) throw new CustomError.NotFoundError('User not found!')
  return excludeObjectKeys(foundUser, ['password', '__v', 'createdAt', 'updatedAt'])
}

const getInstructors = async (limit, page) => {
  const foundUsers = await userDaos.findUsers({ role: USER_ROLE.INSTRUCTOR }, limit, page);
  const transformedUsers = foundUsers.map(user => ({
    id: user._id,
    name: user.username,
    email: user.email,
  }));
  const totalUsers = await userDaos.countTotalOfUsers({ role: USER_ROLE.INSTRUCTOR });
  const totalPages = Math.ceil(totalUsers / limit);

  return {
    data: transformedUsers,
    pagination: {
      totalUsers,
      totalPages,
      limitPerPage: limit,
      currentPage: page,
    }
  }
}

const getInstructorDetail = async (userId) => {
  const foundUser = await userDaos.findOneUser({ _id: new mongoose.Types.ObjectId(userId) })
  if (!foundUser) throw new CustomError.NotFoundError('User not found!')
  const courses = await courseDaos.findCourses({ courseInstructor: userId });
  const totalLearners = courses.reduce((acc, course) => acc + (course.courseLearnerCount || 0), 0);
  const totalCourses = await courseDaos.countNumberOfCourses({ courseInstructor: userId });
  return {
    ...excludeObjectKeys(foundUser, ['password', '__v', 'createdAt', 'updatedAt']), 
    totalCourses,
    totalLearners,
  };
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