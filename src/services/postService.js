const { BlogPost, User, Category, PostCategory } = require('../models');
const { checkToken } = require('../token');

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

const checkUserPost = async (id) => {
  const data = await BlogPost.findAll({
    where: { id },
  });
  if (data.length === 0) {
    return { message: 'Post not found' };
  }
  return data;
};

const checkUserLogin = async (authorization, checkPost) => {
  const { dataValues } = checkPost[0];
  const email = await checkToken(authorization);
  const user = await User.findOne({
    where: { email },
  });
  if (dataValues.userId !== user.id) {
    return { message: 'Unauthorized user' };
  }
  return checkPost;
};

const updatedId = async (id, title, content) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  const dataUpdatedPost = await BlogPost.findOne(
    { 
      where: { id },
      include: [
        { model: User, as: 'user', atributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );
  return dataUpdatedPost;
};

module.exports = { 
  createPost,
  checkUser,
  checkCategoryExists,
  getPost,
  getId,
  updatedId,
  checkUserLogin,
  checkUserPost,
};