import mongoose from 'mongoose';
import Users from '../models/userModel.js';
import Courses from '../models/courseModel.js';
import { USER_ROLE } from '../constants/user.js';

const instructorStats = {
  async getTotalCourses(instructorId) {
    return await Courses.countDocuments({
      courseInstructor: new mongoose.Types.ObjectId(instructorId)
    });
  },

  async getTotalLearners(instructorId) {
    const courses = await Courses.find({
      courseInstructor: new mongoose.Types.ObjectId(instructorId)
    });
    return courses.reduce((acc, curr) => acc + curr.courseLearnerCount, 0);
  },

  async getMonthlyLearners(instructorId, year) {
    return await Courses.aggregate([
      {
        $match: {
          courseInstructor: new mongoose.Types.ObjectId(instructorId)
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalLearners: { $sum: "$courseLearnerCount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
  },

  async getCoursesByLearners(instructorId) {
    return await Courses.find({
      courseInstructor: new mongoose.Types.ObjectId(instructorId)
    })
    .select('courseTitle courseLearnerCount')
    .sort({ courseLearnerCount: -1 });
  },

  async getCoursesByRating(instructorId) {
    return await Courses.find({
      courseInstructor: new mongoose.Types.ObjectId(instructorId)
    })
    .select('courseTitle courseRatingAvg')
    .sort({ courseRatingAvg: -1 });
  }
};

const adminStats = {
  async getUsersAndInstructorsCount() {
    const users = await Users.countDocuments({ role: USER_ROLE.USER });
    const instructors = await Users.countDocuments({ role: USER_ROLE.INSTRUCTOR });
    return { users, instructors };
  },

  async getMonthlyStats(year) {
    return await Users.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            role: "$role"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.month": 1 }
      }
    ]);
  },

  async getTopCoursesByLearners() {
    return await Courses.find()
      .select('courseTitle courseLearnerCount')
      .sort({ courseLearnerCount: -1 })
      .limit(10);
  },

  async getTopCoursesByRating() {
    return await Courses.find()
      .select('courseTitle courseRatingAvg')
      .sort({ courseRatingAvg: -1 })
      .limit(10);
  }
};

export default { instructorStats, adminStats };