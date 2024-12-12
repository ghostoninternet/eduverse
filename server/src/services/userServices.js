import userDaos from "../daos/userDaos.js";

const updateUser = async (userId, data) => {
  const user = await userDaos.updateUser(userId, data);
  return user;
};


export default {
  updateUser,
};
