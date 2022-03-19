const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller.js");

// GET requests
router.get("/login", authController.getLogin);

module.exoprts = { router };