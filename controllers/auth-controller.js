const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

// GET requests
// renders sign up page
module.exports.getSignUp = function(req, res) { res.send("sign up page"); }

// renders login page
module.exports.getLogin = function (req, res) { res.send("login page"); }

// gets all users
module.exports.getAllUsers = async function(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}


// POST requests
// submits content on sign up page
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

// submits content on login page
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

// submits content when creating a password account
module.exports.putPasswordAccount = async function(req, res) {
    const { accountName, accountUsername, accountPassword } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $push: {
                accounts: { accountName, accountUsername, accountPassword }
            }
        });
        if(user === null) {
            res.status(404).json({ error: "user not found"});
        }
        res.json({ user });
    } catch(err) {
        res.json({ error: err.message });
    }
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
    return jwt.sign({ payload }, process.env.SECRECT_KEY, { expiresIn: maxAge });
}