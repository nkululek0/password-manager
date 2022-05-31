const router = require("express").Router();
const searchAccountController = require("../controllers/search-account-controller.js");

router.post("/search-account/users/:email/:accountName", searchAccountController.searchAccount);

module.exports =  router; 