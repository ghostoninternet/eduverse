import mongoose from 'mongoose';
import Categories from '../models/categoryModel.js';
import Courses from '../models/courseModel.js';
import EnrolledCourses from '../models/enrolledCourseModel.js';
import Exercises from '../models/exerciseModel.js';
import Instructors from '../models/instructorModel.js';
import Modules from '../models/moduleModel.js';
import Payments from '../models/paymentModel.js';
import Reviews from '../models/reviewModel.js';
import Users from '../models/userModel.js';

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Create and save 10 samples for each collection
export default async function generateSampleData() {
  try {
    // Categories
    for (let i = 0; i < 10; i++) {
      await Categories.create({ categoryName: `Category ${i + 1}` });
    }

    // Instructors
    const instructors = [];
    for (let i = 0; i < 10; i++) {
      const instructor = await Instructors.create({
        instructorName: `Instructor ${i + 1}`,
        instructorEmail: `instructor${i + 1}@gmail.com`,
        instructorPassword: `password${i + 1}`,
        instructorGender: getRandomElement(["Male", "Female"]),
        instructorAvatar: `avatar${i + 1}.jpg`,
        instructorJobTitle: `Job Title ${i + 1}`,
        instructorOrganization: `Organization ${i + 1}`,
        instructorLocation: `Location ${i + 1}`,
      });
      instructors.push(instructor._id);
    }

    // Users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = await Users.create({
        username: `User${i + 1}`,
        email: `user${i + 1}@gmail.com`,
        password: `password${i + 1}`,
        gender: getRandomElement(["Male", "Female"]),
        avatarUrl: `avatar${i + 1}.jpg`,
        location: `Location ${i + 1}`,
      });
      users.push(user._id);
    }

    // Courses
    const categories = await Categories.find();
    const courses = [];
    for (let i = 0; i < 10; i++) {
      const course = await Courses.create({
        courseTitle: `Course ${i + 1}`,
        courseInstructor: getRandomElement(instructors),
        courseDescription: `Description for Course ${i + 1}`,
        courseImgUrl: `img${i + 1}.jpg`,
        courseCategory: [getRandomElement(categories)._id],
        coursePrice: Math.floor(Math.random() * 100) + 1,
      });
      courses.push(course._id);
    }

    // Modules
    const modules = [];
    for (let i = 0; i < 10; i++) {
      const module = await Modules.create({
        courseId: getRandomElement(courses),
        moduleInstructor: getRandomElement(instructors),
        moduleTitle: `Module ${i + 1}`,
        moduleDescription: `Description for Module ${i + 1}`,
        moduleVideoLessons: [
          {
            videoTitle: `Lesson ${i + 1}`,
            videoUrl: `video${i + 1}.mp4`,
            videoLength: Math.floor(Math.random() * 60) + 10,
          },
        ],
      });
      modules.push(module._id);
    }

    // Exercises
    for (let i = 0; i < 10; i++) {
      await Exercises.create({
        exerciseInstructor: getRandomElement(instructors),
        exerciseModule: getRandomElement(modules),
        exerciseName: `Exercise ${i + 1}`,
        exerciseQuizes: [
          {
            question: `Question ${i + 1}`,
            choices: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
            answer: 'Choice A',
          },
        ],
        exercisePassScore: 50,
        exerciseDuration: 30,
      });
    }

    // EnrolledCourses
    for (let i = 0; i < 10; i++) {
      await EnrolledCourses.create({
        courseId: getRandomElement(courses),
        userId: getRandomElement(users),
        courseEstimateDeadline: new Date(),
        courseModulesProgress: [
          {
            moduleId: getRandomElement(modules),
            isFinish: Math.random() > 0.5,
            moduleVideoProgress: [
              {
                videoTitle: `Video ${i + 1}`,
                isFinish: Math.random() > 0.5,
              },
            ],
            moduleExerciseProgress: [
              {
                exerciseId: getRandomElement(modules),
                userScore: Math.floor(Math.random() * 100),
                hasPassed: Math.random() > 0.5,
              },
            ],
          },
        ],
      });
    }

    // Payments
    for (let i = 0; i < 10; i++) {
      await Payments.create({
        userId: getRandomElement(users),
        courseId: getRandomElement(courses),
        paymentPrice: Math.floor(Math.random() * 100) + 1,
        paymentType: getRandomElement(["FINANCIAL_AID", "CREDIT_CARD"]),
      });
    }

    // Reviews
    for (let i = 0; i < 10; i++) {
      await Reviews.create({
        userId: getRandomElement(users),
        courseId: getRandomElement(courses),
        reviewContent: `This is a review for Course ${i + 1}`,
        ratingStar: Math.floor(Math.random() * 5) + 1,
      });
    }

    console.log('Sample data generation completed!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error generating sample data:', err);
    mongoose.connection.close();
  }
}

