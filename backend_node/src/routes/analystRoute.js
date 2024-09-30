const userController = require('../app/controllers/userController');
const { validateSchema } = require('../app/middleware/validateSchema');
const { createUserSchema, updateUserSchema } = require('../app/validators/userSchema');
const authRequired = require('../app/middleware/validateToken');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */

routes.post("/user", validateSchema(createUserSchema), authRequired, userController.createUser);
routes.put("/user/:id", validateSchema(updateUserSchema), authRequired, userController.updateUser);
routes.post("/user/:id/restore", authRequired, userController.restoreUser);
routes.delete("/user/:id", authRequired, userController.deleteUser);
routes.get("/user/:id", authRequired, userController.getUser);
routes.get("/user", authRequired, userController.getAllUsers);

module.exports = routes;
