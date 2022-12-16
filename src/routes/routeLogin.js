const { Router } = require('express');

const routeLogin = Router();
const loginController = require('../controller/loginController');

routeLogin.post('/', loginController.login);

module.exports = routeLogin;