const express = require("express");
const router = express.Router();

const numerologyController = require("../app/controllers/NumerologyController");
const isAuth = require("../app/middleware/auth");
const { numerologyValidation, validate } = require("../app/middleware/validator");

router.post("/save", isAuth, numerologyValidation, validate, numerologyController.save);
router.get("/my-data", isAuth, numerologyController.getMyData);
router.get("/history", isAuth, numerologyController.getHistory);
router.delete("/:id", isAuth, numerologyController.delete);

module.exports = router;

