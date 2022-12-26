const { Router } = require('express');
const validToken = require('../middlewares/validToken');

const routePost = Router();
const postController = require('../controller/postController');

routePost.post('/', validToken.midValidToken, postController.createPost);

module.exports = routePost;