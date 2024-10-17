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
routes.put("/cases/evaluation/:caseId", authRequired, caseController.updateCaseEvaluation); // Nueva ruta para actualizar la evaluación

module.exports = routes;