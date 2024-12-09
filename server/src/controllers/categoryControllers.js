import categoryDaos from "../daos/categoryDaos.js"

const getAllCategories = async (req, res, next) => {
  const allCategories = await categoryDaos.findAllCategories()
  res.status(200).json(allCategories)
}

export default {
  getAllCategories,
}
