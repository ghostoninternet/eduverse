import moduleServices from "../services/moduleServices.js"

const getModules = async (req, res, next) => {
  const { limit, page } = req.query
  const { userId } = req.userId
  const foundModules = await moduleServices.getModules(userId, limit, page)
  res.status(200).json(foundModules)
}

const getModuleDetail = async (req, res, next) => {
  const foundModule = await moduleServices.getModuleDetail(req.params.moduleId)
  res.status(200).json(foundModule)
}

const searchModule = async (req, res, next) => {
  const { query, limit, page } = req.query
  const foundModules = await moduleServices.searchModule(query, limit, page)
  res.status(200).json(foundModules)
}

const createNewModule = async (req, res, next) => {
  const { userId } = req.userId
  const newModule = await moduleServices.createNewModule(userId, req.body)
  res.status(200).json(newModule)
}

const updateModule = async (req, res, next) => {
  const { userId } = req.userId
  const { moduleId } = req.params
  const updateModule = await moduleServices.updateModule(moduleId, userId, req.body)
  res.status(200).json(updateModule)
}

const deleteModule = async (req, res, next) => {
  const { moduleId } = req.params
  const deleteResult = await moduleServices.deleteModule(moduleId)
  res.status(200).json({
    data: deleteResult
  })
}

export default {
  getModules,
  getModuleDetail,
  searchModule,
  createNewModule,
  updateModule,
  deleteModule,
}