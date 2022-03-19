const User = require("../models/user.js");

// GET requests
module.exports.getLogin = function (req, res) {
    res.send("login page");
}