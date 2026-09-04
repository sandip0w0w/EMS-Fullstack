const express = require('express')
const router = express.Router()
const employeeController = require("../controllers/employeeController")
const auth = require("../middleware/auth")

router.route("/")
    .get(auth.protect, auth.protectAdmin, employeeController.getAllEmployees)
    .post(auth.protect, auth.protectAdmin, employeeController.createEmployee);


router.route("/:id")
    .put(auth.protect, auth.protectAdmin, employeeController.updateEmployee)
    .delete(auth.protect, auth.protectAdmin, employeeController.deleteEmployee);

    

module.exports = router