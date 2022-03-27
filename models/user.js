const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const cryptoJs = require("crypto-js");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true , "Please enter an email"],
        lowercase: true,
        unique: [isEmail, "Please enter vaild email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [8, "Please enter a password with a minimum of 8 characters"]
    },
    accounts: [{
        accountName: String,
        accountUsername: String,
        accountPassword: String
    }]
});


// code to completed before documents are saved
UserSchema.pre("save", async function(next) {
    if(this["__v"] === undefined) {
        let salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    
    if(this.accounts.length) {
        let password = cryptoJs.AES.encrypt(
            this.accounts[this.accounts.length -1].accountPassword,
            process.env.SECRECT_KEY
            ).toString();

        this.accounts[this.accounts.length -1].accountPassword = password;
    }
    next();
});

// login functionality where inserted password are verified before user is logged in
UserSchema.statics.login = async function(email, password) {
    let user = await this.findOne({ email });

    if(user) {
        let authUser = await bcrypt.compare(password, user.password);
        if(authUser) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
}

module.exports = mongoose.model("User", UserSchema);