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
routes.put("/cases/evaluation/:caseId", authRequired, caseController.updateCaseEvaluation);
routes.put("/cases/evaluation/masive", authRequired, caseController.updateCasesEvaluationMasive);
routes.get("/cases/evaluation/attended/:analystId", authRequired, caseController.getEvaluationsAttended);
routes.get("/cases/evaluation/pending/:analystId", authRequired, caseController.getEvaluationsPending);

module.exports = routes;