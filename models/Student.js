const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
    fullname: String,
    age: Number,
    email: String,
    course: String,
    isActive: Boolean,
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
})
module.exports = mongoose.model(
    "Student",
    StudentSchema
)