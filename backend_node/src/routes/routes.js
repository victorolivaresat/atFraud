const routes = require('express').Router();

const fraudMotivesRoute = require('./fraudMotiveRoute');
const documentRoutes = require('./documentRoute');
const analystRoute = require('./analystRoute');
const statusRoute = require('./statusRoute');
const alertRoutes = require('./alertRoute');
const authRoutes = require('./authRoutes');
const caseRoute = require('./caseRoute');


routes.use(fraudMotivesRoute);
routes.use(documentRoutes);
routes.use(analystRoute);
routes.use(statusRoute);
routes.use(alertRoutes);
routes.use(authRoutes);
routes.use(caseRoute);

module.exports = routes;

