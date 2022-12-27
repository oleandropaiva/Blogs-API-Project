const { Router } = require('express');
const validToken = require('../middlewares/validToken');
const validPost = require('../middlewares/validPost');
const validUpdate = require('../middlewares/validUpdate');

const routePost = Router();
const postController = require('../controller/postController');

routePost.post('/', validToken.midValidToken, validPost.postValid, postController.createPost);
routePost.get('/', validToken.midValidToken, postController.getPost);
routePost.get('/:id', validToken.midValidToken, postController.getId);
routePost.put('/:id',
validToken.midValidToken,
validUpdate.midValidValidUpdate,
postController.updatedId);

routePost.delete('/:id', validToken.midValidToken, postController.deletePostId);

module.exports = routePost;