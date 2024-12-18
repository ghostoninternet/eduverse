import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import CustomError from '../errors/customError.js'
import generateToken from "../utils/generateToken.js"
import userDaos from "../daos/userDaos.js"
import ENV from "../configs/index.js"
import excludeObjectKeys from '../utils/excludeObjectKeys.js'
import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from '../constants/authenticate.js'
const ACCESS_TOKEN_SECRET_KEY = ENV.AT_SECRET_KEY
const REFRESH_TOKEN_SECRET_KEY = ENV.RT_SECRET_KEY

const register = async ({ username, email, password, role }) => {
  const foundUser = await userDaos.findOneUser({ email: email })
  if (foundUser) throw new CustomError.UserAlreadyExistError()

  const hashPassword = await bcrypt.hash(password, 10)
  const userDocument = {
    email: email,
    password: hashPassword,
    username: username,
    avatarUrl: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    role: role,
  }
  const newUser = await userDaos.createNewUser(userDocument)

  const payload = {
    userId: newUser._id,
    email: newUser.email,
    username: newUser.username,
    role: newUser.role,
  }
  const accessToken = generateToken(payload, ACCESS_TOKEN_SECRET_KEY, ACCESS_TOKEN_EXPIRE)
  const refreshToken = generateToken(payload, REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRE)

  return {
    user: excludeObjectKeys(newUser, ['password', '__v']),
    accessToken,
    refreshToken
  }
}

const login = async ({ email, password }) => {
  const foundUser = await userDaos.findOneUser({ email: email })
  if (!foundUser) throw new CustomError.NotFoundError("User does not exist!")

  const compareResult = await bcrypt.compare(password, foundUser.password)
  if (!compareResult) throw new CustomError.BadRequestError("Password is incorrect!")


  const payload = {
    userId: foundUser._id,
    email: foundUser.email,
    username: foundUser.username,
    role: foundUser.role,
  }

  const accessToken = generateToken(payload, ACCESS_TOKEN_SECRET_KEY, ACCESS_TOKEN_EXPIRE)
  const refreshToken = generateToken(payload, REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRE)

  return {
    user: excludeObjectKeys(foundUser, ['password', '__v']),
    accessToken,
    refreshToken
  }
}

const refreshToken = async (refreshToken) => {
  try {
    const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY)
    const { userId } = decode
    const foundUser = await userDaos.findOneUser({ _id: userId })

    if (!foundUser) throw new CustomError.NotFoundError("User does not exist!")

    const payload = {
      userId: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
      role: foundUser.role,
    }

    const newAccessToken = generateToken(payload, ACCESS_TOKEN_SECRET_KEY, ACCESS_TOKEN_EXPIRE)

    return {
      user: excludeObjectKeys(foundUser, ['password', '__v']),
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    }
  } catch (err) {
    if (err) {
      if (err.name == 'TokenExpiredError') {
        throw new CustomError.CustomError(err.message, 403, err.name)
      } else if (err.name == 'JsonWebTokenError') {
        throw new CustomError.CustomError(err.message, 401, err.name)
      } else {
        throw new CustomError.InternalServerError("Something went wrong when verifying token")
      }
    }
  }
}

const getUser = async (userId) => {
  const user = await userDaos.findOneUser({ _id: userId })
  return user;
}

export default {
  getUser,
  register,
  login,
  refreshToken
}