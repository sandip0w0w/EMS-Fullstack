const express = require('express')
const router = express.Router()
const attendanceController = require("../controllers/attendanceController")
const { protect } = require('../middleware/auth')


router.route("/")
    .post(protect, attendanceController.clockInOut)
    .get(protect, attendanceController.getAttendance)


module.exports = router