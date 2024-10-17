import express from 'express'
import authControllers from '../controllers/authControllers'
import asyncHandler from '../middlewares/asyncHandler'

const router = express.Router()

router('/register', asyncHandler(authControllers.register))

export default authRouter