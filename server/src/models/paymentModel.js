import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Courses'
  },
  paymentPrice: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ["FINANCIAL_AID", "CREDIT_CARD"],
    required: true,
  }
}, {
  timestamps: true
});

const Payments = mongoose.model("Payments", paymentSchema);

export default Payments;
