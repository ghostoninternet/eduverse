import bcrypt from 'bcrypt'
import CustomError from '../errors/customError.js'
import generateToken from "../utils/generateToken.js"
import userDaos from "../daos/userDaos.js"
import ENV from "../configs/index.js"
import jwt from 'jsonwebtoken'
const ACCESS_TOKEN_SECRET_KEY = ENV.AT_SECRET_KEY
const REFRESH_TOKEN_SECRET_KEY = ENV.RT_SECRET_KEY

const register = async ({ username, email, password }) => {
  const foundUser = await userDaos.findOneUser({ email: email })
  if (foundUser) throw new CustomError.UserAlreadyExistError()

  const hashPassword = await bcrypt.hash(password, 10)
  const userDocument = {
    email: email,
    password: hashPassword,
    username: username,
    isActive: true
  }

  const newUser = await userDaos.createNewUser(userDocument)

  const payload = {
    userId: newUser._id,
    email: newUser.email,
    username: newUser.username,
  }

  const accessToken = generateToken(payload, ACCESS_TOKEN_SECRET_KEY, "1h")
  const refreshToken = generateToken(payload, REFRESH_TOKEN_SECRET_KEY, "7d")

  return {
    user: newUser,
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
    gender: foundUser.gender,
    avatarUrl: foundUser.avatarUrl,
    location: foundUser.location,
  }

  const accessToken = generateToken(payload, ACCESS_TOKEN_SECRET_KEY, "1h")
  const refreshToken = generateToken(payload, REFRESH_TOKEN_SECRET_KEY, "7d")

  return {
    user: foundUser,
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
      gender: foundUser.gender,
      avatarUrl: foundUser.avatarUrl,
      location: foundUser.location,
    }

    const newAccessToken = generateToken(payload, ACCESS_TOKEN_SECRET_KEY, "3s")
    // const newRefreshToken = generateToken(payload, REFRESH_TOKEN_SECRET_KEY, "7d")

    return {
      user: foundUser,
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

const getUser = async(userId) => {
  const user = await userDaos.findOneUser({_id: userId})
  return user;
}

export default {
  getUser,
  register,
  login,
  refreshToken
}