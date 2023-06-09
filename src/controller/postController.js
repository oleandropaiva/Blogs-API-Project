const postService = require('../services/postService');
const { checkToken } = require('../token');

const SEREVER_ERROR = 'Server error';

const createPost = async (req, res) => {
  const dataPost = req.body;
  const { categoryIds } = req.body;
  const dataHeaders = req.headers;
  try {
    const dataCategory = await postService.checkCategoryExists(categoryIds);
    if (dataCategory.message) {
      return res.status(400).json(dataCategory);
    }
    if (dataCategory) {
      const dataToken = checkToken(dataHeaders.authorization);
      const values = await postService.checkUser(dataToken);
      const dataService = await postService.createPost(dataPost, values);
      return res.status(201).json(dataService.dataValues);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(SEREVER_ERROR);
    } 
};
const getPost = async (req, res) => {
  try {
    const dataGetPost = await postService.getPost();
    return res.status(200).json(dataGetPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json(SEREVER_ERROR);
    } 
};

const getId = async (req, res) => {
  const { id } = req.params;
  try {
    const dataId = await postService.getId(id);
    if (dataId.message) {
      return res.status(404).json(dataId);
    }
    return res.status(200).json(dataId[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(SEREVER_ERROR);
    }
};

const updatedId = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { authorization } = req.headers;
  try {
    const checkPost = await postService.checkUserPost(id);
    if (checkPost.message) {
      return res.status(401).json(checkPost);
    }
    const checkUser = await postService.checkUserLogin(authorization, checkPost);
    if (checkUser.message) {
      return res.status(401).json(checkUser);
    }
    const dataPost = await postService.updatedId(id, title, content);
    return res.status(200).json(dataPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json(SEREVER_ERROR);
    }
};

const deletePostId = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  try {
    const checkPost = await postService.checkUserPost(id);
    if (checkPost.message) {
      return res.status(404).json(checkPost);
    }
    const checkUser = await postService.checkUserLogin(authorization, checkPost);
    if (checkUser.message) {
      return res.status(401).json(checkUser);
    }
    const dataPostId = await postService.deletePostId(id);
    return res.status(204).json(dataPostId);
  } catch (error) {
    console.log(error);
    return res.status(500).json(SEREVER_ERROR);
    }
};

module.exports = { createPost, getPost, getId, updatedId, deletePostId };
