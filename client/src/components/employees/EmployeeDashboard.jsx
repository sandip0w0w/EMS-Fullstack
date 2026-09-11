import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { dummyEmployeeDashboardData } from '../../assets/assets'
import { Calendar, ChevronRight, HandCoins, NotepadText } from 'lucide-react'
import formatMoney from '../../utils/formatMoney';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function EmployeeDashboard({data}) {
    const navigate = useNavigate();
    const card_detail = [
    {
        title: "Days Present",
        value: data.currentMonthAttendance,
        icon: Calendar
    },

    {
        title: "Pending Leaves",
        value: data.pendingLeaves,
        icon: NotepadText
    },

    {
        title: "Latest Payslip",
        value: formatMoney(data.latestPayslips),
        icon: HandCoins
    },
]
    return (
        <Stack>
            {/* dashboard header */}
            <Box>
                <Typography sx={{
                    fontSize: "23px",
                    fontWeight: "500"
                }}>{`Welcome, ${data.employee.firstName}`}</Typography>
                <Typography sx={{
                    fontSize: "13px",
                    color: "rgb(99, 116, 143)",
                    marginTop: "5px"
                }}> {`${data.employee.position} - ${data.employee.department} `}</Typography>
            </Box>

            {/* cards */}
            <Stack sx={{
                flexDirection: "row",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                width: "95%",
                gap: 2,
                justifyContent: "space-between",
                marginTop: "30px",
                paddingRight: 3,
            }}>

                {card_detail.map((detail) => (
                    // card - box
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid rgb(235, 238, 245)",
                        borderRadius: "4px",
                        transition: "0.3s",
                        '& .MuiBox-root': {
                            background: "grey"
                        },
                        '&:hover': {
                            color: "#615EFE",
                            transform: "translateY(-2px)",
                            '& .MuiBox-root': {
                                background: "#7573e8e0",
                            }

                        }
                    }}>
                        <Box sx={{
                            width: "1%",
                            height: "100%",
                            borderRadius: "2px"
                        }}>
                        </Box>

                        <Stack sx={{
                            flexDirection: "row",
                            flex: 1,
                            padding: "15px 20px 15px 15px",
                            justifyContent: "space-between",
                        }}>
                            <Stack>
                                <Typography sx={{
                                    fontSize: "13px",
                                    color: "black"
                                }}>{detail.title}</Typography>
                                <Typography sx={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                    color: "black"
                                }}>{detail.value}</Typography>
                            </Stack>
                            <detail.icon />

                        </Stack>

                    </Box>
                ))}
            </Stack>

            {/* attendance buttons cards */}
            <Stack sx={{
                display: "flex",
                width : "95%",
                flexDirection: {
                    xs: "column",  
                    sm: "row", 
                },
                gap: 1.5,      
            }}>
                <Button variant="contained" size='small' endIcon={<ChevronRight size = {'12'} />} sx={{
                    background: "rgb(91, 82, 252)",
                    marginTop: "20px",
                    textTransform: "none",
                    fontWeight: '300',
                }}
                onClick = {() => navigate('/attendance')}>Mark Attendance </Button>

                <Button variant="contained" size='small' sx={{
                    background: "white",
                    color: 'gray',
                    marginTop: "20px",
                    textTransform: "none",
                    fontWeight: '300',
                }}
                onClick = {() => navigate('/leave')}>
                    Apply for Leave</Button>


            </Stack>
        </Stack>
    )
}

export default EmployeeDashboard