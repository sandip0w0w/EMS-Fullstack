const express = require('express')
const router = express.Router()
const authController = require("../controllers/authController")
const auth = require("../middleware/auth")

router.route("/login")
    .post(authController.login);

router.route("/session").get(auth.protect, authController.session)
router.route("/change-password").patch(auth.protect, authController.changePassword)


module.exports = router