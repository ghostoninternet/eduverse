import express from 'express'
import authRouter from './auth.js'
import courseRouter from './course.js'
import reviewRouter from './review.js'
import exerciseRouter from './exercise.js'
import moduleRouter from './module.js'
import enrolledCourseRouter from './enrolledCourse.js'
import userRouter from './user.js'
import categoryRouter from './category.js'
import uploadRouter from './upload.js'
<<<<<<< HEAD
=======
import paymentRouter from './payment.js'
>>>>>>> 0641170b64c5e5a0fafcd54dc8759daba7a182ae
const router = express.Router()

router.use('/auth', authRouter)
router.use('/courses', courseRouter)
router.use('/review', reviewRouter)
router.use('/modules', moduleRouter)
router.use('/exercises', exerciseRouter)
router.use('/enrolled-courses', enrolledCourseRouter)
router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/upload', uploadRouter)
router.use('/payment', paymentRouter)

export default router
