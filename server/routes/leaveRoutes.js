const express = require('express')
const router = express.Router();
const leaveController = require("../controllers/leaveController");
const { protect, protectAdmin } = require('../middleware/auth');

router.route("/")
    .get(protect, leaveController.getLeave)
    .post(protect, leaveController.createLeave);

router.route("/:id").patch(protect, protectAdmin, leaveController.updateLeaveStatus);
module.exports = router