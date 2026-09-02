import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'

function createData(type, date, reason, status) {
    return { type, date, reason, status};
}


const rows = [
   
];

function LeaveHistory() {
  return (
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        {['TYPE', 'DATE', 'REASON','STATUS'].map((header) => (
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
                                No leave applications found
                            </TableCell>
                        </TableRow>
                    ) : (rows.map((row) => (

                        <TableRow
                            key={row.date}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {[`${row.type}`, `${row.date}`, `${row.reason}`,`${row.status}`].map((value) => (
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

export default LeaveHistory