const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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

UserSchema.post("save", function(doc, next) {
    console.log(`successfully created user ${ doc.user } under ${ doc.email }`);
    next();
});

module.exports = mongoose.model("User", UserSchema);