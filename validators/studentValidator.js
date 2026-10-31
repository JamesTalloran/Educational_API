const {z} = require("zod")
const studentSchema = z.object({
    fullname: z.string().trim().min(2).max(30),
    age:  z.number().int().min(16).max(90),
    email: z.string().trim().email(),
    course: z.string().trim().min(1),
    isActive: z.boolean(),
    teacher: z.string().trim().regex(/^[0-9a-fA-F]{24}$/)
})
module.exports = studentSchema