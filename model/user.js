const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "please provide email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        select: false,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "confirm password & password should be same"
        },
    },
    isAdmin: {
        type: Boolean,
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    otp: {
        type: Number
    },
    profilePicture: {
        type: String
    },
    country: {
        type: String,
        required: false
    },
    State: {
        type: String,
        required: false
    },
    City: {
        type: String,
        required: false
    },
    PinCode: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("user",userSchema);