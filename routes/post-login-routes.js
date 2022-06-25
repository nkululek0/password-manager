const router = require("express").Router();
const navController = require("../controllers/nav-controller.js");

// PATCH requests
router.patch("/create-password-account/users/:email", navController.createPasswordAccount);
router.patch("/update-password-account/users/:email/:accountName", navController.updatePasswordAccount);
router.patch("/delete-password-account/users/:email/:accountName", navController.deletePasswordAccount);

// GET requests
router.get("/decrypt-password/users/:accountPassword", navController.decryptPassword);
router.get("/logout/users", navController.logoutUser);

// DELETE requests
router.delete("/delete-user-account/users/:email", navController.deleteUserAccount);

module.exports = router;