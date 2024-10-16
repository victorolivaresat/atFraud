const routes = require('express').Router();
const analystRoute = require('./analystRoute');
const authRoutes = require('./authRoutes');
const caseRoute = require('./caseRoute');
const statusRoute = require('./statusRoute');


routes.use(analystRoute);
routes.use(authRoutes);
routes.use(caseRoute)
routes.use(statusRoute)

module.exports = routes;

