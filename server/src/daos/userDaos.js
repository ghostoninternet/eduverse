import CustomError from '../errors/customError.js'
import userModel from "../models/userModel.js"
import getSelectData from "../utils/getSelectData.js"

// Fix do not return user password in userService
const findOneUser = async (filter) => {
  return await userModel.findOne(filter).select(getUnselectData(['password', '__v']))
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

const createNewUser = async (userDocument) => {
  return await userModel.create(userDocument)
    .then(data => data)
    .catch(err => {
      console.log(err)
      throw new CustomError.DatabaseError("Something went wrong in createNewUser")
    })
}

const updateUser = async (userId, updateUserData) => {
  return await userModel.findOneAndUpdate(
    { _id: userId },
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
  findOneUser,
  findManyUsers,
  createNewUser,
  updateUser,
}
