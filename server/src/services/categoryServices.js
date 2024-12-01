import categoryDaos from "../daos/categoryDaos.js";

const findCategoryByName = async (categoryName) => {
  let result = categoryDaos.findCategoryByName(categoryName);
  return result;
};

export default {
    findCategoryByName,
};
