import dashboardServices from '../services/dashboardServices.js';

const getInstructorStats = async (req, res, next) => {
  const stats = await dashboardServices.getInstructorStats(req.user.userId);
  res.status(200).json({
    message: 'Successfully get instructor stats!',
    data: stats,
  });
};

const getAdminStats = async (req, res, next) => {
  const stats = await dashboardServices.getAdminStats();
  res.status(200).json({
    message: 'Successfully get admin stats!',
    data: stats,
  });
};

const getCourses = async (req, res, next) => {
  const { limit, page } = req.query
  const foundCourses = await dashboardServices.getCourses(limit, page)
  res.status(200).json({
    message: 'Successfully get courses!',
    data: foundCourses,
  })
}

const getCourseDetail = async (req, res, next) => {
  const { courseId } = req.params
  const foundCourse = await dashboardServices.getCourseDetail(courseId)
  res.status(200).json({
    message: 'Successfully get course detail!',
    data: foundCourse,
  })
}

const getModules = async (req, res, next) => {
  const { limit, page } = req.query
  const foundModules = await dashboardServices.getModules(limit, page)
  res.status(200).json({
    message: 'Successfully get modules!',
    data: foundModules,
  })
}

const getExerciseDetail = async (req, res, next) => {
  const { exerciseId } = req.params
  const foundExercise = await dashboardServices.getExerciseDetail(exerciseId)
  res.status(200).json({
    message: 'Successfully get exercise detail!',
    data: foundExercise,
  })
}

const getModuleDetail = async (req, res, next) => {
  const { moduleId } = req.params
  const foundModule = await dashboardServices.getModuleDetail(moduleId)
  res.status(200).json({
    message: 'Successfully get module detail!',
    data: foundModule,
  })
}

const getUsers = async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query; // Lấy thông tin phân trang từ query
  try {
    const result = await dashboardServices.getUsers(parseInt(limit), parseInt(page));
    res.status(200).json({
      message: "Successfully fetched user list!",
      data: result, // Trả dữ liệu từ `getUsers`
    });
  } catch (error) {
    next(error);
  }
};

const getUserDetail = async (req, res, next) => {
  const { userId } = req.params
  const foundUser = await dashboardServices.getUserDetail(userId)
  res.status(200).json({
    message: 'Successfully get users!',
    data: foundUser,
  })
}

const getInstructors = async (req, res, next) => {
  const { limit = 10, page = 1 } = req.query;
  try {
    const foundInstructors = await dashboardServices.getInstructors(parseInt(limit), parseInt(page));
    res.status(200).json({
      message: "Successfully get instructors!",
      data: foundInstructors,
    });
  } catch (error) {
    next(error);
  }
};

const getInstructorDetail = async (req, res, next) => {
  const { instructorId } = req.params
  const foundInstructor = await dashboardServices.getInstructorDetail(instructorId)
  res.status(200).json({
    message: 'Successfully get instructor detail!',
    data: foundInstructor,
  })
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
