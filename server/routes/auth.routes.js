const express = require("express");
const authController = require("../controllers/auth.controller");
const authValidation = require("../middlewares/validation/authValidation");
const router = express.Router();

router.post("/", authValidation.adminCreation, authController.createAdmin);
router.post("/login", authValidation.validLogin, authController.loginAdmin);
router.get("/logout", authController.logoutAdmin);
router.get("/loggedIn", authController.loggedInAdmin);

module.exports = router;
