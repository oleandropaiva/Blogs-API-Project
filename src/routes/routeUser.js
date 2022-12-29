const { Router } = require('express');
const userMid = require('../middlewares/userMid');
const validToken = require('../middlewares/validToken');

const routeUser = Router();
const userController = require('../controller/userController');

routeUser.post('/', userMid.validationUser, userController.addUser);
routeUser.get('/', validToken.midValidToken, userController.getAllUsers);
routeUser.delete('/me', validToken.midValidToken, userController.deleteUser);
routeUser.get('/:id', validToken.midValidToken, userController.getUser);

module.exports = routeUser;