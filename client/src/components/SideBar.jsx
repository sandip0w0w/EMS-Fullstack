import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { dummyProfileData } from '../assets/assets';
import { Box, Stack, Typography } from '@mui/material';
import { Calendar, ChevronRight, FileText, LayoutDashboard, LogOut, MoveRightIcon, Settings, User, Users } from 'lucide-react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import Loading from '../Loading';


function SideBar() {

    const { user, loading, logout } = useAuth();
    const [userName, setUserName] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const role = user?.role;

    const nav_items = [
        {
            name: "Dashboard",
            logo: LayoutDashboard,
            path: "/dashboard"
        },
        role === 'ADMIN' ?
            {
                name: "Employees",
                logo: Users,
                path: "/employees"
            } : {
                name: "Attendance",
                logo: Calendar,
                path: "/attendance"
            },
        {
            name: "Leave",
            logo: Calendar,
            path: "/leave"
        },
        {
            name: "Payslips",
            logo: FileText,
            path: "/payslips"
        },
        {
            name: "Settings",
            logo: Settings,
            path: "/settings"
        }
    ];

    const handleLogout = () => {
        logout()
        window.location.href("/login")
    }

    useEffect(() => {
        api.get("/profile").then(({ data }) => {
            if (data.firstName) setUserName(`${data.firstName} ${data.lastName || ""}`.trim());
        })
    }, []);


    return (
        <Stack
            sx={{
                background: "rgb(8, 17, 34)",
                color: "rgb(253, 253, 253)",
                height: "100vh",
                width: "16%",
                justifyContent: "space-between",
                position: "fixed",
            }}
        >
            {/* App name */}
            <Box sx={{
                display: "flex",
                height: "12%",
                alignItems: "center",
                padding: "0px 10%",
                borderBottom: "2px solid rgb(29, 37, 55)"
            }}>
                <Box sx={{
                    flex: 1
                }}>
                    <User />
                </Box>

                <Box sx={{
                    flex: 3,
                    justifySelf: "flex-start",
                }}>
                    <Stack>
                        <Typography sx={{
                            fontWeight: "500",
                            fontSize: "12px"
                        }}>Employee MS</Typography>

                        <Typography sx={{
                            fontWeight: "400",
                            fontSize: "10px",
                            color: "rgb(99, 116, 143)"
                        }}>Management System</Typography>
                    </Stack>
                </Box>

            </Box>

            {/* Current User */}
            <Box sx={{
                padding: 1,
            }}>
                <Box sx={{
                    backgroundColor: "rgb(23, 30, 51)",
                    border: "2px solid rgb(29, 37, 55)",
                    borderRadius: "6px",
                    display: "flex",
                    padding: "10px 9px",
                    alignItems: "center",
                }}>
                    <Box sx={{
                        flex: 1
                    }}><AdminPanelSettingsIcon /></Box>
                    <Box sx={{
                        flex: 3
                    }}>
                        <Stack>
                            <Typography sx={{
                                fontWeight: "500",
                                fontSize: "12px"
                            }}>{userName}</Typography>

                            <Typography sx={{
                                fontWeight: "400",
                                fontSize: "10px",
                                color: "rgb(99, 116, 143)"
                            }}>{role === 'ADMIN' ? 'Administrator' : 'Employee'}</Typography>
                        </Stack>
                    </Box>

                </Box>
            </Box>

            {/* Navigation Bar */}
            <Box sx={{
                flex: 5,
                padding: "7px 14px"
            }}>
                <Typography sx={{
                    fontWeight: "500",
                    fontSize: "10px",
                    color: "rgb(99, 116, 143)"
                }}> NAVIGATION </Typography>

                {loading ? (
                    <div>
                        <Loading />
                    </div>
                ) : (
                    nav_items.map((item, idx) => (
                        <NavLink key = {idx} to={item.path} style={{ textDecoration: "none" }}>
                            <Stack sx={{
                                flexDirection: "row",
                                alignItems: "center",
                                color: 'rgb(220, 222, 225)',
                                padding: "1px 5px",
                                ...(location.pathname.includes(item.path) ? {
                                    background: "rgba(75, 73, 183, 0.25)",
                                    borderRadius: "3px",
                                } : {
                                    '&:hover': {
                                        background: "rgba(244, 239, 239, 0.1)",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        color: "white"
                                    }
                                }),
                            }} onClick={() => navigate(item.path)}>
                                <item.logo size={15} />
                                <Typography sx={{
                                    margin: "10px",
                                    fontSize: "11px",
                                    textDecoration: "none",
                                    flex: 1
                                }}>{item.name}</Typography>
                                {location.pathname.includes(item.path) && <ChevronRight size={'13'} />}




                            </Stack>
                        </NavLink>

                    ))
                )}





            </Box>


            {/* Logout  */}
            <Box sx={{
                borderTop: "2px solid rgb(29, 37, 55)",
                padding: 1.5,
            }}
            onClick = {handleLogout}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "2px",
                    padding: "4px 5px",
                    transition: "0.3s",
                    color: 'gray',
                    '&:hover': {
                        background: 'rgba(223, 77, 77, 0.1)',
                        color: "rgb(223, 77, 77)",
                    }
                }}>
                    <LogOut size={'14'} />
                    <Typography sx={{
                        fontSize: "12px",
                        marginLeft: "4px",
                    }}>Log out</Typography>
                </Box>
            </Box>


        </Stack>
    )
}

export default SideBar