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
  courseImgUrl: {
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
  courseReviewCount: {
    type: Number,
    default: 0,
  },
  courseRatingAvg: {
    type: Number,
    default: 0,
  },
  courseLearnerCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

courseSchema.index({
  courseTitle: 'text',
  courseDescription: 'text'
})

const Courses = mongoose.model("Courses", courseSchema);

export default Courses;
