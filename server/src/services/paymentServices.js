import Stripe from "stripe"
import mongoose from "mongoose"
import ENV from "../configs/index.js"
import courseDaos from "../daos/courseDaos.js"
import CustomError from "../errors/customError.js"
import paymentDaos from "../daos/paymentDaos.js"
import enrolledCourseService from "./enrolledCourseService.js"

const stripe = new Stripe(ENV.STRIPE_API_KEY)
const clientUrl = ENV.CLIENT_URL

const createCheckoutSession = async (userId, courseId) => {
  const foundCourse = await courseDaos.findCourseById(courseId)
  if (!foundCourse) throw new CustomError.NotFoundError("No course found!")
  const amountInCents = Math.round(Number.parseFloat(foundCourse.coursePrice) * 100)

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: amountInCents,
          product_data: {
            name: foundCourse.courseTitle,
            description: foundCourse.courseDescription,
            images: [foundCourse.courseImgUrl],
          }
        },
        quantity: 1,
      }
    ],
    mode: 'payment',
    metadata: {
      courseId: foundCourse._id.toString(),
      userId: userId.toString(),
    },
    success_url: `${clientUrl}/payment?success=true`,
    cancel_url: `${clientUrl}/payment?cancelled=true`,
  })

  return session
}

const handleStripeWebhook = async (request) => {
  try {
    const signature = request.headers['stripe-signature']
    const event = stripe.webhooks.constructEvent(request.body, signature, ENV.STRIPE_WEBHOOK_SECRET)
    if (event.type === "checkout.session.completed") {
      const courseId = event.data.object.metadata?.courseId
      const userId = event.data.object.metadata?.userId
      const foundCourse = await courseDaos.findCourseById(courseId)
      if (!foundCourse) throw new NotFoundError("No course found!")
      const newPayment = {
        userId: new mongoose.Types.ObjectId(userId),
        courseId: new mongoose.Types.ObjectId(courseId),
        paymentPrice: foundCourse.coursePrice,
        paymentType: "CREDIT_CARD",
      }
      await paymentDaos.createNewPayment(newPayment)
      const newEnrolledCourse = await enrolledCourseService.createNewEnrolledCourse(request.userId, courseId)
      return newEnrolledCourse
    }
  } catch (error) {
    console.error(error)
    throw new CustomError.InternalServerError(error.message)
  }
}

export default {
  createCheckoutSession,
  handleStripeWebhook,
}