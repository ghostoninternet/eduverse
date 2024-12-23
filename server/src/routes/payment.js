import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import paymentControllers from '../controllers/paymentControllers.js'
import authToken from '../middlewares/authToken.js'
const paymentRouter = express.Router()

paymentRouter.post('/webhook', asyncHandler(paymentControllers.handleStripeWebhook))
paymentRouter.use(authToken)
paymentRouter.post('/:courseId', asyncHandler(paymentControllers.createCheckoutSession))

export default paymentRouter
