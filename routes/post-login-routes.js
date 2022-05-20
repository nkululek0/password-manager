const router = require("express").Router();
const navController = require("../controllers/nav-controller.js");

// PATCH requests
router.patch("/create-password-account/users/:email", navController.createPasswordAccount);
router.patch("/update-password-account/users/:id/:accountName", navController.updatePasswordAccount);

// GET requests
router.get("/delete-password-account/users/:id/:accountName", navController.deletePasswordAccount);
router.get("/logout/users", navController.logoutUser);

// DELETE requests
router.delete("/delete-user-account/users/:id/:email", navController.deleteUserAccount);

module.exports = router;