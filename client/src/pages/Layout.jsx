import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import { Box, Stack } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import Loading from '../Loading'

function Layout() {
  const { user , loading} = useAuth();

  if(loading) return <Loading />
  if(!user) return <Navigate to = "/login" />
  return (
    <Stack sx = {{
      flexDirection : "row",
    }}>
      {/* Sidebar */}
      <Box sx = {{
        display : {xs : 'none', md : 'block'}
      }}>
      <SideBar/>
      </Box>
      
      {/* content page */}
      <Box
        component="main"
        sx={{
          ml : {xs : '4%', md : '18%'},
          pt : 4,
          flex: 1,
          
        }}
      >
        <Outlet />
        </Box>
    </Stack>
  )
}

export default Layout