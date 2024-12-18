import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import exerciseControllers from '../controllers/exerciseControllers.js'
import authToken from '../middlewares/authToken.js'
import roleAuth from '../middlewares/roleAuth.js'
import { USER_ROLE } from '../constants/user.js'

const exerciseRouter = express.Router()

exerciseRouter.use(authToken)
exerciseRouter.use(roleAuth(USER_ROLE.INSTRUCTOR))
exerciseRouter.get('/instructor/module/:moduleId', asyncHandler(exerciseControllers.getExercises))
exerciseRouter.get('/instructor/:exerciseId', asyncHandler(exerciseControllers.getExerciseDetail))
exerciseRouter.post('/instructor', asyncHandler(exerciseControllers.createNewExercise))
exerciseRouter.put('/instructor/:exerciseId', asyncHandler(exerciseControllers.updateExercise))
exerciseRouter.delete('/instructor/:exerciseId', asyncHandler(exerciseControllers.deleteExercise))

export default exerciseRouter