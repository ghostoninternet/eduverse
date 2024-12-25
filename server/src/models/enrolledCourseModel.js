import mongoose from "mongoose";
import Exercises from "./exerciseModel.js";
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
        videoUrl: String,
        videoLength: Number,
        isFinish: Boolean,
      }],
      moduleExerciseProgress: [{
        exerciseName: String,
        exerciseDuration: Number,
        exerciseId: mongoose.Schema.Types.ObjectId,
        userScore: Number,
        hasPassed: Boolean,
        previousSubmitDate: {
          type: Date,
          default: null,
        }
      }],
      moduleTitle: String,
      moduleDescription: String,
      moduleVideoLessons: [{
        videoTitle: String,
        videoUrl: String,
        videoLength: Number,
      }],
      moduleExercises: [{
        exerciseModule: mongoose.Schema.Types.ObjectId,
        exerciseName: String,
        exerciseQuizes: [{
          question: String,
          choices: [String],
          answer: String,
        }],
        exercisePassScore: Number,
        exerciseDuration: Number,
        isDeleted: Boolean,
      }],
    }],
    required: true,
    ref: 'Modules',
  },
}, {
  timestamps: true,
});

const EnrolledCourses = mongoose.model("EnrolledCourses", enrolledCourseSchema);

export default EnrolledCourses;
