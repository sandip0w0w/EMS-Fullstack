const express = require('express')
const router = express.Router();
const paySlipController = require("../controllers/paySlipController")
const { protect, protectAdmin } = require("../middleware/auth")

router.route("/")
    .get(protect, paySlipController.getPaySlips)
    .post(protect, protectAdmin, paySlipController.createPaySlips);

router.get("/:id", protect, paySlipController.getPaySlipsById);

module.exports = router