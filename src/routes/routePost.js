const { Router } = require('express');
const validToken = require('../middlewares/validToken');
const validPost = require('../middlewares/validPost');

const routePost = Router();
const postController = require('../controller/postController');

routePost.post('/', validToken.midValidToken, validPost.postValid, postController.createPost);

module.exports = routePost;