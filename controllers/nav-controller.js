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
            // encrypt password for password account and add password accounts to accounts array 
            accountPassword = encrypt(accountPassword);

            // ensures that first letter is in uppercase
            accountName = accountName.replace(accountName[0], accountName[0].toUpperCase());

            await User.findOneAndUpdate({ email: req.params.email }, {
                $push: {
                    accounts: {
                        accountName, accountUsername, accountPassword
                    }
                }
            });
        }
        
        console.log(`created account ${ accountName } for user ${ req.params.email }`);
        res.json({ user: user._id });
    } catch(err) {
        res.json({ error: err.message });
    }
}

// submit password account contents when updating account
module.exports.updatePasswordAccount = async function(req, res) {
    let { accountName, accountUsername, accountPassword } = req.body;

    // decrypt account password before attempting tp update password account
    accountPassword = decrypt(accountPassword) ? decrypt(accountPassword) : accountPassword;

    try {
        // encryption of password before updating password account
        accountPassword = encrypt(accountPassword);

        // find user based on email and update specified password account
        const user = await User.findOneAndUpdate({
            email: req.params.email,
            "accounts.accountName": req.params.accountName
        }, {
            $set: {
                "accounts.$.accountName": accountName,
                "accounts.$.accountUsername": accountUsername,
                "accounts.$.accountPassword": accountPassword
            }
        });

        // user does not exist error
        if(user === null) {
            return res.status(404).json({ error: "user not found" });
        }
        
        console.log(`successfully updated ${ accountName } password account details of user ${ req.params.email }`);
        res.json({ user: user._id });
    } catch(err) {
        res.json({ error: err.message });
    }
}

// GET requests
// encrypt password
module.exports.encryptPassword = function(req, res) {
    res.json({ password: encrypt(req.params.accountPassword) });
}

// decrypt password
module.exports.decryptPassword = function(req, res) {
    res.json({ password: decrypt(req.params.accountPassword) });
}

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

        console.log(`successfully deleted password account ${ req.params.accountName} of user ${ req.params.email }`);
        res.json({ user: user._id });
    } catch(err) {
        res.json({ error: err.message });
    }
}

// delete user account
module.exports.deleteUserAccount = async function(req, res) {
    try {
        // delete user based off of the id
        await User.findOneAndDelete({ email: req.params.email });

        console.log(`successfully deleted user ${ req.params.email }`);
        res.cookie("login", "", { maxAge: 1 });
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
    return cryptoJs.AES.encrypt(message, process.env.SECRET_KEY).toString();
}

// decrypt and return decrypted version of message
function decrypt(message) {
    let bytes = cryptoJs.AES.decrypt(message, process.env.SECRET_KEY);
    return bytes.toString(cryptoJs.enc.Utf8);
}