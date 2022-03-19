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
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
        console.log(`logged in user ${ user.username } under ${ users.email }`);
        res.json( user );
    } catch(err) {
        const errorMessage = loginErrors(err);
        res.json({ errorMessage });
    }
}

module.exports.postSignUp = async function(req, res) {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        console.log(`successfully created user ${ user.username } under ${ user.email }`);
        res.json({ user });
    } catch(err) {
        const errorMessages = signUpErrors(err);
        res.json({ errorMessages });
    }
}

// function that deals with errors for postSignUp
function signUpErrors(err) {
    let errorMessages = { username: "", email: "", password: "" };

    // duplicate email error
    if(err.code === 11000) {
        errorMessages.email = "This email is already registered";
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

// handles errors for loginPost
function loginErrors(err) {
    let errorMessages = { username: "", password: "" };

    if(err.message = "Incorrect user") {
        errorMessages.username = "Incorrect user";
        return errorMessages;
    }

    if(err.message = "Incorrect password") {
        errorMessages.password = "Incorrect password";
    }
    console.log(err);

}