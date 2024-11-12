import express from 'express'
import authRouter from './auth.js'
import courseRouter from './course.js'
import reviewRouter from './review.js'
import exerciseRouter from './exercise.js'
import moduleRouter from './module.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/courses', courseRouter)
router.use('/review', reviewRouter)
router.use('/mnodules', moduleRouter)
router.use('/exercises', exerciseRouter)

export default router