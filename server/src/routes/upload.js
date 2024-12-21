import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import uploadControllers from '../controllers/uploadControllers.js'
import uploadHandler from '../middlewares/uploadHandler.js'
const uploadRouter = express.Router()

uploadRouter.post('/image', uploadHandler.uploadImage.single('image'), asyncHandler(uploadControllers.uploadImage))
uploadRouter.post('/video', uploadHandler.uploadVideo.single('video'), asyncHandler(uploadControllers.uploadVideo))

export default uploadRouter
