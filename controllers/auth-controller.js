const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

// GET requests
module.exports.getLogin = function (req, res) {
    res.send("login page");
}

module.exports.getSignUp = function(req, res) {
    res.send("sign up page");
}

// POST requests
module.exports.postSignUp = async function(req, res) {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        console.log(`successfully created user ${ user.email }`);
        res.json({ user });
    } catch(err) {
        const errorMessages = signUpErrors(err);
        console.log(errorMessages);
        res.json({ errorMessages });
    }
}

module.exports.postLogin = async function(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        let token = createToken(user._id);
        res.cookie("login", token, { maxAge: maxAge * 1000 });
        console.log(`logged in user ${ user.email }`);
        res.json({ user });
    } catch(err) {
        const errorMessages = loginErrors(err);
        console.log(errorMessages);
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
    let errorMessages = { email: "", password: "" };

    // incorrect email error
    if(err.message = "Incorrect user") {
        errorMessages.email = "Please enter valid email";
        return errorMessages;
    }

    // incorrect password error
    if(err.message = "Incorrect password") {
        errorMessages.password = "Please enter valid password";
        return errorMessages;
    }
}

// jwt and cookie configuration
const maxAge = 600;

function createToken(payload) {
    return jwt.sign({ payload }, "secrect key", { expiresIn: maxAge });
}