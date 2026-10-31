const express = require("express")
const router = express.Router()
const controller = require("../controllers/studentController")
const { authMiddleware } = require("../middlewares/authMiddleware")

router.get("/students", authMiddleware, controller.getStudents)
router.get("/students/stats", authMiddleware, controller.getStudentStats)
router.get("/students/:id", authMiddleware, controller.getStudentById)
router.post("/students", authMiddleware, controller.createStudent)
router.put("/students/:id", authMiddleware, controller.updateStudent)
router.delete("/students/:id", authMiddleware, controller.deleteStudent)

module.exports = router