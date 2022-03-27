const router = require("express").Router();
const navController = require("../controllers/nav-controller.js");

// PUT requests
router.patch("/users/:id", navController.patchPasswordAccount);


module.exports = router;