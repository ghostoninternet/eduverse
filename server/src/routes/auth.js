import express from 'express'
import authControllers from '../controllers/authControllers.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const authRouter = express.Router()

authRouter.post('/register', asyncHandler(authControllers.register))

export default authRouter