const Employee = require('../models/Employee')
const User = require('../models/User')
const bcrypt = require('bcrypt')

// GET Employee
const getAllEmployees = async (req, res) => {

    try {
        const { department } = req.query;

        const filter = department ? {department} : {}

        //query employees
        const employees = await Employee.find(filter)
        .sort({ createdAt : -1 })
        .populate("userId", "email role")
        .lean();

        const result = employees.map((emp) => ({
            id: emp._id.toString(),
            firstName: emp.firstName,
            lastName: emp.lastName,
            position: emp.position,
            phone: emp.phone,
            joinDate: emp.joinDate,
            bio: emp.bio,
            basicSalary: emp.basicSalary,
            allowances: emp.allowances,
            deductions: emp.deductions,
            employementStatus: emp.employementStatus,
            email: emp.email,
            department: emp.department,
            user: emp.userId
                ? {email: emp.userId.email, role: emp.userId.role }
                : null,
            isDeleted : emp.isDeleted
        }));
        return res.json(result);
    } catch (err){
        return res.status(404).json({error: 'Failed to fetch employees'} )
    }

}

// Create Employee

const createEmployee = async (req, res) => {

    try{
        const {firstName, lastName,
             phone, position,
            department, basicSalary, allowances,
            deductions, joinDate, password, role, bio,email,
        } = req.body;

        if(!email || !password || !firstName || !lastName){
            return res.status(400).json({error: "Missing required fields"});
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            password: hashed,
            role: role || "EMPLOYEE"

        })

        const employee = await Employee.create({
            userId: user._id,
            firstName,
            lastName,
            email,
            phone,
            position,
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            joinDate: new Date(joinDate),
            bio: bio || "",
        })

        return res.status(201).json({success: true, employee})
    } catch(err){
        if(err.code === 11000){
            return res.status(400).json({ error: "Email already exists "})
        }

        console.error("Create employee error:", err)
        return res.status(500).json({ error: "Failed to create employee"});
    }

}

// UPDATE employee

const updateEmployee = async(req, res) => {

     try{
        const { id } = req.params;
        const {firstName, lastName,
            email, phone, position,
            joinDate,
            department, basicSalary, allowances,
            deductions, password, role, bio, employmentStatus
        } = req.body;

        const employee = await Employee.findById(id);
        if(!employee) return res.status(404).json({error: "Employee not found"});

        await Employee.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phone,
            position,
            department: department || "Engineering",
            basicSalary: Number(basicSalary) || 0,
            allowances: Number(allowances) || 0,
            deductions: Number(deductions) || 0,
            joinDate: new Date(joinDate),
            employmentStatus: employmentStatus || "ACTIVE",
            bio: bio || "",
        })

        // update user records

        const userUpdate = {email}
        if(role) userUpdate.role = role;
        if(password) userUpdate.password = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(employee.userId, userUpdate)

        return res.json({success: true})
    } catch(err){
        if(err.code === 11000){
            return res.status(400).json({ error: "Email already exists "})
        }

        return res.status(500).json({ error: "Failed to update employee"});
    }

}

// Delete employee

const deleteEmployee = async(req, res) =>{

    try{
        
        const { id } = req.params;

        const employee = await Employee.findById(id);
        if(!employee) return res.status(404).json({error: "Employee not found"});

        employee.isDeleted = true;
        employee.employmentStatus = "INACTIVE";
        await employee.save();
        return res.json({ success: true });

    } catch(err){
        return res.status(500).json({ error: "Failed to delete employee"});
    }

}

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
}

