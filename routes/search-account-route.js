const router = require("express").Router();
const searchAccountController = require("../controllers/search-account-controller.js");

router.get("/search-account/users/:email/:accountName", searchAccountController.searchAccount);

module.exports = { router }