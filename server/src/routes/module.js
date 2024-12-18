import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import moduleControllers from '../controllers/moduleControllers.js'
import authToken from '../middlewares/authToken.js'
import roleAuth from '../middlewares/roleAuth.js'
import { USER_ROLE } from '../constants/user.js'

const moduleRouter = express.Router()

moduleRouter.use(authToken)
moduleRouter.use(roleAuth(USER_ROLE.INSTRUCTOR))
moduleRouter.get('/instructor/all-modules', asyncHandler(moduleControllers.getAllModulesTitle))
moduleRouter.get('/instructor', asyncHandler(moduleControllers.getModules))
moduleRouter.get('/instructor/search', asyncHandler(moduleControllers.searchModule))
moduleRouter.get('/instructor/:moduleId', asyncHandler(moduleControllers.getModuleDetail))
moduleRouter.post('/instructor', asyncHandler(moduleControllers.createNewModule))
moduleRouter.put('/instructor/:moduleId', asyncHandler(moduleControllers.updateModule))
moduleRouter.delete('/instructor/:moduleId', asyncHandler(moduleControllers.deleteModule))
moduleRouter.get('/:courseId', asyncHandler(moduleControllers.getModuleByCourseId))

export default moduleRouter