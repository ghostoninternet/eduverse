import express from 'express'
import authRouter from './auth.js'
import courseRouter from './course.js'
import reviewRouter from './review.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/courses', courseRouter)
router.use('/review', reviewRouter)

export default router