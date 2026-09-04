const express = require('express')
const router = express.ROUTER();
const profileController = require("../controllers/profileController")
const auth = require("../middleware/auth")

router.route("/")
        .get(auth.protect, profileController.getProfile)
        .post(auth.protect, profileController.updateProfile)

module.exports = router