const fraudMotiveController = require('../app/controllers/fraudMotiveController');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: FraudMotive
 *   description: Fraud Motive API
 */
routes.post("/fraudmotive", fraudMotiveController.createFraudMotive);
routes.put("/fraudmotive/:id", fraudMotiveController.updateFraudMotive);
routes.post("/fraudmotive/:id/restore", fraudMotiveController.restoreFraudMotive);
routes.delete("/fraudmotive/:id", fraudMotiveController.deleteFraudMotive);
routes.get("/fraudmotive/:id", fraudMotiveController.getFraudMotive);
routes.get("/fraudmotives", fraudMotiveController.getAllFraudMotives);

module.exports = routes;