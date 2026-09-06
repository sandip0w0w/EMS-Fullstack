import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import LeaveApplication from "../models/LeaveApplication.js";
import { sendEmail } from "../config/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "fullstack-ems" });

//auto checkout for employees

const autoCheckOut = inngest.createFunction(
    { id: "auto-check-out" ,
        triggers : [{event: 'employee/check-out'}]
    },
    async ({ event, step }) => {
        const { employeeId, attendanceId } = event.data;

        await step.sleepUntil("wait-for-the-9-hours", new Date(new Date().getTime() + 9 * 60 * 60 * 1000));

        let attendance = await Attendance.findById(attendanceId)
        if (!attendance?.checkOut) {
            // get employee
            const employee = await Employee.findById(employeeId)

            // send reminder email
            await sendEmail({
                to: employee.email,
                subject: "Checkout Attendance Reminder",
                body: `Hi ${employee.firstName}, You have check-in in ${employee.department} today.
                at: ${attendance?.checkIn?.toLocaleTimeString()}. Please make sure to check-out in one hour.`
            })

            // after 10 hrs, mark attendance as checked out with status "LATE"
            await step.sleepUntil("wait-for-the-1-hour", new Date(new Date().getTime() + 1 * 60 * 60 * 1000));

            attendance = await Attendance.findById(attendanceId)
            if (!attendance?.checkOut) {

                attendance.checkOut = new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000;
                attendance.workingHours = 4;
                attendance.dayType = "Half Day";
                attendance.status = "LATE";
                await attendance.save();

            }
        }
    },
);


// send email to admin, if admin doesn't take action on leave application within 24hrs

const leaveApplicationReminder = inngest.createFunction(
    { id: "leave-application-reminder", 
        triggers : [{event: 'leave/pending'}]
    },
    async ({ event, step }) => {
        const { leaveApplicationId } = event.data;

        // wait for 24 hrs
        await step.sleepUntil("wait-for-the-24-hours", new Date(new Date().getTime() + 24 * 60 * 60 * 1000))

        const leaveApplication = await LeaveApplication.findById(leaveApplicationId);

        if (leaveApplication?.status === "PENDING") {
            const employee = await Employee.findById(leaveApplication.employeeId);

            // send reminder email to admin to take action on leave application
            await sendEmail({
                to: process.env.ADMIN_EMAIL,
                subject: 'Leave Appplication Reminder',
                body: `Hi Admin, you have pending leave application to take care of you.`
            })
        }
    }
);

// Cron: Check attendance at 11:30 AM  and email absent employees

const attendanceReminderCron = inngest.createFunction(
    { id: "attendance-reminder-cron",
        triggers : [{cron: "0 45 5 * * *"}]
     }, // 05:45 UTC = 11:30 AM Nepal Time
    async ({ step }) => {

        // step 1: get today's date
        const today = await step.run("get-today-date", () => {
            const startUTC = new Date(new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kathmandu" }) + "T00:00:00+05:30");
            const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);
            return { startUTC: startUTC.toISOString(), endUTC: endUTC.toISOString() }
        })

        // step 2: get all active , non-delete employees
        const activeEmployees = await step.run("get-active-employees", async () => {
            const employees = await Employee.find({
                isDeleted: false,
                employementStatus: "ACTIVE",
            }).lean();

            return employees.map((e) => ({
                _id: e._id.toString(),
                firstName: e.firstName,
                lastName: e.lastName,
                email: e.email,
                department: e.department
            }))
        })

        /// step 3: get employees Ids on approved leave today
        const onLeaveIds = await step.run("get-on-leave-ids", async () => {
            const leaves = await LeaveApplication.find({
                status: "APPROVED",
                startDate: { $lte: new Date(today.endUTC) },
                endDate: { $gte: new Date(today.startUTC) },
            }).lean();

            return leaves.map((l) => l.employeeId.toString())
        })

        // step 4: get employees ids who has already checked in 

        const checkedInIds = await step.run("get-checked-in-ids", async () => {
            const attendance = await Attendance.find({
                date: { $gte: new Date(today.startUTC), $lt: new Date(today.endUTC) },
            }).lean();
            return attendance.map((a) => a.employeeId.toString())
        })

        // step 5:  filter absent employees (not on leave and not checked in )

        const absentEmployees = activeEmployees.filter((emp) => !onLeaveIds.includes(emp._id) &&
            !checkedInIds.include(emp._id))

        // step 6: send reminder emails

        if (!absentEmployees.length > 0) {
            await step.run("send-reminder-emails", async () => {
                const emailPromises = absentEmployees.map((emp) => {
                    // send email
                    sendEmail({
                        to: emp.email,
                        subject: `Attendance Reminder- Please mark your attendance`,
                        body: `Hi, ${emp.firstName}, You've not yet marked your attendance.`
                    })
                })
            })
        }

        return {
            totalActive: activeEmployees.length,
            onLeave: onLeaveIds.length,
            checkedIn: checkedInIds.length,
            absent: absentEmployees.length
        }
    }
);


// Create an empty array where we'll export future Inngest functions
export const functions = [
    autoCheckOut,
    leaveApplicationReminder,
    attendanceReminderCron
];