import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
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
  reviewContent: {
    type: String,
    required: true
  },
  ratingStar: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

const Reviews = mongoose.model("Reviews", reviewSchema);

export default Reviews;
