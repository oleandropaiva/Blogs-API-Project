const postService = require('../services/postService');

const createPost = async (req, res) => {
  const dataPost = req.body;
  const dataService = await postService.createPost(dataPost);
  return res.status(201).json(dataService);
};

module.exports = { createPost };