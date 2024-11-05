import CustomError from '../errors/customError.js'
import userModel from "../models/userModel.js"
import getSelectData from "../utils/getSelectData.js"
import getUnselectData from "../utils/getUnselectData.js"

const findOneUser = async (filter) => {
  return await userModel.findOne(filter).select(getUnselectData(['password, __v']))
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


export default {
  findOneUser,
  findManyUsers,
  createNewUser,
}
