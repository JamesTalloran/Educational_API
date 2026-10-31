const express = require("express")
const router = express.Router()
const controller = require("../controllers/authController")
const { authMiddleware } = require("../middlewares/authMiddleware")

router.post("/register", controller.regUser)
router.post("/login", controller.logUser)
router.get("/profile", authMiddleware, controller.profile)
router.post("/send-otp", controller.sendingOTP)
router.post("/verify-otp", controller.verifyingOTP)

module.exports = router