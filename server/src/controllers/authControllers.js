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
    message: "Successfully signup!",
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

  res.cookie("refreshToken", authenticatedData.refreshToken, {
    httpOnly: true
  })
  res.status(200).json({
    message: "Successfully refresh!",
    data: authenticatedData.user
  })
}


const getUser = async (req, res, next) => {

  const user = await authServices.getUser(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Send the user profile data as a response
  res.status(200).json({
    id: user._id,
    name: user.username,
    email: user.email,
    gender: user.gender
  });
}

export default {
  register,
  login,
  logout,
  refreshToken,
  getUser
}