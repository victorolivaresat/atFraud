const caseController = require('../app/controllers/caseController');
const authRequired = require('../app/middleware/validateToken');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Case
 *   description: Case API
 */
routes.get("/cases/:caseId", authRequired, caseController.getCaseById);
routes.get("/cases/evaluation/:analystId", authRequired, caseController.getCasesInEvaluation);

module.exports = routes;