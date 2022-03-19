const User = require("../models/user.js");

// GET requests
module.exports.getLogin = function (req, res) {
    res.send("login page");
}

module.exports.getSignUp = function(req, res) {
    res.send("sign up page");
}

// POST requests
module.exports.postLogin = function(req, res) {
    res.send("Login data sent");
}

module.exports.postSignUp = function(req, res) {
    res.send("Sign up data sent");
}