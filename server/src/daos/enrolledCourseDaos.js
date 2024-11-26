import EnrolledCourses from "../models/enrolledCourseModel.js";
import courseDaos from "./courseDaos.js";

const findEnrolledCourse = async (filter) => {
  return await EnrolledCourses.findOne(filter)
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      throw new CustomError.DatabaseError();
    });
};

const createNewEnrolledCourse = async (newEnrolledCourseData) => {
  return await EnrolledCourses.create(newEnrolledCourseData)
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      throw new CustomError.DatabaseError();
    });
};

const updateEnrolledCourse = async (
  userId,
  courseId,
  updateEnrolledCourseDocument
) => {
  return await EnrolledCourses.findOneAndUpdate(
    {
      userId: userId,
      courseId: courseId,
    },
    updateEnrolledCourseDocument,
    {
      new: true,
    }
  )
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      throw new CustomError.DatabaseError();
    });
};

const deleteEnrolledCourse = async (filter) => {
  return await EnrolledCourses.findOneAndDelete(filter)
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      throw new CustomError.DatabaseError();
    });
};

const getCompletedEnrolledCourses = async (filter) => {
  try {
    const courses = await EnrolledCourses.find({ userId: filter, courseProgress: 100 })
    let data = [];
    for (const course of courses) {
      const result = await courseDaos.findCourseById(course.courseId);
      data.push(result);
    }
    return data
  } catch (error) {
    console.log(error);
  }
  
};

const getInProgressEnrolledCourses = async (filter) => {
  try {
    const courses = await EnrolledCourses.find({ userId: filter, courseProgress: {$lt: 100} })
    let data = [];
    for (const course of courses) {
      const result = await courseDaos.findCourseById(course.courseId);
      data.push(result);
    }
    return data
  } catch (error) {
    console.log(error);
  }
};
export default {
  findEnrolledCourse,
  createNewEnrolledCourse,
  updateEnrolledCourse,
  deleteEnrolledCourse,
  getCompletedEnrolledCourses,
  getInProgressEnrolledCourses
};
