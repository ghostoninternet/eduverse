import jwt from 'jsonwebtoken'
import ENV from "../configs/index.js"
import CustomError from '../errors/customError.js'
import userDaos from "../daos/userDaos.js"

const ACCESS_TOKEN_SECRET_KEY = ENV.AT_SECRET_KEY

const authToken = (req, res, next) => {
  const accessToken = req.cookies?.accessToken
  if (!accessToken) throw new CustomError.UnauthorizedError("No access token!")

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, async (err, decode) => {
    if (err) {
      if (err.name == 'TokenExpiredError') {
        throw new CustomError.CustomError(err.message, 403, err.name)
      } else if (err.name == 'JsonWebTokenError') {
        throw new CustomError.CustomError(err.message, 401, err.name)
      } else {
        throw new CustomError.InternalServerError("Something went wrong when verifying token")
      }
    }

    const { userId } = decode
    const foundUser = await userDaos.findOneUser({ _id: userId })
    if (!foundUser) throw new BadRequestError("User does not exist!")
    req.userId = userId

    next()
  })
}

export default authToken
