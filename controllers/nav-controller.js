const User = require("../models/user");

// PUT request
// submits content when creating a password account
module.exports.createPasswordAccount = async function(req, res) {
    const { accountName, accountUsername, accountPassword } = req.body;

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
            user.accounts.push({ accountName, accountUsername, accountPassword });
            await user.save();
        }
        console.log(`created account ${ accountName } for user ${ user.email }`);
        res.json({ user });
    } catch(err) {
        res.json({ error: err.message });
    }
}

// find a value and return true if it exists
function findValue(arr, value) {
    return arr.find(function(prop) { return prop.accountName === value });
}