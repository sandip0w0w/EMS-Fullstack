require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const connectDb = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes")
const employeeRoutes = require("./routes/employeeRoutes")
const profileRoutes = require("./routes/profileRoutes")
const attendanceRoutes = require("./routes/attendanceRoutes")


const app = express()
const PORT = process.env.PORT || 4000;

// connect mongoDb
connectDb();


// Middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())

// Routes

app.get("/", (req, res) => res.send("Server is running"))
app.use("/api/auth", authRoutes)
app.use("/api/employees", employeeRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/attendance", attendanceRoutes)



mongoose.connection.once('open', () => {
    console.log('MongoDb connected');
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })
})