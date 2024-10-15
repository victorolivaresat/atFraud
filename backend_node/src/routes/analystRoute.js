const { createAnalystSchema, updateAnalystSchema } = require('../app/validators/analystSchema');
const analystController = require('../app/controllers/analystController'); // Corregido
const { validateSchema } = require('../app/middleware/validateSchema');
const authRequired = require('../app/middleware/validateToken');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analyst
 *   description: Analyst API
 */
routes.post("/analyst", validateSchema(createAnalystSchema), authRequired, analystController.createAnalyst); // Renombrado
routes.put("/analyst/:id", validateSchema(updateAnalystSchema), authRequired, analystController.updateAnalyst); // Renombrado
routes.post("/analyst/:id/restore", authRequired, analystController.restoreAnalyst); // Renombrado
routes.delete("/analyst/:id", authRequired, analystController.deleteAnalyst); // Renombrado
routes.get("/analyst/:id", authRequired, analystController.getAnalyst); // Renombrado
routes.get("/analysts", authRequired, analystController.getAllAnalysts); // Renombrado

module.exports = routes;
