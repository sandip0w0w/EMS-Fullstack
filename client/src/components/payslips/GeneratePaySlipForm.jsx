import React, { useState } from 'react'
import { Box, Button, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Send, X } from 'lucide-react';
import { dummyEmployeeData } from '../../assets/assets';
import api from '../../api/axios';
import toast from 'react-hot-toast';

function GeneratePaySlipForm({ onClose, employees, fetchPayslips }) {

    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [month, setMonth] = useState(1);
    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            await api.post('/payslips', data);
            onClose(false);
            fetchPayslips();
        } catch (err) {
            toast.error(err?.response?.data?.error || err?.message);
        }
    }
    return (
        <Stack sx={{
            background: "white",
            minWidth: "300px",
            width: "35%",
            borderRadius: "5px",
            padding: "20px 20px",
            maxHeight: "85vh",
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            gap: 2

        }}>
            {/* header */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Typography sx={{
                        fontSize: "16px",
                        fontWeight: '700'
                    }}>Generate Monthly Payslip</Typography>
                </Box>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    color: 'rgb(115, 131, 153)',
                    p: 1,
                    borderRadius: "5px",

                    '&:hover': {
                        background: "rgb(240, 241, 243)",
                        color: "rgb(63, 65, 68)"
                    }
                }}
                    onClick={() => onClose(false)}>
                    <X size={'18'} />
                </Box>
            </Box>

            {/* form content */}

            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>

                    {/* Employee */}
                    <Box>
                        <Typography sx={{
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>Employee</Typography>
                        <Select name="employeeId" value={selectedEmployee}
                            size='small'
                            sx={{ mt: 1, width: "100%", fontSize: "13px" }}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                        >
                            {employees.map((employee) => (
                                <MenuItem value={employee.id}> {`${employee.firstName} 
                                    ${employee.lastName} 
                                    (${employee.position} - 
                                    ${employee.department})`}</MenuItem>
                            ))}

                        </Select>
                    </Box>

                    {/* time */}

                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 3,
                        alignItems: "center"
                    }}>
                        {/* month */}
                        <Box sx={{ width: "100%" }}>
                            <Typography sx={{ fontSize: "13px" }}> Month </Typography>
                            <Select name="month" size='small' sx={{ mt: 1, width: "100%", fontSize: "13px" }}
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}>
                                {numbers.map((num) => (
                                    <MenuItem value={num}> {num}</MenuItem>
                                ))}

                            </Select>
                        </Box>

                        {/* year */}
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography sx={{ fontSize: "13px" }} >Year</Typography>
                            <TextField name="year" size='small'
                                sx={{
                                    "& .MuiInputBase-root": {
                                        padding: "1px 3px"
                                    }
                                }}
                                type='number' defaultValue={new Date().getFullYear()} fullWidth
                            />
                        </Box>
                    </Box>

                    {/* basic salary */}
                    <Box>
                        <Typography sx={{ fontSize: "13px" }} >Basic Salary</Typography>
                        <TextField name="basicSalary" size='small'
                            sx={{
                                "& .MuiInputBase-root": {
                                    padding: "1px 3px"
                                }, mt: 1
                            }}
                            type='number' fullWidth
                        />
                    </Box>

                    {/* allowance and deductions */}

                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 3
                    }}>
                        {/* allowance */}
                        <Box sx={{ width: "100%" }}>
                            <Typography sx={{ fontSize: "13px" }} >Allowance</Typography>
                            <TextField name="allowances" size='small'
                                sx={{
                                    "& .MuiInputBase-root": {
                                        padding: "1px 3px"
                                    }, mt: 1
                                }}
                                type='number' fullWidth
                            />
                        </Box>

                        {/* deductions */}

                        <Box sx={{ width: "100%" }}>
                            <Typography sx={{ fontSize: "13px" }} >Deductions</Typography>
                            <TextField name="deductions" size='small'
                                sx={{
                                    "& .MuiInputBase-root": {
                                        padding: "1px 3px"
                                    }, mt: 1
                                }}
                                type='number' fullWidth
                            />
                        </Box>

                    </Box>

                    {/* submit cancel buttons */}
                    <Stack sx={{
                        flexDirection: "row",
                        mt: 2,
                        justifyContent: "flex-end",
                        gap: 2,
                    }}>
                        <Button variant="contained" size='small' sx={{
                            background: "white",
                            color: 'grey',
                            marginBottom: "20px",
                            textTransform: "none",
                            fontWeight: '300',
                            padding: "7px 16px"
                        }}
                            onClick={() => onClose(false)}
                        >Cancel</Button>

                        <Button variant="contained" size='small' sx={{
                            background: "rgb(91, 82, 252)",
                            marginBottom: "20px",
                            textTransform: "none",
                            fontWeight: '300',
                            padding: "7px 16px"
                        }}
                            type='submit'
                        >Generate</Button>

                    </Stack>

                </Box>
            </form>

        </Stack >
    )
}

export default GeneratePaySlipForm