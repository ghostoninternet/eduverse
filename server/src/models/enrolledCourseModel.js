import mongoose from "mongoose";
const { Schema } = mongoose;

const enrolledCourseSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Courses'
  },
  courseProgress: {
    type: Number,
    default: 0
  },
  courseEstimateDeadline: {
    type: Date,
    required: true
  },
}, {
  timestamps: true
});

const EnrolledCourses = mongoose.model("EnrolledCourses", enrolledCourseSchema);

export default EnrolledCourses;
