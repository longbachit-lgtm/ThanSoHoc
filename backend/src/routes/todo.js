const express = require("express");
const router = express.Router();

const todoController = require("../app/controllers/TodoController");
const isAuth = require("../app/middleware/auth");

// Create new todo list
router.post("/", isAuth, todoController.create);

// Get all todo lists
router.get("/", isAuth, todoController.getAll);

// Get active todo list
router.get("/active", isAuth, todoController.getActive);

// Get todo list by period
router.get("/period", isAuth, todoController.getByPeriod);

// Update todo list
router.put("/:id", isAuth, todoController.update);

// Update section
router.put("/:id/section", isAuth, todoController.updateSection);

// Update item
router.put("/:id/item", isAuth, todoController.updateItem);

// Delete todo list
router.delete("/:id", isAuth, todoController.delete);

module.exports = router;

