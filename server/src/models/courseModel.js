import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseInstructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  courseCategory: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Categories',
  },
  coursePrice: {
    type: Number,
    required: true,
  },
  courseModules: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Modules'
  },
  courseReviews: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Reviews'
  },
  courseReviewCount: {
    type: Number,
    default: 0,
  },
  courseRatingAvg: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const Courses = mongoose.model("Courses", courseSchema);

export default Courses;
