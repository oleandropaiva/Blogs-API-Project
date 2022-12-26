const postService = require('../services/postService');
const { checkToken } = require('../token');

const createPost = async (req, res) => {
  const dataPost = req.body;
  const dataHeaders = req.headers;
  const dataToken = checkToken(dataHeaders.authorization);
  const values = await postService.checkUser(dataToken);
  const dataService = await postService.createPost(dataPost, values);
  return res.status(201).json(dataService.dataValues);
};

module.exports = { createPost };