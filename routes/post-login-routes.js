const router = require("express").Router();
const navController = require("../controllers/nav-controller.js");

// PATCH requests
router.patch("/users/:id", navController.createPasswordAccount);
router.patch("/users/:id/:accountName", navController.updatePasswordAccount);


module.exports = router;