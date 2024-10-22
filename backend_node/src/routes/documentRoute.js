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

// Ruta para obtener los documentos por caso
routes.get("/documents/:caseId", authRequired, documentController.getDocumentsByCaseId);
routes.post("/documents/upload", authRequired, upload.single("document"), documentController.addDocumentToCase);


module.exports = routes;