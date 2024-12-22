import express from 'express';
import authToken from '../middlewares/authToken.js';
import roleAuth from '../middlewares/roleAuth.js';
import { USER_ROLE } from '../constants/user.js';
import dashboardControllers from '../controllers/dashboardControllers.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const dashboardRouter = express.Router();

dashboardRouter.use(authToken);

dashboardRouter.get(
  '/instructor',
  roleAuth(USER_ROLE.INSTRUCTOR),
  asyncHandler(dashboardControllers.getInstructorStats)
);

dashboardRouter.get(
  '/admin',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getAdminStats)
);

dashboardRouter.get(
  '/admin/courses',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getCourses)
);

dashboardRouter.get(
  '/admin/courses/:courseId',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getCourseDetail)
);

dashboardRouter.get(
  '/admin/modules',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getModules)
);

dashboardRouter.get(
  '/admin/modules/:moduleId',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getModuleDetail)
);

dashboardRouter.get(
  '/admin/exercises/:exerciseId',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getExerciseDetail)
);

dashboardRouter.get(
  '/admin/users',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getUsers)
);

dashboardRouter.get(
  '/admin/users/:userId',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getUserDetail)
);

dashboardRouter.get(
  '/admin/instructors',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getInstructors)
);

dashboardRouter.get(
  '/admin/instructors/:instructorId',
  roleAuth(USER_ROLE.ADMIN),
  asyncHandler(dashboardControllers.getInstructorDetail)
);

export default dashboardRouter;
