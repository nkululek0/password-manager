const router = require("express").Router();
const authController = require("../controllers/auth-controller.js");

// GET requests
router.get("/login", authController.getLogin);

module.exports = router;