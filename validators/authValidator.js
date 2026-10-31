const {z} = require("zod")
const regSchema = z.object({
    fullname: z.string().trim().min(2).max(35),
    age: z.number().min(6).max(100).int(),
    email: z.string().trim().email(),
    password: z.string().min(5).max(20).regex(/\d/)
})

const logSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(5).regex(/\d/)
})

const sendSchema = z.object({
    email: z.string()
    .trim()
    .min(1, "Email cannot be empty!")
    .email("Invalid email format!")
})

const verifySchema = z.object({
    email: z.string()
    .trim()
    .min(1, "Email cannot be empty!")
    .email("Invalid email format!"),
    
    otp: z.string()
    .trim()
    .length(6, "OTP must be 6 characters long!")
    .regex(/^[0-9]+$/, "OTP must contain only numbers!")
})

module.exports = {regSchema, logSchema, sendSchema, verifySchema}