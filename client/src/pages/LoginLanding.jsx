import Stack from '@mui/material/Stack'
import React from 'react'
import LoginLeftSide from '../components/login/LoginLeftSide'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Loading from '../Loading'

function LoginLanding() {
  const {user, loading} = useAuth();

  if(loading) return <Loading />
  if(user) return <Navigate to = "/" />
  const navigate = useNavigate();

  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employees, departments, payroll, and system configurations."
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "View your profile, track attendance, request time off, and access payslips."
    }
  ];

  const handleClick = (destination) => {
    navigate(destination);
  }
  return (
    <Stack sx={{
      flexDirection: "row",
    }}>

      <Box sx={{
        flex : 1,
        display : {xs : 'none', sm : "flex"}
      }}>
        <LoginLeftSide />
      </Box>

      <Box sx={{
        flex : 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Stack sx={{
          width: "60%"
        }}>
          <Stack sx={{
            marginBottom: "40px"
          }}>
            <Typography sx={{
              fontSize: "30px",
              fontStyle: "normal",
              fontWeight: "500",
            }}>Welcome Back</Typography>
            <Typography sx={{
              fontSize: "14px",
              fontWeight: "400",
              fontStyle: "normal",
              color: "rgb(38.39% 45.48% 55.67%)",

            }}>Select your portal to securely access the system.</Typography>
          </Stack>
          <Stack>
            {portalOptions.map((portal) => (
              <Stack sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                border: "1px solid rgb(227, 233, 240)",
                backgroundColor: "rgb(249, 250, 253)",
                padding: 3,
                borderRadius: "4px",
                marginBottom: "15px",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.01)",
                  color: "rgb(91, 82, 252)",
                  border: "1px solid rgb(91, 82, 252)",
                  cursor: "pointer",
                  background: "rgba(91, 82, 252, 0.1)"
                }
              }} onClick={() => handleClick(portal.to)}>
                <Typography sx={{
                  fontStyle: "normal",
                  fontWeight: "500",
                }}>{portal.title}</Typography>
                <ArrowRightIcon />
              </Stack>

            ))}
          </Stack>
          <Box><Typography sx={{
            fontSize: "12px",
            color: "rgb(38.39% 45.48% 55.67%)",
            padding: "15px 0px"
          }}>©{new Date().getFullYear()} emsys. All rights reserved </Typography></Box>
        </Stack>
      </Box>

    </Stack>

  )
}

export default LoginLanding