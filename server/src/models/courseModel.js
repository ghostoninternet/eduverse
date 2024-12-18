import mongoose from "mongoose";
import { COURSE_STATUS } from "../constants/course.js";
const { Schema } = mongoose;

const courseSchema = new Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseSlug: {
    type: String,
    required: true,
  },
  courseInstructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
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
    default: [],
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
  courseStatus: {
    type: String,
    enum: [COURSE_STATUS.PUBLIC, COURSE_STATUS.DRAFT],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

courseSchema.index({
  courseTitle: 'text',
})

const Courses = mongoose.model("Courses", courseSchema);

export default Courses;
