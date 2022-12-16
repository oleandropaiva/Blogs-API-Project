const { Router } = require('express');
const validToken = require('../middlewares/validToken');

const routeCategories = Router();
const categoriesController = require('../controller/categoriesController');

routeCategories.post('/', validToken.midValidToken, categoriesController.addCategories);

module.exports = routeCategories;