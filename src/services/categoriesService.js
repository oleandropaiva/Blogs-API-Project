const { Category } = require('../models');

const addCategories = async ({ name }) => {
  if (!name) {
    return { message: '"name" is required' };
  }
  const dataCategories = await Category.findAll({ where: { name } });
  if (dataCategories.length > 0) {
    return { message: 'Category already registered' };
  }

  const { dataValues } = await Category.create({ name });
  
  return dataValues;
};

const getAllCategories = async () => {
  const dataCategories = await Category.findAll();
  return dataCategories;
};

module.exports = { addCategories, getAllCategories };