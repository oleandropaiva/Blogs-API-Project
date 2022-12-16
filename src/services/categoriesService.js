// const { Category } = require('../models');

const addCategories = async (name) => {
  if (!name) {
    return { message: '"name" is required' };
  }
  // const dataCategories = await Category.findAll({ where: { name } });
  // await User.create(reqUser);
  // const token = newToken({ email: reqUser.email });
  
  // return { token };
};

module.exports = { addCategories };