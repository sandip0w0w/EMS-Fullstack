const { DEPARTMENTS } = require("../constants/department");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const LeaveApplication = require("../models/LeaveApplication");

// get dashboard for employee and admin

const getDashboard = async(req, res) => {
    try{
        const session = req.session;
        if(session.role === "ADMIN"){

            const results = await
            Promise.allSettled([
                Employee.countDocuments({ isDeleted: { $ne: true}}),
                Attendance.countDocuments({
                    date: {
                        $gte: new Date(new Date().setHours(0,0,0,0)),
                        $lt: new Date(new Date().setHours(24,0,0,0)),
                    }
                }),
                LeaveApplication.countDocuments({ status: "PENDING" })
            ]);

            const [employeeRes, attendaceRes , pendingLeaveRes ] = results;

            const totalEmployees = employeeRes.status === "fulfilled" ? employeeRes.value : 0;
            const todayAttendance = attendaceRes.status === "fulfilled" ? attendaceRes.value : 0;
            const pendingLeaves = pendingLeaveRes.status === "fulfilled" ? pendingLeaveRes.value : 0;

            return res.json({
                role: "ADMIN",
                totalEmployees,
                totalDepartments: DEPARTMENTS.length,
                todayAttendance,
                pendingLeaves
            })

        } else {
            const employee = await Employee.findOne({userId: session.userId}).lean();
            if(!employee) return res.status(404).json({error: "Employee Not Found"});

            const today = new Date();
            const results = await Promise.allSettled([
                Attendance.countDocuments({
                    employeeId: employee._id,
                    date: {
                        $gte: new Date(today.getFullYear(), today.getMonth(), 1),
                        $lte: new Date(today.getFullYear(), today.getMonth() + 1, 1)
                    }
                }),
                LeaveApplication.countDocuments({
                    employeeId: employee._id,
                    status: "PENDING",
                }),
                Payslip.findOne({employeeId: employee._id}).sort({createdAt: -1 }).lean()
            ]);

            const [attendanceRes, leaveApplicationRes, lastPayslipRes] = results;

            const currentMonthAttendance = attendanceRes.status === "fulfilled" ? attendanceRes.value : null;
            const pendingLeaves = leaveApplicationRes.status === "fulfilled" ? leaveApplicationRes.value : null;
            const latestPayslips = lastPayslipRes.status === "fulfilled" ? lastPayslipRes.value : null;

            return res.json({
                role: "EMPLOYEE",
                employee : {...employee, id: employee._id.toString()},
                currentMonthAttendance,
                pendingLeaves,
                latestPayslips
            });
        }

    }catch(error){
        console.error("Dashboard error: ", error);
        return res.status(500).json({ error: "Failed" });
    }
}

module.exports  = {
    getDashboard
}