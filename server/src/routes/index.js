import express from 'express'
import authRouter from './auth.js'
import courseRouter from './course.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/courses', courseRouter)

export default router