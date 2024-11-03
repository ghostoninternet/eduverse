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
  courseModulesProgress: {
    type: [{
      moduleId: mongoose.Schema.Types.ObjectId,
      isFinish: Boolean,
      moduleVideoProgress: [{
        videoTitle: String,
        isFinish: Boolean,
      }],
      moduleExerciseProgress: [{
        exerciseId: mongoose.Schema.Types.ObjectId,
        userScore: Number,
        hasPassed: Boolean,
      }]
    }],
    required: true,
    ref: 'Modules'
  },
}, {
  timestamps: true
});

const EnrolledCourses = mongoose.model("EnrolledCourses", enrolledCourseSchema);

export default EnrolledCourses;
