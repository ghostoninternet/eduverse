import express from 'express'
import authControllers from '../controllers/authControllers.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import authToken from '../middlewares/authToken.js'

const authRouter = express.Router()

authRouter.post('/register', asyncHandler(authControllers.register))
authRouter.post('/login', asyncHandler(authControllers.login))
authRouter.post('/refresh-token', asyncHandler(authControllers.refreshToken))

authRouter.use(authToken)
authRouter.post('/logout',asyncHandler(authControllers.logout))
authRouter.get("/user", asyncHandler(authControllers.getUser))

export default authRouter