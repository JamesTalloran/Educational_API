const {z} = require("zod")
const teacherSchema = z.object({
    fullname: z.string().trim().min(2).max(30),
    email: z.string().trim().email(),
    subject: z.string().trim().min(1),
    phone: z.string().trim().regex(/^\+\d+$/).min(8).max(16)
})
module.exports = teacherSchema