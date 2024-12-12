import exerciseServices from "../services/exerciseServices.js"

const getExercises = async (req, res, next) => {
  const { userId } = req.userId
  const foundExercises = await exerciseServices.getExercises(userId)
  res.status(200).json(foundExercises)
}

const getExerciseDetail = async (req, res, next) => {
  const { exerciseId } = req.params
  const foundExercise = await exerciseServices.getExerciseDetail(exerciseId)
  res.status(200).json(foundExercise)
}

const searchExercise = async (req, res, next) => {
  const { query, limit, page } = req.query
  const foundExercises = await exerciseServices.searchExercise(query, limit, page)
  res.status(200).json(foundExercises)
}

const createNewExercise = async (req, res, next) => {
  const { userId } = req.userId
  const newExercise = await exerciseServices.createNewExercise(userId, req.body)
  res.status(200).json(newExercise)
}

const updateExercise = async (req, res, next) => {
  const { exerciseId } = req.params
  const { userId } = req.userId
  const updatedExercise = await exerciseServices.updateExercise(exerciseId, userId, req.body)
  res.status(200).json(updatedExercise)
}

const deleteExercise = async (req, res, next) => {
  const { exerciseId } = req.params
  const deletedResult = await exerciseServices.deleteExercise(exerciseId)
  res.status(200).json({
    data: deletedResult
  })
}

export default {
  getExercises,
  getExerciseDetail,
  searchExercise,
  createNewExercise,
  updateExercise,
  deleteExercise,
}