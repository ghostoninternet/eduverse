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
      const moduleExercises = await Promise.all(
        foundModule.moduleExercises.map(async (exerciseId) => {
          const exercise = await exerciseDaos.findOneExercise({ _id: exerciseId });
          return {
            id: exercise._id,
            exerciseName: exercise.exerciseName,
            exerciseDuration: exercise.exerciseDuration,
          };
        })
      );

      modules.push({
        id: foundModule._id,
        title: foundModule.moduleTitle,
        moduleDescription: foundModule.moduleDescription,
        moduleVideoLessons: foundModule.moduleVideoLessons.map((lesson) => ({
          videoTitle: lesson.videoTitle,
          videoUrl: lesson.videoUrl,
        })),
        moduleExercises,
      });
    }
  }
  const reviews = [];
  if (foundCourse.courseReviews && Array.isArray(foundCourse.courseReviews[i])) {
    for (let reviewId of foundCourse.courseReviews) {
      const review = await reviewDaos.findCourseReviewById(reviewId);
      if (review) {
        reviews.push({
          id: review._id,
          reviewContent: review.reviewContent,
          ratingStar: review.ratingStar,
          userId: review.userId,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        });
    }
  }
  }
  const courseDetail = {
    id: foundCourse._id,
    courseImgUrl: foundCourse.courseImgUrl,
    title: foundCourse.courseTitle,
    slug: foundCourse.courseSlug,
    description: foundCourse.courseDescription,
    price: foundCourse.coursePrice,
    status: foundCourse.courseStatus,
    category: categories,
    instructor: instructorInfo,
    modules: modules,
    reviews: reviews,
    rating: foundCourse.courseRatingAvg,
    totalReviews: foundCourse.courseReviewCount,
    totalLearners: foundCourse.courseLearnerCount,
    createdAt: foundCourse.createdAt,
    updatedAt: foundCourse.updatedAt,
  };

  return courseDetail;
};



const getModules = async (limit, page) => {
  const foundModules = await moduleDaos.findModules({}, limit, page);
  const totalModules = await moduleDaos.countNumberOfModule();
  const totalPages = Math.ceil(totalModules / limit);

  const transformedModules = [];
  for (const module of foundModules) {
    const course = await courseDaos.findCourseById(module.courseId);
    const instructor = course
    ? await userDaos.findOneUser({ _id: course.courseInstructor })
    : null;

    transformedModules.push({
      id: module._id,
      moduleTitle: module.moduleTitle,
      moduleDescription: module.moduleDescription,
      courseTitle: course?.courseTitle,
      instructor: instructor
        ? { id: instructor._id, name: instructor.username }
        : { id: null, name: "No Instructor" },
      createdAt: module.createdAt,
    });
  }

  return {
    data: transformedModules,
    pagination: {
      totalModules,
      totalPages,
      currentPage: page,
      limitPerPage: limit,
    },
  };
};

const getModuleDetail = async (moduleId) => {
  // Tìm module theo ID
  const foundModule = await moduleDaos.findModuleById(moduleId);
  if (!foundModule) throw new CustomError.NotFoundError("Module not found!");

  // Tìm course liên quan đến module
  const course = await courseDaos.findCourseById(foundModule.courseId);

  // Xử lý danh sách exercises
  const moduleExercises = foundModule.moduleExercises
    ? await Promise.all(
        foundModule.moduleExercises.map(async (exerciseId) => {
          const exercise = await exerciseDaos.findExerciseById(exerciseId);
          if (!exercise) return null;
          return {
            id: exercise._id,
            name: exercise.exerciseName,
            duration: exercise.exerciseDuration,
            passScore: exercise.exercisePassScore,
            quizzes: exercise.exerciseQuizes.map((quiz) => ({
              question: quiz.question,
              choices: quiz.choices,
              answer: quiz.answer,
            })),
          };
        })
      )
    : [];

  // Trả về chi tiết module
  return {
    id: foundModule._id,
    title: foundModule.moduleTitle,
    description: foundModule.moduleDescription,
    course: course ? { id: course._id, title: course.courseTitle } : null,
    createdAt: foundModule.createdAt,
    videoLessons: foundModule.moduleVideoLessons,
    exercises: moduleExercises.filter((exercise) => exercise !== null), // Loại bỏ exercises null
  };
};



const getExerciseDetail = async (exerciseId) => {
  // Tìm exercise theo ID
  const foundExercise = await exerciseDaos.findOneExercise({
    _id: new mongoose.Types.ObjectId(exerciseId),
  });
  if (!foundExercise) throw new CustomError.NotFoundError("No exercise found!");

  // Kiểm tra và tìm module nếu tồn tại
  let foundModule = null;
  if (foundExercise.exerciseModule) {
    foundModule = await moduleDaos.findModuleById(foundExercise.exerciseModule);
  }

  // Trả về chi tiết exercise kèm thông tin module
  return {
    id: foundExercise._id,
    name: foundExercise.exerciseName,
    duration: foundExercise.exerciseDuration,
    passScore: foundExercise.exercisePassScore,
    quizzes: foundExercise.exerciseQuizes.map((quiz) => ({
      question: quiz.question,
      choices: quiz.choices,
      answer: quiz.answer,
    })),
    module: foundModule
      ? { id: foundModule._id, title: foundModule.moduleTitle }
      : "Module not found",
  };
};


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