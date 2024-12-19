import express from 'express'
import userControllers from '../controllers/userControllers.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import authToken from '../middlewares/authToken.js'
const userRouter = express.Router()

userRouter.use(authToken)
userRouter.get('/', asyncHandler(userControllers.getUser))
userRouter.patch('/:id',asyncHandler(userControllers.updateUser))

export default userRouter
