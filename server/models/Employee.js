const mongoose = require('mongoose');
const { DEPARTMENTS } = require('../constants/department');

const employeeSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true, unique: true
    },
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    phone : {type: String, required: true},
    position : {type: String, required: true},
    basicSalary : {type: Number, default: 0},
    allowances : {type: Number, default: 0},
    deductions : {type: Number, default: 0},
    employementStatus : {type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
    joinDate : {type: Date, required: true },
    isDeleted: {type: Boolean, default: false},
    bio : {type: String, default: ""},
    department : {type: String , enum : DEPARTMENTS}
    
}, {timestamps: true})

module.exports = mongoose.model('Employee', employeeSchema);