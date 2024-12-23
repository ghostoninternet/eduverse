import paymentServices from "../services/paymentServices.js"

const createCheckoutSession = async (req, res, next) => {
  const checkoutSession = await paymentServices.createCheckoutSession(req.user.userId, req.params.courseId)
  res.status(200).json(checkoutSession)
}

const handleStripeWebhook = async (req, res, next) => {
  const handleResult = await paymentServices.handleStripeWebhook(req)
  res.status(200).json(handleResult).end()
}

export default {
  createCheckoutSession,
  handleStripeWebhook
}
