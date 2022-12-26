const { BlogPost, User } = require('../models');

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

module.exports = { createPost, checkUser };