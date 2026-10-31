require("dotenv").config({ path: "secret.env" })
const express = require("express")
const studentRouter = require("./routes/studentRoutes")
const teacherRouter = require("./routes/teacherRoutes")
const authRouter = require("./routes/authRoutes")
const mongooseDB = require("./config/db")
const app = express()

mongooseDB()
app.use(express.json())
app.use("/api", studentRouter)
app.use("/api", teacherRouter)
app.use("/api", authRouter)

app.get("/", (req, res) => {res.send("Welcome!")})

app.use((req, res) => {res.status(404).send("Not found")})
app.listen(3600, () => {console.log("Server running on port 3600!")})