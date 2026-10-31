const express = require("express")
const router = express.Router()
const controller = require("../controllers/teacherController")
const { authMiddleware } = require("../middlewares/authMiddleware")

router.get("/teachers", authMiddleware, controller.getTeachers)
router.get("/teachers/:id", authMiddleware, controller.getTeacherById)
router.post("/teachers", authMiddleware, controller.createTeacher)
router.put("/teachers/:id", authMiddleware, controller.updateTeacher)
router.delete("/teachers/:id", authMiddleware, controller.deleteTeacher)

module.exports = router