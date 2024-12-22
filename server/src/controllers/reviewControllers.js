import reviewServices from "../services/reviewServices.js"
import mongoose from "mongoose";


const getCourseReviews = async (req, res, next) => {
  const { courseId } = req.params
  const { limit =3, page=1 } = req.query
  const courseReviews = await reviewServices.getCourseReviews(courseId, limit, page)
  res.status(200).json(courseReviews)
}

const createCourseReview = async (req, res) => {
  const { userId } = req.user;
  const savedReview = await reviewServices.createCourseReview(userId, req.body);
  res.status(201).json(savedReview);
};

const updateCourseReview = async (req, res, next) => {
  const { reviewId } = req.params
  const { userId } = req.user
  const updatedCourseReview = await reviewServices.updateCourseReview(reviewId, userId, req.body)
  res.status(200).json(updatedCourseReview)
}

const deleteCourseReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const { userId } = req.user;

  console.log("Backend: Received reviewId:", reviewId); // Log reviewId từ frontend
  console.log("Backend: Current userId:", userId); // Log userId từ token

  const deletedCourseReview = await reviewServices.deleteCourseReview(reviewId, userId)
  res.status(200).json(deletedCourseReview)
}

export default {
  getCourseReviews,
  createCourseReview,
  updateCourseReview,
  deleteCourseReview,
}