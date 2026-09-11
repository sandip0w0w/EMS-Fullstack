import { Box, Stack, Typography } from '@mui/material'
import { Building2, Calendar, ScrollText, Users } from 'lucide-react'

function AdminDashboard({data}) {
  const card_details = [
  {
    name : "Total Employees",
    value : data.totalEmployees,
    logo : Users
  },
    {
    name : "Departments",
    value : data.totalDepartments,
    logo : Building2
  },
    {
    name : "Today's Attendance",
    value : data.todayAttendance,
    logo : Calendar
  },
    {
    name : "Pending Leaves",
    value : data.pendingLeaves,
    logo : ScrollText
  },
]

    return (
    // Admin Dashboard
   <Stack>
    {/* dashboard header */}
    <Box sx = {{
      display : "flex",
      flexDirection : "column",
      justifyContent : "center",
    }}>
      <Typography sx = {{
        fontSize : "25px",
        fontWeight : "500"
      }}> Dashboard</Typography>
      <Typography sx = {{
        fontSize : "13px",
        color : "rgb(99, 116, 143)",
        marginTop : "5px"
      }}> Welcome back, Admin - here's your overview</Typography>
    </Box>

    {/* Cards */}

    <Stack sx = {{
      flexDirection : "row",
      display : "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      width : "95%",
      gap : 2,
      justifyContent : "space-between",
      marginTop : "30px",
      paddingRight : 3,
    }}>

    {card_details.map((detail) => (
      // card - box
      <Box sx = {{
        display : "flex",
        alignItems : "center",
        border: "1px solid rgb(235, 238, 245)",
        borderRadius : "4px",
        transition : "0.3s",
        '& .MuiBox-root' : {
          background : "grey"
        },
        '&:hover' : {
          color : "#615EFE",
          transform : "translateY(-2px)",
          '& .MuiBox-root' : {
          background : "#7573e8e0",
        }

        }
      }}>

        <Box sx = {{
          width: "2%",
          height : "100%",
          borderRadius : "2px"
        }}>
        </Box>

        <Stack sx = {{
          flexDirection : "row",
          flex : 1,
          padding : "15px 20px 15px 15px",
          justifyContent : "space-between",
        }}>
           <Stack>
        <Typography sx = {{
          fontSize : "13px",
          color : "black"
        }}>{detail.name}</Typography>
        <Typography sx = {{
          fontSize : "22px",
          fontWeight : "600",
          color : "black"
        }}>{detail.value}</Typography>
        </Stack>
        <detail.logo />

        </Stack>
       
      </Box>
    ))}
    </Stack>
    </Stack>
  )
}

export default AdminDashboard