const express = require("express");
const router = express.Router();

const authController = require("../app/controllers/AuthController");
const { registerValidation, loginValidation, validate } = require("../app/middleware/validator");

router.post("/register", registerValidation, validate, authController.register);
router.post("/login", loginValidation, validate, authController.login);
router.post("/refresh", authController.refreshToken);

module.exports = router;

