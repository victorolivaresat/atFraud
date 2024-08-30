const routes = require('express').Router();
const authRoutes = require('./authRoutes');
const analystRoute = require('./analystRoute');

routes.use(authRoutes);
routes.use(analystRoute);

module.exports = routes;
