import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { dummyAttendanceData } from '../assets/assets';
import { Calendar, CircleAlert, Clock, LogIn } from 'lucide-react';
import AttendanceHistory from '../components/attendance/AttendanceHistory';
import api from '../api/axios';
import toast from 'react-hot-toast';

function Attendance() {
  const [history, setHistory] = useState([]);
  const avgWorkingHours = (history.reduce((sum, item) => sum + (item.workingHours || 0), 0) / history.length) || 0;
  const [startWork, setStartWork] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/attendance");
      const records = res.data.data;
      setHistory(records || [])

      if (records.length > 0) {
        const latestRecord = records[0];
        const isClockedIn = Boolean(latestRecord.checkIn) && !latestRecord.checkOut;
        setStartWork(isClockedIn);

      }
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    }

  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const card_detail = [
    {
      title: "Days Present",
      value: history.filter((h) => h.status === "PRESENT" | h.status === "LATE").length,
      icon: Calendar
    },
    {
      title: "Late Arrivals",
      value: history.filter((h) => h.status === "LATE").length,
      icon: CircleAlert
    },
    {
      title: "Avg. Work Hrs",
      value: avgWorkingHours,
      icon: Clock
    }
  ];

  const handleClockIn = async () => {
    try {
      const res = await api.post('/attendance');
      if(res.data.type == "CHECK_OUT"){
        toast.success("Clocked Out Successfully!")
      }else {
        toast.success("Clocked In Successfully!");
      }

      await fetchData();
    } catch (error) {
      toast.error(error?.response?.data.error || error?.message);
    }
  }

  return (
    <Stack sx={{
      position: "relative",
      height: "90vh",
    }}>
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

        {card_detail.map((detail, idx) => (
          // card - box
          <Box key = {idx} sx={{
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
              gap: 2,
              alignItems: "center"
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
        border: "1px solid rgb(241, 244, 248)",
        borderRadius: "5px",
        flexDirection: "row",
        width: "95%",
        marginTop: "30px",
      }}>
        <Typography sx={{
          fontSize: "15px",
          fontWeight: '500',
          padding: "18px 20px"
        }}>Recent Activity</Typography>
        <Divider />
        <AttendanceHistory history={history} />
      </Box>

      {/* Attendance Clock in Tab */}
      <Box sx={{
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
        bottom: 0,
        right: 25,
        background: "#5a53fc",
        p: 1.5,
        borderRadius: '5px',
        transition: "all 0.5s",

        '&:hover': {
          cursor: 'pointer',
          opacity: "0.8"
        },

        '&:active': {
          transform: "scale(0.95)"
        }
      }}
        onClick={handleClockIn}>

        <LogIn size={'20'} color='white' />
        <Box>
          <Typography sx={{
            color: "white",
            fontSize: "18px",
          }}>{startWork ? "Clock Out" : "Clock In"}</Typography>
          <Typography sx={{
            color: "white",
            fontSize: "10px"
          }}>{startWork ? "End your work day" : "Start your work day"}</Typography>
        </Box>

      </Box>


    </Stack>
  )
}

export default Attendance