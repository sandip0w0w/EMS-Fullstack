import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { dummyAttendanceData,getWorkingHoursDisplay } from '../../assets/assets';


function createData(date, checkIn, checkOut, workingHours, dayType, status) {
    return { date, checkIn, checkOut, workingHours, dayType, status };
}

function formatTime(isoString) {
  const timePart = isoString.split("T")[1]; 
  const cleanTime = timePart.split(".")[0].replace("Z", "");
  return cleanTime;
}

const rows = [
    createData(
        dummyAttendanceData[0].date.split('T')[0],
        formatTime(dummyAttendanceData[0].checkIn),
        formatTime(dummyAttendanceData[0].checkOut),
        getWorkingHoursDisplay(dummyAttendanceData[0]),
        dummyAttendanceData[0].dayType,
        dummyAttendanceData[0].status,
)
];

function AttendanceHistory() {
    return (
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        {['DATE', 'CHECK IN', 'CHECK OUT', 'WORKING HOURS', 'DAY TYPE', 'STATUS'].map((header) => (
                            <TableCell key={header} sx={{
                                color: 'rgb(99, 117, 142)',
                                fontSize: "11px",
                                fontWeight: '600',
                                background : "rgb(249, 251, 252)"
                            }} align="center">
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell sx={{
                                color: 'rgb(179, 181, 184)',
                                fontSize: "13px",
                            }} colSpan={6} align="center">
                                No records found
                            </TableCell>
                        </TableRow>
                    ) : (rows.map((row) => (

                        <TableRow
                            key={row.date}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {[`${row.date}`, `${row.checkIn}`, `${row.checkOut}`, `${row.workingHours}`, `${row.dayType}`, `${row.status}`].map((value) => (
                                <TableCell key={value} sx={{
                                color: 'rgb(106, 107, 108)',
                                fontSize: "13px",
                            }}
                            align = "center">
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AttendanceHistory