const router = require("express").Router();
const navController = require("../controllers/nav-controller.js");

// PATCH requests
router.patch("/users/:id", navController.createPasswordAccount);
router.patch("/users/:id/:accountName", navController.updatePasswordAccount);

// GET requests
router.get("/users/:id/:accountName", navController.deletePasswordAccount);

// DELETE requests
router.delete("/users/:id/:email", navController.deleteUserAccount);

module.exports = router;