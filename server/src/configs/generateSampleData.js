import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import ENV from './index.js';
import bcrypt from 'bcrypt'
import Categories from '../models/categoryModel.js';
import Courses from '../models/courseModel.js';
import EnrolledCourses from '../models/enrolledCourseModel.js';
import Exercises from '../models/exerciseModel.js';
import Modules from '../models/moduleModel.js';
import Payments from '../models/paymentModel.js';
import Reviews from '../models/reviewModel.js';
import Users from '../models/userModel.js';
import fs from 'fs'

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (max) => Math.ceil(Math.random() * max)

const CATEGORIES = [
  "Big Data",
  "Data Analysis",
  "Data Mining",
  "Data Science",
  "Deep Learning",
  "Machine Learning",
  "Regression",
  "Network Security",
  "Python Programming",
  "Linux",
  "Cloud Computing",
  "Audit",
  "Computer Programming",
  "Computer Security Incident Management",
  "Cryptography",
  "Databases",
  "Leadership and Management",
  "Network Architecture",
  "Risk Management",
  "SQL",
  "Security Engineering",
  "System Security",
  "Software Security",
  "Security Software",
  "Strategy and Operations",
  "Operations Management",
  "Cyberattacks",
  "Software-Defined Networking",
  "Human Factors (Security)",
  "Cloud Applications",
  "Strategy",
  "Network Analysis",
  "Algorithms",
  "Communication",
  "Financial Accounting",
  "Web Development",
  "Business Analytics",
  "Artificial Intelligence",
  "Graphic Design",
  "Project Management",
  "Software Engineering",
  "Entrepreneurship",
  "Statistics",
  "Java Programming",
  "Finance",
  "Blockchain",
  "UI/UX Design",
]

