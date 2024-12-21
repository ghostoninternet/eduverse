import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import courseControllers from '../controllers/courseControllers.js'
import authToken from '../middlewares/authToken.js'
import roleAuth from '../middlewares/roleAuth.js'
import { USER_ROLE } from '../constants/user.js'
import mongoose from 'mongoose';
const courseRouter = express.Router()


courseRouter.get('/search', asyncHandler(courseControllers.searchCourses))
courseRouter.get('/recommended', asyncHandler(courseControllers.getRecommendedCourses))
courseRouter.get('/free', asyncHandler(courseControllers.getFreeCourses))
courseRouter.get('/popular', asyncHandler(courseControllers.getMostPopularCourses))
courseRouter.get('/detail/:courseId', asyncHandler(courseControllers.getCourseDetail))

courseRouter.use(authToken)
courseRouter.use(roleAuth(USER_ROLE.INSTRUCTOR))
courseRouter.get('/instructor', asyncHandler(courseControllers.getInstructorCourses))
courseRouter.get('/instructor/all-courses', asyncHandler(courseControllers.getAllInstructorCourseTitles))
courseRouter.get('/instructor/search', asyncHandler(courseControllers.searchInstructorCourses))
courseRouter.post('/instructor', asyncHandler(courseControllers.createNewCourse))
courseRouter.get('/instructor/:courseId', async (req, res, next) => {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      // Xử lý trường hợp courseSlug được truyền
      const course = await courseDaos.findCourseBySlug({ courseSlug: courseId });
      if (!course) {
        return res.status(400).json({ error: "Invalid course ID or slug" });
      }
      req.params.courseId = course._id; // Chuyển đổi slug thành ObjectId
    }
    next();
  }, asyncHandler(courseControllers.getInstructorCourseDetail));
courseRouter.put('/instructor/:courseId', asyncHandler(courseControllers.updateCourse))
courseRouter.delete('/instructor/:courseId', asyncHandler(courseControllers.deleteCourse))

export default courseRouter
