import mongoose from "mongoose";
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  exerciseInstructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Instructors",
  },
  exerciseModule: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Modules",
  },
  exerciseName: {
    type: String,
    required: true,
  },
  exerciseQuizes: {
    type: [{
      question: String,
      choices: [mongoose.Schema.Types.String],
      answer: String,
    }],
    required: true
  },
  exercisePassScore: {
    type: Number,
    required: true,
  },
  exerciseDuration: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

export default Exercises;