// Create and save 10 samples for each collection
export default async function generateSampleData() {
  await mongoose.connect(ENV.MONGO_URI, {
    dbName: ENV.DATABASE_NAME
  })
  .then(async () => {
    console.log("Connected to Database. Ready to generate sample data")   
  })
  .catch((err) => {
    console.log("Error connecting to Database!")
    console.log(err)
    mongoose.disconnect()
    process.exit(1)
  })

  console.log("Cleaning Old Data")
  await Users.deleteMany({})
  await Categories.deleteMany({})
  await Courses.deleteMany({})
  await Modules.deleteMany({})
  await Exercises.deleteMany({})
  await EnrolledCourses.deleteMany({})
  await Reviews.deleteMany({})
  console.log("Finish Cleaning Old Data")

  let categories = [];
  let users = [];
  let instructors = [];
  let courses = [];
  let totalModules = [];
  let totalexercises = [];

  try {
    // Categories
    console.log("Generating Categories....")
    for (let i = 0; i < CATEGORIES.length; i++) {
      const newCategory = await Categories.create({ categoryName: CATEGORIES[i] });
      categories.push(newCategory);
    }
    console.log("Finish Generating Categories")

    // Users
    console.log("Generating Users....")
    const userAccount = 'userAccount.txt'

    fs.writeFileSync(userAccount, '');

    for (let i = 0; i < 500; i++) {
      const rawPassword = faker.internet.password(); 
      const username = faker.person.fullName();
      const email = `example-user-v${i}@gmail.com`;
      fs.appendFileSync(userAccount, `Account: ${username}, ${email}, ${rawPassword}\n`);
      const user = await Users.create({
        username: username,
        email: email,
        password: await bcrypt.hash(rawPassword, 10),
        gender: getRandomElement(["Male", "Female"]),
        avatarUrl: faker.image.avatar(),
        location: faker.location.city() + ", " + faker.location.country(),
        jobTitle: faker.person.jobTitle(),
        organization: faker.company.name(),
        enrolledCourses: [],
        role: 'user',
      });
      users.push(user._id)
    }
    console.log("Finish Generating Users")

    // Instructor
    console.log("Generaing Instructors....")
    const instructorAccount = 'instructorAccount.txt'

    fs.writeFileSync(instructorAccount, '');
    for (let i = 0; i < 10; i++) {
      const rawPassword = faker.internet.password(); 
      const username = faker.person.fullName();
      const email = `example-instructor-v${i}@gmail.com`;
      fs.appendFileSync(instructorAccount, `Account: ${username}, ${email}, ${rawPassword}\n`);
      const instructor = await Users.create({
        username: username,
        email: email,
        password: await bcrypt.hash(rawPassword, 10),
        gender: getRandomElement(["Male", "Female"]),
        avatarUrl: faker.image.avatar(),
        location: faker.location.city() + ", " + faker.location.country(),
        jobTitle: faker.person.jobTitle(),
        organization: faker.company.name(),
        enrolledCourses: [],
        role: 'instructor',
      });
      instructors.push(instructor._id)
    }
    console.log("Finish Generating Instructors")

    // Courses
    console.log("Generating Courses....")
    for (let i = 0; i < 500; i++) {
      const courseCategory = []
      const freeCourse = 20;
      for (let j = 0; j < getRandomNumber(4); j++) {
        courseCategory.push(getRandomElement(categories)._id)
      }
      if(i < freeCourse){
        const course = await Courses.create({
          courseTitle: `Course ${i + 1}`,
          courseSlug: `course-${i + 1}`,
          courseInstructor: getRandomElement(instructors),
          courseDescription: faker.lorem.paragraph(5),
          courseImgUrl: faker.image.avatar(),
          courseCategory,
          coursePrice: 0.00,
          courseModules: [],
          courseReviews: [],
          courseReviewCount: 0,
          courseRatingAvg: 0,
          courseLearnerCount: 0,
          courseStatus: 'public'
        });
        courses.push(course._id);
      }else{
        const course = await Courses.create({
          courseTitle: `Course ${i + 1}`,
          courseSlug: `course-${i + 1}`,
          courseInstructor: getRandomElement(instructors),
          courseDescription: faker.lorem.paragraph(5),
          courseImgUrl: faker.image.avatar(),
          courseCategory,
          coursePrice: Number.parseFloat(faker.finance.amount({
            min: 0.01,
            max: 9.99,
          })),
          courseModules: [],
          courseReviews: [],
          courseReviewCount: 0,
          courseRatingAvg: 0,
          courseLearnerCount: 0,
          courseStatus: 'public'
        });
        courses.push(course._id);
      }
      
      
    }
    console.log("Finish Generating Courses")

    // Modules
    console.log("Generating Modules....")
    for (let i1 = 0; i1 < courses.length; i1++) {
      let modules = []
      for (let i2 = 0; i2 < 4; i2++) {
        const moduleVideoLessons = []
        for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
          const videoUrl = [
            "https://www.youtube.com/watch?v=GxmfcnU3feo",
            "https://www.youtube.com/watch?v=09n__iJvTeY",
            "https://www.youtube.com/watch?v=HNBCKzaRpQU",
            "https://www.youtube.com/watch?v=EjEDfymRSIw",
            "https://www.youtube.com/watch?v=8_ZjWWp_BUM",
            "https://www.youtube.com/watch?v=JQbASNZ4v-U",
            "https://www.youtube.com/watch?v=__AApNgsAbE&t=174s"
          ]
          moduleVideoLessons.push({
            videoTitle: `Lesson ${j + 1}`,
            videoUrl: videoUrl[j],
            videoLength: Math.floor(Math.random() * 10) + 10,
          })
        }
        const module = await Modules.create({
          courseId: courses[i1],
          moduleInstructor: getRandomElement(instructors),
          moduleTitle: `Module ${i2 + 1}`,
          moduleDescription: faker.lorem.paragraph(5),
          moduleVideoLessons,
          moduleExercises: [],
        });
        modules.push(module._id);
        totalModules.push(module._id)
      }

      await Courses.findByIdAndUpdate(
        courses[i1],
        {
          courseModules: modules
        }
      )
    }
    console.log("Finish Generating Modules")

    // Exercises
    console.log("Generating Exercises....")
    for (let i1 = 0; i1 < totalModules.length; i1++) {
      const exercises = []
      for (let i2 = 0; i2 < 4; i2++) {
        const exerciseQuizes = []
        for (let j = 0; j < getRandomNumber(10); j++) {
          const choices = []
          for (let k = 0; k < 4; k++) {
            choices.push(faker.lorem.sentence(10))
          }
          exerciseQuizes.push({
            question: `Question ${j + 1}`,
            choices,
            answer: getRandomElement(choices),
          })
        }

        const newExercise = await Exercises.create({
          exerciseInstructor: getRandomElement(instructors),
          exerciseModule: totalModules[i1]._id,
          exerciseName: `Exercise ${i2 + 1}`,
          exerciseQuizes,
          exercisePassScore: 50,
          exerciseDuration: 30,
        });

        exercises.push(newExercise._id)
        totalexercises.push(newExercise._id)
      }

      await Modules.findByIdAndUpdate(
        totalModules[i1],
        {
          moduleExercises: exercises,
        }
      )
    }
    console.log("Finish Generating Exercises")

    // Update user enrolled course field
    console.log("Updating User Enrolled Course....")
    for (let i = 0; i < users.length; i++) {
      const userEnrolledCourses = []
      for (let j = 0; j < 10; j++) {
        while (true) {
          const randomCourses = getRandomElement(courses)
          if (!userEnrolledCourses.includes(randomCourses)) {
            userEnrolledCourses.push(getRandomElement(courses))
            break
          }
        }
      }
      await Users.findByIdAndUpdate(
        users[i],
        {
          enrolledCourses: userEnrolledCourses,
        }
      )
    }
    console.log("Finish Updating User Enrolled Course")

    // EnrolledCourses
    console.log("Generating EnrolledCourses and Reviews")
    for (let i = 0; i < users.length; i++) {
      const foundUser = await Users.findById(users[i])
      for (let j = 0; j < foundUser.enrolledCourses.length; j++) {
        // Find course
        const foundCourse = await Courses.findById(foundUser.enrolledCourses[j])
        const courseModulesProgress = []

        for (let k = 0; k < foundCourse.courseModules.length; k++) {
          // Find course module
          const foundModule = await Modules.findById(foundCourse.courseModules[k])
          const moduleVideoProgress = []
          foundModule.moduleVideoLessons.forEach((video) => {
            moduleVideoProgress.push({
              ...video,
              isFinish: false,
            })
          })
          const moduleExerciseProgress = []
          foundModule.moduleExercises.forEach(exercise => {
            moduleExerciseProgress.push({
              exerciseId: exercise,
              userScore: 0,
              hasPassed: false,
              previousSubmitDate: null,
            })
          })

          courseModulesProgress.push({
            moduleId: foundModule._id,
            isFinish: false,
            moduleVideoProgress,
            moduleExerciseProgress,
          })
        }

        const enrolledCourseDocument = {
          courseId: foundCourse._id,
          userId: foundUser._id,
          courseProgress: 0,
          courseEstimateDeadline: new Date(),
          courseModulesProgress
        }

        await EnrolledCourses.create(enrolledCourseDocument)

        // Review
        const reviewDocument = {
          courseId: foundCourse._id,
          userId: foundUser._id,
          reviewContent: faker.lorem.paragraph(5),
          ratingStar: getRandomNumber(5),
        }

        await Reviews.create(reviewDocument)
      }
    }
    console.log("Finish Generating EnrolledCourses And Reviews")

    console.log("Updating Course Review, Course Rating and Course Learner")
    // Update course review, rating and learner
    for (let i = 0; i < courses.length; i++) {
      // Count course learner
      const courseLearners = await Users.find({
        enrolledCourses: courses[i],
      })
      if (courseLearners.length == 0) continue
      const courseLearnerCount = courseLearners.length

      // Count course review
      const courseReviews = await Reviews.find({
        courseId: courses[i],
      })
      const courseReviewCount = courseReviews.length

      // Calculate average rating
      let courseTotalRating = 0
      for (let j = 0; j < courseReviewCount; j++) {
        courseTotalRating += courseReviews[j].ratingStar
      }
      const courseRatingAvg = courseTotalRating / courseReviewCount

      await Courses.findByIdAndUpdate(
        courses[i],
        {
          courseReviewCount,
          courseRatingAvg,
          courseLearnerCount,
        }
      )
    }
    console.log("Finish Updating Course Review, Course Rating and Course Learner")

    console.log('Sample Data Generated!');
    mongoose.connection.close();
    return null
  } catch (err) {
    console.error('Error generating sample data:', err);
    await Users.deleteMany({})
    await Categories.deleteMany({})
    await Courses.deleteMany({})
    await Modules.deleteMany({})
    await Exercises.deleteMany({})
    await EnrolledCourses.deleteMany({})
    await Reviews.deleteMany({})
    mongoose.connection.close();
    process.exit(1)
  }
}

generateSampleData()