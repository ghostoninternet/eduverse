import authServices from "../services/authServices.js";

const register = async (req, res, next) => {
  const authenticatedData = await authServices.register(req.body)
  res.cookie("accessToken", authenticatedData.accessToken, {
    httpOnly: true
  })

  res.cookie("refreshToken", authenticatedData.refreshToken, {
    httpOnly: true
  })
  res.status(200).json({
    message: "Successfully login!",
    data: authenticatedData.user
  })
};

const login = async (req, res, next) => {
  const authenticatedData = await authServices.login(req.body)
  res.cookie("accessToken", authenticatedData.accessToken, {
    httpOnly: true
  })

  res.cookie("refreshToken", authenticatedData.refreshToken, {
    httpOnly: true
  })
  res.status(200).json({
    message: "Successfully login!",
    data: authenticatedData.user
  })
}

const logout = async (req, res, next) => {
  res.cookie("accessToken", null)
  res.cookie("refreshToken", null)
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

  res.cookie("refreshToken", authenticatedData.refreshToken, {
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