import mongoose from "mongoose";
const { Schema } = mongoose;

const exerciseSchema = new Schema({
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
  exerciseUserScore: {
    type: Number,
    required: true 
  },
  exerciseComplete: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

export default Exercises;
