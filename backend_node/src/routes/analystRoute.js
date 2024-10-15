const analystCoontroller = require('../app/controllers/analystController');
const { validateSchema } = require('../app/middleware/validateSchema');
const { createAnalystSchema, updateAnalystSchema } = require('../app/validators/analystSchema');
const authRequired = require('../app/middleware/validateToken');
const express = require('express');
const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 */

// routes.post("/user", validateSchema(createAnalystSchema), authRequired, analystCoontroller.createUser);
// routes.put("/user/:id", validateSchema(updateAnalystSchema), authRequired, analystCoontroller.updateUser);
// routes.post("/user/:id/restore", authRequired, analystCoontroller.restoreUser);
// routes.delete("/user/:id", authRequired, analystCoontroller.deleteUser);
// routes.get("/user/:id", authRequired, analystCoontroller.getUser);
// routes.get("/user", authRequired, analystCoontroller.getAllUsers);

module.exports = routes;