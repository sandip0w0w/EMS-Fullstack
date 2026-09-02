import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react'
import { dummyPayslipData } from '../../assets/assets';
import { Download } from 'lucide-react';


function period_converter(month, year) {
    const month_name = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
    return `${month_name} ${year}`
}


function PaySlipTable() {
    const [rows, setRows] = useState(dummyPayslipData);
    const isAdmin = true;
    console.log(rows[0])

    return (
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        {isAdmin && (
                            ['EMPLOYEE', 'PERIOD', 'BASIC SALARY', 'NET SALARY', 'ACTIONS'].map((header) => (
                                <TableCell key={header} sx={{
                                    color: 'rgb(99, 117, 142)',
                                    fontSize: "11px",
                                    fontWeight: '600',
                                    background: "rgb(249, 251, 252)"
                                }} align="center">
                                    {header}
                                </TableCell>
                            ))
                        )}

                        {!isAdmin && (
                            ['PERIOD', 'BASIC SALARY', 'NET SALARY', 'STATUS'].map((header) => (
                                <TableCell key={header} sx={{
                                    color: 'rgb(99, 117, 142)',
                                    fontSize: "11px",
                                    fontWeight: '600',
                                    background: "rgb(249, 251, 252)"
                                }} align="center">
                                    {header}
                                </TableCell>
                            ))
                        )}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell sx={{
                                color: 'rgb(179, 181, 184)',
                                fontSize: "13px",
                            }} colSpan={6} align="center">
                                No payslips records
                            </TableCell>
                        </TableRow>
                    ) : (rows.map((row) => (

                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {isAdmin && [`${row.employee.firstName} ${row.employee.lastName} `,
                            `${period_converter(row.month, row.year)}`,
                            `${row.basicSalary}`, `${row.netSalary}`].map((value) => (
                                <TableCell key={value} sx={{
                                    color: 'rgb(106, 107, 108)',
                                    fontSize: "13px",
                                }}
                                    align="center">
                                    {value}
                                </TableCell>

                            ))}

                            {!isAdmin && [
                            `${period_converter(row.month, row.year)}`,
                            `${row.basicSalary}`, `${row.netSalary}`].map((value) => (
                                <TableCell key={value} sx={{
                                    color: 'rgb(106, 107, 108)',
                                    fontSize: "13px",
                                }}
                                    align="center">
                                    {value}
                                </TableCell>

                            ))}


                            <TableCell align='center'>
                                <Button
                                    variant="contained"
                                    startIcon={<Download size={12} />} // smaller icon
                                    sx={{
                                        backgroundColor: "rgb(239 246 255)",
                                        color: "rgb(21, 92, 253)",
                                        textTransform: "none",
                                        fontWeight: 400,
                                        fontSize: "10px",
                                        padding: "3px 14px",
                                        minHeight: "24px",
                                        minWidth: "60px",
                                        lineHeight: 1.2,
                                        boxShadow : "none",
                                    }}
                                    onClick={() => window.open(`/print/payslips/${row.id}`)}
                                >
                                    Download
                                </Button>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default PaySlipTable