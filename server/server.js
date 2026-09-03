require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const connectDb = require('./config/db');
const mongoose = require('mongoose');


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


mongoose.connection.once('open', () => {
    console.log('MongoDb connected');
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    })
})