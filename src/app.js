const express = require('express');
require('express-async-errors');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/categories', routes.routeCategories);
app.use('/login', routes.routeLogin);
app.use('/user', routes.routeUser);
app.use('/post', routes.routePost);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
