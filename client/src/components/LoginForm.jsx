import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import LoginLeftSide from './LoginLeftSide'
import { ArrowLeftIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material';
import PasswordField from './PasswordField'

function LoginForm({role, title, description}) {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const returnToLogin = () => {
    navigate("/login");
  }
  return (
    <Stack sx={{
      flexDirection: "row",
    }}>

      <Box sx={{
        flex: 1,
        display: { xs: 'none', sm: "flex" }
      }}>
        <LoginLeftSide />
      </Box>

      <Box sx={{
        flex : 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>

        <Stack sx = {{
          width : "60%"
        }}>
          <Box sx = {{
            display : "flex",
            alignItems : "center",
            transition : '0.3s',
            padding : "14px 0px",
            color : "rgb(38.39% 45.48% 55.67%)",
            "&:hover":{
              color : 'black',
              "& .MuiTypography-root" :{
                color : "black"
              },
              "& svg":{
                color : "black",
              },
              cursor : 'pointer'
            }
          }} onClick = {returnToLogin}>
             <ArrowLeftIcon color='currentColor' size={15} /> 
             <Typography sx = {{
              color: "rgb(38.39% 45.48% 55.67%)", 
              fontSize : "13px",
              marginLeft : "7px",
             }}> Back to portals</Typography>
          </Box>
          <Stack>
            <Typography sx = {{
              fontSize : "20px",
              fontWidth : "500"
            }}> {title}</Typography>
            <Typography sx = {{
              fontSize : "13px",
              color : "rgb(38.39% 45.48% 55.67%)",
            }}>{description}</Typography>
          </Stack>

          <Stack sx = {{
            marginTop : "30px",
          }}>
            <TextField id="outlined-basic"
             label="Email Address"
             value = {email}
             onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
               size = "small"
                sx = {{
              "& .MuiOutlinedInput-root" :{
                marginBottom : "20px"
              }
            }} />
          <PasswordField  />
          <Button variant="contained" sx = {{
            background : "rgb(91, 82, 252)",
            marginTop : "20px"
          }}>Sign in</Button>
          </Stack>
            

        </Stack>
      </Box>
    </Stack>
  )
}

export default LoginForm