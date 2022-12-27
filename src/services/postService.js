const { BlogPost, User, Category, PostCategory } = require('../models');

const checkCategoryExists = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });
  if (count !== categoryIds.length) {
    return {      
        message: 'one or more "categoryIds" not found',
    };
  }
  return true;
};

const checkUser = async (dataToken) => {
  const checkEmailUser = await User.findOne({
    where: { email: dataToken },
  });
  return checkEmailUser;
};

const createPost = async (dataPost, dataValues) => {
  const { categoryIds } = dataPost;
  const post = await BlogPost.create(
    {
      title: dataPost.title,
      content: dataPost.content,
      userId: dataValues.id,
    },
  );
  const { id } = post.dataValues;

  await PostCategory.bulkCreate(
    categoryIds.map((idValue) => (
      {
        postId: id,
        categoryId: idValue,
      }
    )),
  );
  return post;
};

const getPost = async () => {
  const dataBlogPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return dataBlogPost;
};

const getId = async (id) => {
  const dataId = await BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (dataId.length === 0) {
    return { message: 'Post does not exist' };
  }
  return dataId;
};

module.exports = { createPost, checkUser, checkCategoryExists, getPost, getId };