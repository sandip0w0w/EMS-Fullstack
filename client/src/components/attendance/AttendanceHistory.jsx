import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { format } from 'date-fns';

function AttendanceHistory({ history }) {
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
                                background: "rgb(249, 251, 252)"
                            }} align="center">
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.length === 0 ? (
                        <TableRow>
                            <TableCell sx={{
                                color: 'rgb(179, 181, 184)',
                                fontSize: "13px",
                            }} colSpan={6} align="center">
                                No records found
                            </TableCell>
                        </TableRow>
                    ) : (history.map((row) => (

                        <TableRow
                            key={row.date}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {[
                                row.date ? format(row.date, 'MMM do, yyyy') : '-',
                                row.checkIn ? format(row.checkIn, 'h:mm a') : '-',
                                row.checkOut ? format(row.checkOut, 'h:mm a') : '-',
                                row.workingHours || 0,
                                row.dayType || 'In Progress',
                                row.status]
                                .map((value) => (
                                    <TableCell key={value} sx={{
                                        color: 'rgb(106, 107, 108)',
                                        fontSize: "13px",
                                    }}
                                        align="center">
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