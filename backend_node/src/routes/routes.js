const routes = require('express').Router();
const analystRoute = require('./analystRoute');
const authRoutes = require('./authRoutes');
const caseRoute = require('./caseRoute');


routes.use(analystRoute);
routes.use(authRoutes);
routes.use(caseRoute)

module.exports = routes;

