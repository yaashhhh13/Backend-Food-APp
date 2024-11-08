const express = require("express");
const { userRegisterController, authController, loginController, verifyOTPController, UpdateProfileDetails } = require("../controller/user");
const protect = require("../middleware/authMiddleware");

router = express.Router()

router.post("/register", userRegisterController);

router.post("/get-user", protect, authController)

router.post("/login", loginController)

router.post("/verifyOTP", verifyOTPController)

router.put("/UpdateProfiledetails", protect, UpdateProfileDetails)

module.exports = router