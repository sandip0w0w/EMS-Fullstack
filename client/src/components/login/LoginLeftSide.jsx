import React from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function LoginLeftSide() {
  return (
    <Stack
      sx={{
        background: "rgb(30, 27, 76)",
        color: "rgb(253, 253, 253)",
        height: "100vh",
        justifyContent: "center", 
      }}
    >
      <Stack
        sx={{
          padding : "0 10%",
          textWrap : "warp"
        }}
      >
        <Typography
          sx={{
            fontSize: "48px",
            fontWeight: 500,
            lineHeight: "50px",
            marginBottom: 2,
          }}
        >
          Employee Management System
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "29px",
            color: "rgb(145, 161, 184)",
          }}
        >
          Streamline your workforce operations, track attendance, manage payroll,
          and empower your team securely.
        </Typography>
      </Stack>
    </Stack>
  )
}

export default LoginLeftSide
