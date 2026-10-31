const Student = require("../models/Student")
const studentSchema = require("../validators/studentValidator")

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("teacher", "fullname email")
        res.json({ students })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.getStudentById = async (req, res) => {
    try {
        const id = req.params.id
        const student = await Student.findById(id)

    if(!student) {
       return res.status(404).json({
            message: "Student not found"
        })
    }
    res.status(200).json(student)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.createStudent = async (req, res) => {
    try {
        const studentvalidator = studentSchema.safeParse(req.body)

        if(!studentvalidator.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const student = await Student.create(studentvalidator.data)
        res.status(201).json(student)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
        
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const studentvalidate = studentSchema.safeParse(req.body)

        if(!studentvalidate.success) {
            return res.status(400).json({
                message: "Zod validation failed!"
            })
        }
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            studentvalidate.data,
            {new: true}
        )

        if(!student) {
           return res.status(404).json({
                message: "Student not found!"
            })
        }
        res.status(200).json(student)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        )

        if(!student) {
           return res.status(404).json({
                message: "Student not found!"
            })
        }
        res.status(200).json({
            message: "Student deleted successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}

exports.getStudentStats = async (req, res) => {
    try {
        const stats = await Student.aggregate([
            {
               $group:{
                  _id: "$course",
                  totalStudents: { $sum: 1 }
               }
            }
        ])
        res.status(200).json({ stats })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
}