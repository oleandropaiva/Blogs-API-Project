const express = require('express');
require('express-async-errors');
// const mid = require('./middlewares/errorMiddlewares');
// const loginController = require('./controller/loginController');
const routes = require('./routes');
// ...

const app = express();

app.use(express.json());
app.use('/login', routes.routeLogin);
// app.post('/login', loginController.login);
// app.use(mid.error);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
