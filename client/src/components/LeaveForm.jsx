import { Box, Button, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { CalendarDays, Send, SquareText, X } from 'lucide-react';
import React from 'react'

function LeaveForm({ onClose }) {

    const handleSubmit = (e) => {
        e.preventDefault();
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
            gap: 3

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
                        fontWeight: '500'
                    }}>Apply for Leave</Typography>
                    <Typography sx={{
                        fontSize: "13px",
                        color: "rgb(144, 160, 184)"
                    }}>Submit your leave request for approval</Typography>
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

                    {/* leave type box */}
                    <Box>
                        <Typography sx={{
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}><SquareText size={'14'} color='rgb(144, 160, 184)' /> Leave Type</Typography>
                        <Select name="leaveselect" size='small' sx={{ mt: 1, width: "100%", fontSize: "13px" }}
                        >
                            <MenuItem value="sick">Sick Leave</MenuItem>
                            <MenuItem value="casual">Casual Leave</MenuItem>
                            <MenuItem value="annual">Annual Leave</MenuItem>

                        </Select>
                    </Box>

                    {/* duration */}
                    <Box>
                        <Typography sx={{
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}><CalendarDays size={'14'} color='rgb(144, 160, 184)' /> Duration</Typography>


                        <Box sx={{
                            display: "flex",
                            justifyContent: 'space-between',
                            mt: 0.5,
                            gap: 3,
                        }}>
                            {/* from date */}
                            <Box sx={{ width: "100%" }}>
                                <Typography sx={{
                                    fontSize: "12px",
                                    color: 'rgb(144, 160, 184)',
                                    mb: 0.3
                                }}>From</Typography>
                                <TextField name="fromdate" type='date' size='small' fullWidth />
                            </Box>

                            {/* to date */}
                            <Box sx={{ width: "100%" }}>
                                <Typography sx={{
                                    fontSize: "12px",
                                    color: 'rgb(144, 160, 184)',
                                    mb: 0.3
                                }}>To</Typography>
                                <TextField name="todate" type='date' size='small' fullWidth />
                            </Box>
                        </Box>
                    </Box>

                    {/* reason */}
                    <Box>
                        <Typography sx={{
                            fontSize: "13px",
                            alignItems: "center",
                        }}>Reason</Typography>
                        <TextField
                            name="leavereason"
                            type='text'
                            placeholder='Briefly describe why you need this leave..'
                            multiline
                            rows={'2'}
                            sx={{ mt: 1, width: "100%" }}
                        />
                    </Box>

                    {/* submit buttons */}

                    <Stack sx={{
                        flexDirection: "row",
                        mt: 2,
                        justifyContent: "space-between",
                        gap: 2,
                    }}>
                        <Button variant="contained" size='small' sx={{
                            background: "white",
                            color: 'rgb(47, 51, 56)',
                            width : "100%",
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
                            width : "100%",
                            textTransform: "none",
                            fontWeight: '300',
                            padding: "7px 16px"
                        }}
                        startIcon = {<Send size = {'14'} />}
                        >Submit</Button>

                    </Stack>



                </Box>
            </form>

        </Stack >
    )
}

export default LeaveForm