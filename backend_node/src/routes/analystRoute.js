const analystController = require('../app/controllers/analystController');
const { validateSchema } = require('../app/middleware/validateSchema');
const { createAnalystSchema, updateAnalystSchema } = require('../app/validators/analystSchema');
const authRequired = require('../app/middleware/validateToken');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analyst
 *   description: Analyst API
 */

routes.post("/analyst", validateSchema(createAnalystSchema), authRequired, analystController.createAnalyst);
routes.put("/analyst/:id", validateSchema(updateAnalystSchema), authRequired, analystController.updateAnalyst);
routes.post("/analyst/:id/restore", authRequired, analystController.restoreAnalyst);
routes.delete("/analyst/:id", authRequired, analystController.deleteAnalyst);
routes.get("/analyst/:id", authRequired, analystController.getAnalyst);
routes.get("/analyst", authRequired, analystController.getAllAnalysts);


module.exports = routes;
