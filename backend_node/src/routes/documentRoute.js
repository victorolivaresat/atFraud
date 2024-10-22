const documentController = require("../app/controllers/documentController");
const authRequired = require("../app/middleware/validateToken");
const express = require('express');
const routes = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/cases" });

/**
 * @swagger
 * tags:
 *   name: Document
 *   description: Document API
 */

routes.get("/documents/:caseId", authRequired, documentController.getDocumentsByCaseId);
routes.post("/documents/upload", authRequired, upload.single("document"), documentController.addDocumentToCase);
routes.delete("/documents/:documentId", authRequired, documentController.deleteDocumentById);

module.exports = routes;