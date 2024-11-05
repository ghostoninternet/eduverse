import Categories from '../models/categoryModel'

const findCategoryById = async (categoryId) => {
  return await Categories.findById(categoryId)
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

const findCategoryByName = async (categoryName) => {
  return await Categories.findOne({
    categoryName: categoryName
  })
  .then(data => data)
  .catch(err => {
    console.log(err)
    throw new CustomError.DatabaseError()
  })
}

export default {
  findCategoryById,
  findCategoryByName,
}