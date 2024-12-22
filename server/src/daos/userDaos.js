import CustomError from '../errors/customError.js'
import userModel from "../models/userModel.js"
import getSelectData from "../utils/getSelectData.js"

const countTotalOfUsers = async (filter={}) => {
  return await userModel.countDocuments(filter)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError("Something went wrong in findOneUser")
    })
}

const findOneUser = async (filter) => {
  return await userModel.findOne(filter).lean()
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError("Something went wrong in findOneUser")
    })
}

const findManyUsers = async (filter, select) => {
  return await userModel.find(filter).select(getSelectData(select))
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError("Something went wrong in findManyUsers")
    })
}

const findUsers = async (filter = {}, limit, page) => {
  return await userModel.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean()
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError("Something went wrong in findManyUsers")
    })
}

const createNewUser = async (userDocument) => {
  return await userModel.create(userDocument)
    .then(data => data.toObject())
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError("Something went wrong in createNewUser")
    })
}

const updateUser = async (userId, updateUserData) => {
  return await userModel.findOneAndUpdate(
     {_id: userId} ,
    updateUserData,
    { new: true }
  )
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError("Something went wrong in createNewUser")
    })
}

export default {
  countTotalOfUsers,
  findOneUser,
  findManyUsers,
  findUsers,
  createNewUser,
  updateUser,
}
