import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import categoryControllers from '../controllers/categoryControllers.js'
const categoryRouter = express.Router()

categoryRouter.get('/', asyncHandler(categoryControllers.getAllCategories))

export default categoryRouter
