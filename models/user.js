const mongoose = require("mongoose");
const validator = require("validator");

UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],        
    },
    email: {
        type: String,
        required: [true , "Please enter an email"],
        lowercase: true,
        unique: [true, validator]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        length: [8, "Please enter a password with a minimum of 8 characters"]
    }
});

module.exports = mongoose.model("User", UserSchema);