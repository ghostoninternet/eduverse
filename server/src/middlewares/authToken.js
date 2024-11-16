import jwt from 'jsonwebtoken';
import ENV from "../configs/index.js";
import CustomError from '../errors/customError.js';
import userDaos from "../daos/userDaos.js";

const ACCESS_TOKEN_SECRET_KEY = ENV.AT_SECRET_KEY;

const authToken = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "No access token!" });
  }

  try {
    // Verify the access token
    const decode = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);

    const { userId } = decode;

    // Check if user exists
    const foundUser = await userDaos.findOneUser({ _id: userId });
    if (!foundUser) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    req.userId = userId;
    next(); // Proceed to the next middleware or route handler

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // Handle token expiration gracefully and pass control to a refresh token flow
      return res.status(403).json({ message: "Token expired. Please refresh your session." });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token!" });
    }

    // Handle any other errors
    return res.status(500).json({ message: "Internal server error when verifying token" });
  }
};

export default authToken;
