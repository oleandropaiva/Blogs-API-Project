const express = require('express');
require('express-async-errors');
// const mid = require('./middlewares/errorMiddlewares');
// const loginController = require('./controller/loginController');
const routes = require('./routes');
// ...

const app = express();

app.use(express.json());
// app.use('/cat', (req, res) => {
//   console.log(req.body);
// });
app.use('/categories', routes.routeCategories);
app.use('/login', routes.routeLogin);
app.use('/user', routes.routeUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
