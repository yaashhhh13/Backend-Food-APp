const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const driverSchema = new mongoose.Schema({
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
    isVerifiedByAdmin: {
        type: Boolean,
        default: false,
        select: false
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
    },
    aadharNumber: {
        type: Number,
        required: true,
    },
    drivingLicense: {
        type: Boolean,
        required: true,
    },
    drivingLicenseNumber: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("driver",driverSchema);