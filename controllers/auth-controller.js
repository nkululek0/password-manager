const User = require("../models/user.js");

// GET requests
module.exports.getLogin = (req, res) => {
    res.send("login page");
}