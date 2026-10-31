const mongoose = require("mongoose")

const TeacherSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    subject:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model(
    "Teacher",
    TeacherSchema
)
