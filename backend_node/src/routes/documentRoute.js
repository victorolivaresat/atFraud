const documentController = require('../app/controllers/documentController');
const authRequired = require('../app/middleware/validateToken');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Document
 *   description: Document API
 */
routes.get("/documents/:caseId", authRequired, documentController.getDocumentsByCaseId);

module.exports = routes;