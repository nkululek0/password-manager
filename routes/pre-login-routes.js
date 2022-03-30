const router = require("express").Router();
const authController = require("../controllers/auth-controller.js");

// GET requests
router.get("/sign-up", authController.getSignUp);

// POST requests
router.post("/login/users", authController.postLogin);
router.post("/sign-up/users", authController.postSignUp);


module.exports = router;