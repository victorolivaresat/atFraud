const routes = require('express').Router();


const alertsCctvRoutes = require('./alertsCctvRoutes');
const githubRoutes = require('./githubRoutes');
const authRoutes = require('./authRoutes');
const testRoutes = require('./testRoutes');
const userRoutes = require('./userRoutes');

const authRoutesPF = require('./authRoutesPF');

routes.use(alertsCctvRoutes);
routes.use(authRoutes);
routes.use(testRoutes);
routes.use(userRoutes);
routes.use(githubRoutes);
routes.use(authRoutesPF);


module.exports = routes;
