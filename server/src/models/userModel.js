import mongoose from "mongoose";
import { USER_GENDER, USER_ROLE } from "../constants/user.js";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true
  },
  password: {
    type: String, 
    required: true
  },
  gender: {
    type: String,
    enum: [USER_GENDER.MALE, USER_GENDER.FEMALE],
    default: USER_GENDER.MALE,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    default: "",
  },
  organization: {
    type: String,
    default: "",
  },
  enrolledCourses: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'EnrolledCourses'
  },
  preferences: {
    type: {
      theme: String,
      language: String,
    },
    default: {
      theme: "light",
      language: "english"
    }
  },
  role: {
    type: String,
    enum: [USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.INSTRUCTOR],
    default: USER_ROLE.USER,
  }
}, {
  timestamps: true
});

const Users = mongoose.model("Users", userSchema);

export default Users;
