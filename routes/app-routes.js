const router = require("express").Router();
const authController = require("../controllers/auth-controller.js");

// GET requests
router.get("/login", authController.getLogin);
router.get("/sign-up", authController.getSignUp);
// GET all users
router.get("/", authController.getAllUsers);

// POST requests
router.post("/users/login", authController.postLogin);
router.post("/users/sign-up", authController.postSignUp);

// PUT requests
router.put("/users/:id", authController.putPasswordAccount);

module.exports = router;