import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import exerciseControllers from '../controllers/exerciseControllers.js'

const exerciseRouter = express.Router()

exerciseRouter.get('/instructor', asyncHandler(exerciseControllers.getExercises))
exerciseRouter.get('/instructor/:exerciseId', asyncHandler(exerciseControllers.getExerciseDetail))
exerciseRouter.get('/instructor/search', asyncHandler(exerciseControllers.searchExercise))
exerciseRouter.post('/instructor', asyncHandler(exerciseControllers.createNewExercise))
exerciseRouter.put('/instructor/:exerciseId', asyncHandler(exerciseControllers.updateExercise))
exerciseRouter.delete('/instructor/:exerciseId', asyncHandler(exerciseControllers.deleteExercise))

export default exerciseRouter