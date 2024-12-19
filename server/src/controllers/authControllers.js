import { IS_COOKIE_HTTP_ONLY, IS_COOKIE_SECURE, TOKEN_COOKIE_MAX_AGE } from "../constants/authenticate.js";
import authServices from "../services/authServices.js";

const register = async (req, res, next) => {
  const authenticatedData = await authServices.register(req.body)
  res.cookie("accessToken", authenticatedData.accessToken, {
    httpOnly: IS_COOKIE_HTTP_ONLY,
    secure: IS_COOKIE_SECURE,
    maxAge: TOKEN_COOKIE_MAX_AGE,
  })

  res.cookie("refreshToken", authenticatedData.refreshToken, {
    httpOnly: IS_COOKIE_HTTP_ONLY,
    secure: IS_COOKIE_SECURE,
    maxAge: TOKEN_COOKIE_MAX_AGE,
  })
  res.status(200).json({
    message: "Successfully signup!",
    data: authenticatedData.user
  })
};

const login = async (req, res, next) => {
  const authenticatedData = await authServices.login(req.body)
  res.cookie("accessToken", authenticatedData.accessToken, {
    httpOnly: IS_COOKIE_HTTP_ONLY,
    secure: IS_COOKIE_SECURE,
    maxAge: TOKEN_COOKIE_MAX_AGE,
  })

  res.cookie("refreshToken", authenticatedData.refreshToken, {
    httpOnly: IS_COOKIE_HTTP_ONLY,
    secure: IS_COOKIE_SECURE,
    maxAge: TOKEN_COOKIE_MAX_AGE,
  })
  res.status(200).json({
    message: "Successfully login!",
    data: authenticatedData.user
  })
}

const logout = async (req, res, next) => {
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  res.status(200).json({
    message: "Successfully logout!",
    data: true,
  })
}

const refreshToken = async (req, res, next) => {
  const authenticatedData = await authServices.refreshToken(req.cookies?.refreshToken)
  res.cookie("accessToken", authenticatedData.accessToken, {
    httpOnly: true
  })

  res.status(200).json({
    message: "Successfully refresh!",
    data: authenticatedData.user
  })
}

export default {
  register,
  login,
  logout,
  refreshToken,
}