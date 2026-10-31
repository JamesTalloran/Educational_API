require("dotenv").config({ path: "secret.env" })
const mongoose = require("mongoose")

async function mongoDB() {
    try {
        await mongoose.connect(
        process.env.Database_url
    )
    console.log("MongoDB connected!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = mongoDB