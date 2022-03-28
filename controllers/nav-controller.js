const User = require("../models/user");
const cryptoJs = require("crypto-js");

// PATCH request
// submits content when creating a password account
module.exports.createPasswordAccount = async function(req, res) {
    let { accountName, accountUsername, accountPassword } = req.body;

    try {
        const user = await User.findById(req.params.id);

        // user does not exist error
        if(user === null) {
            return res.status(404).json({ error: "user not found"});
        }
        
        // password account already exists error
        if(findValue(user.accounts, accountName)) {
            return res.status(400).json({ error: "account already exists, update instead?" });
        } else {
            accountPassword = encrypt(accountPassword);

            user.accounts.push({ accountName, accountUsername, accountPassword });
            await user.save();
        }

        console.log(`created account ${ accountName } for user ${ user.email }`);
        res.json({ user });
    } catch(err) {
        res.json({ error: err.message });
    }
}

module.exports.updatePasswordAccount = async function(req, res) {
    const { accountName, accountUsername, accountPassword } = req.body;
    const urlAccountName = req.params.id;

    try {
        // fetch user based on id
        const user = User.findById(req.params.id);
        // fetch account based on accountName
        let accountIndex = user.accounts.findIndex(function(item) {
            return item.accountName == urlAccountName;
        }); 
        console.log(accountIndex);

    } catch(err) {
        res.json({ error: err });
    }
}

// find a value and return true if it exists
function findValue(arr, value) {
    return arr.find(function(prop) { return prop.accountName === value });
}

// encrypt and return encrypted version of message
function encrypt(message) {
    return cryptoJs.AES.encrypt(message, process.env.SECRECT_KEY).toString();
}