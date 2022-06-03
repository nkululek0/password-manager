const User = require("../models/user.js");

module.exports.searchAccount = async function(req, res) {
    let accountName = req.body.accountName.trim();

    try {
        // find the user based on the email and return accounts
        const userPasswordAccounts = await User.findOne({ email: req.params.email }, { _id: 0, accounts: 1 });

        // error for when the user is not found
        if(userPasswordAccounts === null) {
            return res.status(404).json({ error: "user not found" });
        }

        // returns password accounts based on user search
        const accounts = userPasswordAccounts.accounts.filter(function(item) {
            let expr = new RegExp(`^${ accountName }.*`, "i");
            if(expr.test(item.accountName)) {
                return item;
            }
        });

        res.json(accounts.slice(0, 10));
    } catch(err) {
        res.json({ error: err.message });
    }
}