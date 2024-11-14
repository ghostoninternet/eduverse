import mongoose from "mongoose";
const { Schema } = mongoose;

const enrolledCourseSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Courses'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  courseProgress: {
    type: Number,
    default: 0,
  },
  courseEstimateDeadline: {
    type: Date,
    required: true,
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
        previousSubmitDate: {
          type: Date,
          default: null,
        }
      }]
    }],
    required: true,
    ref: 'Modules',
  },
}, {
  timestamps: true,
});

const EnrolledCourses = mongoose.model("EnrolledCourses", enrolledCourseSchema);

export default EnrolledCourses;
