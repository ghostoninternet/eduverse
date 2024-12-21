import Categories from '../models/categoryModel.js'
import CustomError from '../errors/customError.js'

const findAllCategories = async () => {
  return await Categories.find()
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

const findCategoryById = async (categoryId) => {
  return await Categories.findById(categoryId)
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

const findCategoryByName = async (categoryName) => {
  return await Categories.aggregate([
    {
      $match: {categoryName: {$in : categoryName}}
    }
  ])
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

export default {
  findAllCategories,
  findCategoryById,
  findCategoryByName,
}