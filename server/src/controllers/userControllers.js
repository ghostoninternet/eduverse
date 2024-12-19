import userServices from "../services/userServices.js";

const getUser = async (req, res, next) => {
  const { userId } = req.user
  const foundUser = await userServices.getUser(userId)
  res.status(200).json(foundUser)
}

const updateUser = async (req, res, next) => {
  const { id } = req.params
  const response = await userServices.updateUser(id, req.body)
  res.status(200).json(response);
};

export default {
  getUser,
  updateUser,
};
