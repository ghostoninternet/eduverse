import userServices from "../services/userServices.js";

const updateUser = async (req, res, next) => {
  const {id} = req.params
  const response = await userServices.updateUser(id, req.body)
  res.status(200).json(response);
};

export default {
  updateUser,
};
