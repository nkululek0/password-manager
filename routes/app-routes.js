const router = require("express").Router();
const authController = require("../controllers/auth-controller.js");

// GET requests
router.get("/api/login", authController.getLogin);
router.get("/api/sign-up", authController.getSignUp);

// POST requests
router.post("/api/login", authController.postLogin);
router.post("/api/sign-up", authController.postSignUp);
module.exports = router;