import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import { Box, Stack } from '@mui/material'

function Layout() {
  return (
    <Stack sx = {{
      flexDirection : "row",
    }}>
      <Box sx = {{
        display : {xs : 'none', md : 'block'}
      }}>
      <SideBar role = "ADMIN"/>
      </Box>
      
      <Box
        component="main"
        sx={{
          ml : {xs : '4%', md : '18%'},
          flex: 1,
          
        }}
      >
        <Outlet />
        </Box>
    </Stack>
  )
}

export default Layout