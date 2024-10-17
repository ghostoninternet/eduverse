import authServices from "../services/authServices";

const register = async (req, res, next) => {
    const user = await authServices.register(req.body)
    res.status(201).json({
      success: "Successfully register new user",
      data: user
    })
};

export default {
  register
}