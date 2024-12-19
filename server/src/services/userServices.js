import mongoose from 'mongoose'
import userDaos from "../daos/userDaos.js";
import CustomError from '../errors/customError.js';
import excludeObjectKeys from '../utils/excludeObjectKeys.js';

const getUser = async (userId) => {
  const foundUser = await userDaos.findOneUser({ _id: new mongoose.Types.ObjectId(userId) })
  if (!foundUser) throw new CustomError.NotFoundError('User not found!')
  return excludeObjectKeys(foundUser, ['password', '__v', 'createdAt', 'updatedAt'])
}

const updateUser = async (userId, data) => {
  const user = await userDaos.updateUser(userId, data);
  return user;
};


export default {
  getUser,
  updateUser,
};
