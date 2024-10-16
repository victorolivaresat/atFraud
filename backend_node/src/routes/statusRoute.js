const statusController = require('../app/controllers/statusController');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Status API
 */
routes.post("/status", statusController.createStatus);
routes.put("/status/:id", statusController.updateStatus);
routes.post("/status/:id/restore", statusController.restoreStatus);
routes.delete("/status/:id", statusController.deleteStatus);
routes.get("/status/:id", statusController.getStatus);
routes.get("/statuses", statusController.getAllStatuses);

module.exports = routes;