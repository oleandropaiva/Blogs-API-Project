const { BlogPost, User, Category } = require('../models');

const checkCategoryExists = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });
  if (count !== categoryIds.length) {
    return {      
        message: 'one or more "categoryIds" not found',            
    };
  }
};

const checkUser = async (dataToken) => {
  const checkEmailUser = await User.findOne({
    where: { email: dataToken },
  });
  return checkEmailUser;
};

const createPost = async (dataPost, dataValues) => {
  const post = await BlogPost.create(
    {
      title: dataPost.title,
      content: dataPost.content,
      userId: dataValues.id,
    },
  );
  return post;
};

module.exports = { createPost, checkUser, checkCategoryExists };