const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// GET requests
// renders sign up page
module.exports.getSignUp = function(req, res) { res.send("sign up page"); }

// renders login page
module.exports.getLogin = function (req, res) { res.send("login page"); }


// POST requests
// submits content on sign up page
module.exports.postSignUp = async function(req, res) {
    let { username, email, password } = req.body;

    try {
        password = await encrypt(password);
        const user = await User.create({ username, email, password });

        console.log(`successfully created user ${ user.email }`);
        res.status(201).json({ user });
    } catch(err) {
        const errorMessages = signUpErrors(err);
        console.log(errorMessages);
        res.json({ errorMessages });
    }
}

// submits content on login page
module.exports.postLogin = async function(req, res) {
    let { email, password } = req.body;

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

// encrypts and returns encrypted version of message
async function encrypt(message) {
    try {
        let salt = await bcrypt.genSalt();
        return await bcrypt.hash(message, salt);
    } catch(err) {
        res.json({ error: err });
    }
}

// jwt and cookie configuration
const maxAge = 600;

function createToken(payload) {
    return jwt.sign({ payload }, process.env.SECRECT_KEY, { expiresIn: maxAge });
}


// function that deals with errors for postSignUp
function signUpErrors(err) {
    let errorMessages = { username: "", email: "", password: "" };

    // duplicate email error
    if(err.code === 11000) {
        errorMessages.email = "This email is already registered";
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
    if(err.message === "Incorrect user") {
        errorMessages.email = "Please enter valid email";
        return errorMessages;
    }

    // incorrect password error
    if(err.message === "Incorrect password") {
        errorMessages.password = "Please enter valid password";
        return errorMessages;
    }
}
