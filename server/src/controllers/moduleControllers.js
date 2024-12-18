import moduleServices from "../services/moduleServices.js"

const getAllModulesTitle = async (req, res, next) => {
  const { userId } = req.user
  const foundModules = await moduleServices.getAllModulesTitle(userId)
  res.status(200).json(foundModules)
}

const getModules = async (req, res, next) => {
  const { limit, page } = req.query
  const { userId } = req.user
  const foundModules = await moduleServices.getModules(userId, limit, page)
  res.status(200).json(foundModules)
}

const getModuleDetail = async (req, res, next) => {
  const foundModule = await moduleServices.getModuleDetail(req.params.moduleId)
  res.status(200).json(foundModule)
}

const searchModule = async (req, res, next) => {
  const { query, limit, page } = req.query
  const { userId } = req.user
  const foundModules = await moduleServices.searchModule(userId, query, limit, page)
  res.status(200).json(foundModules)
}

const createNewModule = async (req, res, next) => {
  const { userId } = req.user
  const newModule = await moduleServices.createNewModule(userId, req.body)
  res.status(200).json(newModule)
}

const updateModule = async (req, res, next) => {
  const { userId } = req.user
  const { moduleId } = req.params
  const updateModule = await moduleServices.updateModule(moduleId, userId, req.body)
  res.status(200).json(updateModule)
}

const deleteModule = async (req, res, next) => {
  const { moduleId } = req.params
  const { userId } = req.user
  const deleteResult = await moduleServices.deleteModule(moduleId, userId)
  res.status(200).json({
    data: deleteResult
  })
}

const getModuleByCourseId = async (req, res, next) => {
  const { courseId } = req.params
  const result = await moduleServices.getModuleByCourseId(courseId)
  res.status(200).json({
    data: result
  })
}
export default {
  getAllModulesTitle,
  getModules,
  getModuleDetail,
  searchModule,
  createNewModule,
  updateModule,
  deleteModule,
  getModuleByCourseId
}