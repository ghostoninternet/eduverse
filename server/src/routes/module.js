import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import moduleControllers from '../controllers/moduleControllers.js'

const moduleRouter = express.Router()

moduleRouter.get('/instructor', asyncHandler(moduleControllers.getModules))
moduleRouter.get('/instructor/:moduleId', asyncHandler(moduleControllers.getModuleDetail))
moduleRouter.get('/instructor/search', asyncHandler(moduleControllers.searchModule))
moduleRouter.post('/instructor', asyncHandler(moduleControllers.createNewModule))
moduleRouter.put('/instructor/:moduleId', asyncHandler(moduleControllers.updateModule))
moduleRouter.delete('/instructor/:moduleId', asyncHandler(moduleControllers.deleteModule))

export default moduleRouter