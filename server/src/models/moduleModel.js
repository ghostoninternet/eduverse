import mongoose from "mongoose";
const { Schema } = mongoose;

const moduleSchema = new Schema({
  moduleTitle: {
    type: String,
    required: true,
  },
  moduleDescription: {
    type: String,
    required: true,
  },
  moduleVideoLessons: {
    type: [mongoose.Schema.Types.String],
    required: true
  },
  moduleExercises: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
}, {
  timestamps: true
});

const Modules = mongoose.model("Modules", moduleSchema);

export default Modules;
