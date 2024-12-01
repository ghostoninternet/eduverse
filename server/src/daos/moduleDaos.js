import Modules from "../models/moduleModel.js"

const findModules = async (filter, limit = 10, page = 1) => {
  return await Modules.find(filter).skip((page - 1) * limit).limit(limit)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const findModuleById = async (moduleId) => {
  return await Modules.findById(moduleId).lean()
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const countNumberOfModule = async (filter) => {
  return await Modules.countDocuments(filter)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const findModuleByInstructor = async (instructorId, limit = 10, page = 1) => {
  return await Modules.find({ moduleInstructor: instructorId }).skip((page - 1) * limit).limit(limit)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const createNewModule = async (newModuleDocument) => {
  return await Modules.create(newModuleDocument)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const updateModule = async (moduleId, updateModuleDocument) => {
  return await Modules.findOneAndUpdate(
    { _id: moduleId },
    updateModuleDocument,
    { new: true }
  )
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

const deleteModuleById = async (moduleId) => {
  return await Modules.findOneAndDelete({ _id: moduleId })
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError()
    })
}

export default {
  findModules,
  findModuleById,
  findModuleByInstructor,
  countNumberOfModule,
  createNewModule,
  updateModule,
  deleteModuleById,
}