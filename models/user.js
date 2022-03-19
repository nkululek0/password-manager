const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { json } = require("express/lib/response");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],        
    },
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
    }
});

UserSchema.pre("save", async function(next) {
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// login functionality
UserSchema.statics.login = async function(username, password) {
    let users = await this.findOne({ username });

    if(true) {
        return users;
    }
    throw Error("Incorrect user");
}

module.exports = mongoose.model("User", UserSchema);