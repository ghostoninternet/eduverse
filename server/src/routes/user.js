import express from 'express'
import userControllers from '../controllers/userControllers.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import authToken from '../middlewares/authToken.js'
const userRouter = express.Router()
// authRouter.use(authToken)
userRouter.patch('/:id',asyncHandler(userControllers.updateUser))

export default userRouter
