const routes = require('express').Router();

const fraudMotivesRoute = require('./fraudMotiveRoute');
const analystRoute = require('./analystRoute');
const statusRoute = require('./statusRoute');
const authRoutes = require('./authRoutes');
const caseRoute = require('./caseRoute');


routes.use(analystRoute);
routes.use(authRoutes);
routes.use(caseRoute);
routes.use(statusRoute);
routes.use(fraudMotivesRoute);

module.exports = routes;

