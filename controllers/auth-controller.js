const User = require("../models/user.js");

// GET requests
module.exports.getLogin = function (req, res) {
    res.send("login page");
}

module.exports.getSignUp = function(req, res) {
    res.send("sign up page");
}

// POST requests
module.exports.postLogin = async function(req, res) {
    res.send("login data sent");
}

module.exports.postSignUp = async function(req, res) {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        console.log(`user ${user.username} successfully created`);
        res.json({ user });
    } catch(err) {
        const errorMessages = signUpErrors(err);
        res.json({ errorMessages });
    }
}

// function that deals with errors
function signUpErrors(err) {
    let errorMessages = { username: "", email: "", password: "" };

    // duplicate email error
    if(err.code === 11000) {
        errorMessages.email = "This email is already registered"
        console.log(errorMessages);
        return errorMessages;
    }

    // validation errors
    if(err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(function({ properties }) {
            errorMessages[properties.path] = properties.message;
        });
        return errorMessages;
    }
}