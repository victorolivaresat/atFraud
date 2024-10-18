const alertController = require('../app/controllers/alertController');
const authRequired = require('../app/middleware/validateToken');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Alert
 *   description: Alert API
 */
routes.get("/alerts/:caseId", authRequired, alertController.getAlertsByCaseId);

module.exports = routes;