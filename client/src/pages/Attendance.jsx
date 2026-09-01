import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import {dummyAttendanceData} from '../assets/assets';
import { Calendar, CircleAlert, Clock } from 'lucide-react';
import AttendanceHistory from '../components/AttendanceHistory';



const card_detail = [
  {
    title:"Days Present",
    value : 0,
    icon : Calendar
  },
  {
    title : "Late Arrivals",
    value : 0,
    icon : CircleAlert 
  },
  {
    title : "Avg. Work Hrs",
    value : '8.5 Hrs',
    icon : Clock
  }
]
function Attendance() {
  return (
    <Stack>
      {/* header */}
      <Box>
        <Typography sx={{
          fontSize: "23px",
          fontWeight: "500"
        }}>Attendance</Typography>
        <Typography sx={{
          fontSize: "13px",
          color: "rgb(99, 116, 143)",
          marginTop: "5px"
        }}>Track your work hours and daily check-ins</Typography>
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
              gap : 2,
              alignItems : "center"
            }}>
              <detail.icon />
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
              

            </Stack>

          </Box>
        ))}
      </Stack>

      {/* attendance record */}
      <Box sx={{
        border : "1px solid rgb(241, 244, 248)",
        borderRadius : "5px",
        flexDirection: "row",
        width: "95%",
        marginTop: "30px",
      }}>
        <Typography sx = {{
          fontSize : "15px",
          fontWeight : '500',
          padding : "18px 20px"
        }}>Recent Activity</Typography>
        <Divider />
        <AttendanceHistory />
      </Box>
      

    </Stack>
  )
}

export default Attendance