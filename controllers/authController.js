const User = require("../models/User")
const bcrypt = require("bcrypt")
const transporter = require("../config/mail")
const { regSchema,  logSchema,  sendSchema, verifySchema } = require("../validators/authValidator")
const generateToken = require("../utils/generateToken")

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.regUser = async (req, res) => {
    try {
        const validate = regSchema.safeParse(req.body)

        if(!validate.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const {fullname, age, email, password} = validate.data
        
        const existUser = await User.findOne({ email })
        if(existUser) {
            return res.status(400).json({
                message: "A user with this email already exists!"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            fullname, age, email, password: hashPassword
        })
        res.status(201).json({
            message: "User registered!",
            user: {
                fullname: newUser.fullname,
                age: newUser.age,
                email: newUser.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.logUser = async (req, res) => {
    try {
        const validator = logSchema.safeParse(req.body)

        if(!validator.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const {email, password} = validator.data

        const user = await User.findOne({email})
        
        if(!user) {
            return res.status(400).json({
                message: "You are not registered!"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).json({
                message: "Wrong password!"
            })
        }
        const token = generateToken(user)
        res.status(200).json({
            message: "User Logged!",
            token
        })
    } catch (error) {
        console.log(error)
      res.status(500).json({
        message: "Internal Server Error!"
      })  
    }
}
const otpStore = {}

exports.sendingOTP = async (req, res) => {
    try {
        const otpvalidate = sendSchema.safeParse(req.body)
        
        if(!otpvalidate.success) {
            return res.status(400).json({
                message: "Invalid email!"
            })
        }
        const {email} = otpvalidate.data
        const OTP = Math.floor(100000 + Math.random() * 900000)

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verification Code",
            text: `Your personal code ${OTP}`
        })
        otpStore[email] = String(OTP)

        res.status(200).json({
            message: "Verification Code sent!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.verifyingOTP = async (req, res) => {
    try {
        const verifyvalidate = verifySchema.safeParse(req.body)
        
        if(!verifyvalidate.success) {
            return res.status(400).json({
                message: "Invalid Email or OTP code!"
            })
        }
        const {email, otp} = verifyvalidate.data

        if(otpStore[email] === otp) {
            delete otpStore[email]

           return res.status(200).json({
                message: "OTP Code Verifyed!"
            })
        }
        res.status(400).json({
            message: "Invalid OTP Code!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.profile = async (req, res) => {
    try {
        res.status(200).json({
            message: "Welcome to your personal page!"
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: "Token required!"
        })
    }
}