const authController = require('../app/controllers/authControllerPF');
const routes = require('express').Router();

// Middlewares
const { validateSchema } = require('../app/middleware/validateSchema');
const { loginSchema } = require("../app/validators/authSchemaPF");
const authRequired = require('../app/middleware/validateToken');

/**
 * @swagger 
 * tags:
 * name: Auth
 * description: Auth API
 */
// Auth
routes.post("/auth/loginPF", validateSchema(loginSchema), authController.Login);
routes.post("/auth/logoutPF", authController.Logout);
routes.get("/profilePF", authRequired, authController.profile);
routes.get("/auth/verify-tokenPF", authController.verifyToken);

module.exports = routes;