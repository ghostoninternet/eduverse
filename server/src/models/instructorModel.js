const mongoose = require('mongoose')

const instructorModel = new mongoose.Schema({
  instructorName: {
    type: String,
    required: true,
  },
  instructorEmail: {
    type: String,
    required: true,
  },
  instructorPassword: {
    type: String,
    required: true,
  },
  instructorGender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  instructorAvatar: {
    type: String,
    required: true,
  },
  instructorJobTitle: {
    type: String,
    required: true,
  },
  instructorOrganization: {
    type: String,
    required: true,
  },
  instructorLocation: {
    type: String,
    required: true,
  },
  instructorCourse: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
}, {
  timestamps: true,
})

module.exports = mongoose.model('Instructors', instructorModel)
