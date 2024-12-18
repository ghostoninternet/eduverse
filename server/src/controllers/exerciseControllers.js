import exerciseServices from "../services/exerciseServices.js"

const getExercises = async (req, res, next) => {
  const { userId } = req.user
  const { moduleId } = req.params
  const foundExercises = await exerciseServices.getExercises(userId, moduleId)
  res.status(200).json(foundExercises)
}

const getExerciseDetail = async (req, res, next) => {
  const { exerciseId } = req.params
  const { userId } = req.user
  const foundExercise = await exerciseServices.getExerciseDetail(exerciseId, userId)
  res.status(200).json(foundExercise)
}

const createNewExercise = async (req, res, next) => {
  const { userId } = req.user
  const newExercise = await exerciseServices.createNewExercise(userId, req.body)
  res.status(200).json(newExercise)
}

const updateExercise = async (req, res, next) => {
  const { exerciseId } = req.params
  const { userId } = req.user
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
  createNewExercise,
  updateExercise,
  deleteExercise,
}