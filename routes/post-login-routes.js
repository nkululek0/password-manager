const router = require("express").Router();
const navController = require("../controllers/nav-controller.js");

// PUT requests
router.patch("/users/:id", navController.createPasswordAccount);


module.exports = router;