import { Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Check, X } from 'lucide-react';
import React, { useState } from 'react'
import api from '../../api/axios';
import toast from 'react-hot-toast';


const adminHeader = ['EMPLOYEE', 'TYPE', 'DATES', 'REASON', 'STATUS', 'ACTIONS'];
const userHeader = ['TYPE', 'DATE', 'REASON', 'STATUS'];
const statusColors = {
    PENDING: 'warning',
    APPROVED: 'success',
    REJECTED: 'error'
}
function LeaveHistory({leaves, isAdmin, fetchLeaves}) {

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.patch(`/leave/${id}`, { status });
            fetchLeaves();

        } catch (error) {
            toast.error(error?.response?.data?.error || error?.message)
        }

    }
    return (
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        {(isAdmin ? adminHeader : userHeader).map((header) => (
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
                    {leaves.length === 0 ? (
                        <TableRow>
                            <TableCell sx={{
                                color: 'rgb(179, 181, 184)',
                                fontSize: "13px",
                            }} colSpan={6} align="center">
                                No leave applications found
                            </TableCell>
                        </TableRow>
                    ) : (leaves.map((leave) => {

                        const startDateStr = leave.startDate ? new Date(leave.startDate).toLocaleDateString() : '';
                        const endDateStr = leave.endDate ? new Date(leave.endDate).toLocaleDateString() : '';
                        const dateDisplay = startDateStr && endDateStr ? `${startDateStr} - ${endDateStr}` : (startDateStr || '-');
                        return (
                            <TableRow
                                key={leave._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {isAdmin && (
                                    <TableCell align="center" sx={{ fontWeight: 500 }}>
                                        {leave?.employee?.firstName} {leave?.employee?.lastName}
                                    </TableCell>
                                )}

                                <TableCell align="center">
                                    {leave.type}
                                </TableCell>

                                <TableCell align="center">
                                    {dateDisplay}
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        maxWidth: 200,
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    {leave.reason}
                                </TableCell>

                                <TableCell align="center">
                                    <Chip
                                        label={leave.status}
                                        color={statusColors[leave.status] || 'default'}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 500 }}
                                    />
                                </TableCell>

                                {isAdmin && (
                                    <TableCell align="center">


                                        {leave.status.includes("PENDING") &&
                                            (
                                                <Stack sx={{ flexDirection: "row", gap: 3 }}>
                                                    <Check size={'18'} color='green' onClick={() => handleStatusUpdate(leave._id, "APPROVED")} />
                                                    <X size={'18'} color='red' onClick={() => handleStatusUpdate(leave._id, "REJECTED")} />
                                                </Stack>)
                                        }

                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    }))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LeaveHistory