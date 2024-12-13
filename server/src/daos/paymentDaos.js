import CustomError from "../errors/customError.js"
import paymentModel from "../models/paymentModel.js"

const createNewPayment = async (data) => {
  return await paymentModel.create(data)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

export default {
  createNewPayment
}
