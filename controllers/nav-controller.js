const User = require("../models/user");
const cryptoJs = require("crypto-js");


// PATCH requests
// submits content when creating a password account
module.exports.createPasswordAccount = async function(req, res) {
    let { accountName, accountUsername, accountPassword } = req.body;

    try {
        // find user based on email
        const user = await User.findOne({ email: req.params.email });
        
        // user does not exist error
        if(user === null) {
            return res.status(404).json({ error: "user not found" });
        }
        
        // password account already exists error
        if(indexValue(user.accounts, accountName) !== -1) {
            return res.status(400).json({ error: "account already exists, update instead?" });
        } else {
            accountPassword = encrypt(accountPassword);

            user.accounts.push({ accountName, accountUsername, accountPassword });
            await user.save();
        }
        
        console.log(`created account ${ accountName } for user ${ user.email }`);
        res.json({ user: user._id });
    } catch(err) {
        res.json({ error: err.message });
    }
}

// submit password account contents when updating account
module.exports.updatePasswordAccount = async function(req, res) {
    const { accountName, accountUsername, accountPassword } = req.body;

    try {
        // find user based on email
        const user = await User.findOne({ email: req.params.email });

        // user does not exist error
        if(user === null) {
            return res.status(404).json({ error: "user not found" });
        }
        
        // find password account index based on accountName
        let accountIndex = indexValue(user.accounts, req.params.accountName);
        
        // updating of the password account details if provided
        if(accountName !== user.accounts[accountIndex].accountName) {
            user.accounts[accountIndex].accountName = accountName;
        }
        if(accountUsername !== user.accounts[accountIndex].accountUsername) {
            user.accounts[accountIndex].accountUsername = accountUsername;
        }
        if(accountPassword !== user.accounts[accountIndex].accountPassword) {
            user.accounts[accountIndex].accountPassword = encrypt(accountPassword);
        }

        await user.save();
        
        console.log(`successfully updated password account details for user ${ user.email }`);
        res.json({ user: user._id });
    } catch(err) {
        res.json({ error: err.message });
    }
}

// GET requests
// delete password account
module.exports.deletePasswordAccount = async function(req, res) {
    try {
        // find user by email and delete specified password account
        const user = await User.findOneAndUpdate({ email: req.params.email }, { $pull: { 
                accounts: { 
                    accountName: req.params.accountName 
                }
            }
        });

        console.log(`successfully deleted password account ${ req.params.accountName} for user ${ req.params.email }`);
        res.json({ user: user._id });
    } catch(err) {
        res.json({ error: err.message });
    }
}

// delete user account
module.exports.deleteUserAccount = async function(req, res) {
    try {
        // delete user based off of the id
        await User.findByIdAndDelete(req.params.id);

        console.log(`successfully deleted user ${ req.params.email }`);
        res.cookie("login", "", { maxAge: 1 });
        res.redirect("/api/login");
    } catch(err) {
        res.json({ error: err.message });
    }
}

// logout user
module.exports.logoutUser = function(req, res) {
    res.cookie("login", "", { maxAge: 1 });
    res.redirect("/api/login");
}

// find the index and return it
function indexValue(arr, value) {
    return arr.findIndex(function(item) { return item.accountName.toLowerCase() === value.toLowerCase() });
}

// encrypt and return encrypted version of message
function encrypt(message) {
    return cryptoJs.AES.encrypt(message, process.env.SECRECT_KEY).toString();
}