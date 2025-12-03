const express = require("express");
const router = express.Router();

const registrationCodeController = require("../app/controllers/RegistrationCodeController");
const authMiddleware = require("../app/middleware/auth");
const isAdmin = require("../app/middleware/isAdmin");

// Public route - validate code (no auth required)
router.post("/validate", registrationCodeController.validate);

// Protected routes - require authentication AND admin role
router.post("/", authMiddleware, isAdmin, registrationCodeController.create);
router.get("/", authMiddleware, isAdmin, registrationCodeController.getAll);
router.get("/:id", authMiddleware, isAdmin, registrationCodeController.getById);
router.put("/:id", authMiddleware, isAdmin, registrationCodeController.update);
router.delete("/:id", authMiddleware, isAdmin, registrationCodeController.delete);

module.exports = router;



