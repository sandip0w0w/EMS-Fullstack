import { Box } from '@mui/material';
import React from 'react'
import { OrbitProgress} from "react-loading-indicators";

function Loading() {
  return (
    <Box sx = {{
      height: "100vh",
      display : "flex",
      alignItems: "center",
      justifyContent:"center"
    }}>
        <OrbitProgress color="#9813da" size={1} text="" textColor="#260f8d" />
    </Box>
  )
}

export default Loading