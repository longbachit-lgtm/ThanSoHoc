const express = require("express");
const router = express.Router();

const registrationCodeController = require("../app/controllers/RegistrationCodeController");
const authMiddleware = require("../app/middleware/auth");

// Public route - validate code (no auth required)
router.post("/validate", registrationCodeController.validate);

// Protected routes - require authentication
router.post("/", authMiddleware, registrationCodeController.create);
router.get("/", authMiddleware, registrationCodeController.getAll);
router.get("/:id", authMiddleware, registrationCodeController.getById);
router.put("/:id", authMiddleware, registrationCodeController.update);
router.delete("/:id", authMiddleware, registrationCodeController.delete);

module.exports = router;

