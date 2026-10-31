const Teacher = require("../models/Teacher")
const teacherSchema = require("../validators/teacherValidator")

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()
        res.json({ teachers })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.getTeacherById = async (req, res) => {
    try {
        const id = req.params.id
        const teacher = await Teacher.findById(id)

    if(!teacher) {
       return res.status(404).json({
            message: "Teacher not found"
        })
    }
    res.status(200).json(teacher)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.createTeacher = async (req, res) => {
    try {
        const teachervalidator = teacherSchema.safeParse(req.body)

        if(!teachervalidator.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const teacher = await Teacher.create(teachervalidator.data)
        res.status(201).json(teacher)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
        
    }
}

exports.updateTeacher = async (req, res) => {
    try {
        const teachervalidate = teacherSchema.safeParse(req.body)
        
        if(!teachervalidate.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id,
            teachervalidate.data,
            {new: true}
        )

        if(!teacher) {
           return res.status(404).json({
                message: "Teacher not found!"
            })
        }
        res.status(200).json(teacher)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(
            req.params.id
        )

        if(!teacher) {
           return res.status(404).json({
                message: "Teacher not found!"
            })
        }
        res.status(200).json({
            message: "Teacher deleted successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}