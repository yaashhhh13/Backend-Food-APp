const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.js");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");


const userRegisterController = async (req, res) => {

    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({
                message: "User already exists",
                success: false
            });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;

        const confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);

        const otp = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            upperCase: false,
            specialChars: false
        });

        req.body.confirmPassword = confirmPassword;

        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            otp: otp
        });

        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "yashh.s1333@gmail.com",
                pass: "mygamecskovdutgp"
            }
        });

        const mailOptions = {
            from: "Food Delivery App",
            to: req.body.email,
            subject: "OTP for email verification",
            text: `Your OTP for verification is ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error sending email");
            }
            // Send response only after the email is sent successfully
            res.status(201).send({
                message: "OTP sent to email",
                data: {
                    user: newUser,
                    token
                },
                success: true
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error registering user",
            success: false
        });
    }
};


const authController = async (req, res) => {
    try {
        const user = await userModel.findOne({
            _id: req.body.userId
        })

        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false
            })
        } else {
            // console.log(user)
            return res.status(200).send({
                message: "user registered successfully",
                data: {
                    user
                },
                success: true
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(500).send({
            success: false,
            message: `Auth error`,
        })
    }
}


const loginController = async (req, res) => {
    // console.log(req.body)
    try {
        // console.log(req.body)
        const user = await userModel.findOne({
            email: req.body.email
        }).select("+password")
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        const signInUser = await userModel.findOne({
            email: req.body.email
        })

        if (!isMatch) {
            return res.status(200).send({
                message: "invalid email or password",
                success: false
            })
        }

        const token = jwt.sign({ id: signInUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // console.log(user)
        return res.status(201).send({
            message: "user logged in successfully",
            data: {
                user: signInUser,
                token
            },
            success: true
        })

    } catch (error) {
        console.log(error)

        return res.status(500).send({
            success: false,
            message: `Auth error`,
        })
    }
}


const verifyOTPController = async (req, res) => {
    try {
        const user = await userModel.findOne({
            email: req.body.email
        })
        if (user.otp === req.body.combineotp) {
            user.isVerified = true
            await user.save();
            res.status(200).send({
                success: true,
                message: `OTP verified successfully`
            })
        } else {
            res.status(200).send({
                success: false,
                message: "OTP not verified"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: `failed to verify OTP`
        })
    }
}


const UpdateProfileDetails = async (req, res) => {
    try {

        const { name, email, City, State, country, PinCode, profilePicture,role } = req.body

        // console.log(req.body)

        const user = await userModel.findById(req.body.userId);

        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false
            })
        }

        user.name = name || user.name
        user.email = email || user.email
        user.City = City || user.City
        user.State = State || user.State
        user.country = country || user.country
        user.PinCode = PinCode || user.PinCode
        user.profilePicture = profilePicture || user.profilePicture
        user.role = role || user.role

        await user.save();

        return res.status(201).send({
            message: "profile details updated succesfully",
            success: true
        })

    } catch (error) {
        console.log(error)

        return res.status(500).send({
            success: false,
            message: `Auth error`,
        })
    }
}



module.exports = { userRegisterController, authController, loginController, verifyOTPController, UpdateProfileDetails };