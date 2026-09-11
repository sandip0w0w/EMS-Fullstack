import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { NotebookPen, Plus, Thermometer, Umbrella } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import LeaveHistory from '../components/attendance/LeaveHistory'
import LeaveForm from '../components/attendance/LeaveForm'
import { useAuth } from '../context/AuthContext';
import api from '../api/axios'
import toast from 'react-hot-toast'




function Leave() {

  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [leavesCount, setLeavesCount] = useState({});
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await api.get('/leave')
      setLeaves(res.data.data || []);
      setLeavesCount({
        sickLeavesTaken: res.data.sickLeavesTaken,
        casualLeavesTaken: res.data.casualLeavesTaken,
        annualLeavesTaken: res.data.annualLeavesTaken
      });
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }
  }, [])

  useEffect(() => {
    fetchLeaves(); // 11: 15
  }, [fetchLeaves]);

  const card_detail = [
    {
      title: "Sick Leave",
      value: leavesCount.sickLeavesTaken,
      icon: Thermometer
    },
    {
      title: "Causal Leave",
      value: leavesCount?.casualLeavesTaken,
      icon: Umbrella
    },
    {
      title: "Annual Leave",
      value: leavesCount?.annualLeavesTaken,
      icon: NotebookPen
    }
  ]
  return (
    <Stack>
      {/* header */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        paddingRight: 3
      }}>
        <Box>
          <Typography sx={{
            fontSize: "23px",
            fontWeight: "500"
          }}>Leave Management</Typography>
          <Typography sx={{
            fontSize: "13px",
            color: "rgb(99, 116, 143)",
            marginTop: "5px"
          }}> {isAdmin ? "Manage leave application" : "Your leave history and requests"}</Typography>
        </Box>

        {!isAdmin && (<Box>
          <Button variant="contained" size='small' startIcon={<Plus size={'14'} />} sx={{
            background: "rgb(91, 82, 252)",
            marginBottom: "20px",
            textTransform: "none",
            fontWeight: '300',
            padding: "7px 16px"
          }}
            onClick={() => setOpenLeaveModal(true)}
          >Appply for Leave</Button>
        </Box>)}

      </Box>

      {/* cards */}

      {!isAdmin && (<Stack sx={{
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
          <Box key={idx} sx={{
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
                <Stack sx = {{
                  flexDirection : "row",
                  alignItems: "center",
                  gap: 0.5
                }}>
                <Typography sx={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "black"
                }}>{detail.value}</Typography>
                <Typography sx = {{
                  fontSize : "12px",
                  marginTop: "9px",
                  color : "rgb(98, 116, 142)"
                }}>taken</Typography>
                </Stack>
              </Stack>

            </Stack>

          </Box>
        ))}
      </Stack>)}

      {/* leave records */}
      <Box sx={{
        border: "1px solid rgb(241, 244, 248)",
        borderRadius: "5px",
        flexDirection: "row",
        width: "95%",
        marginTop: "30px",
      }}>
        <LeaveHistory leaves={leaves} isAdmin={isAdmin} fetchLeaves = {fetchLeaves} />
      </Box>

      {/* apply leave Modal */}

      <Modal
        open={openLeaveModal}
        onClose={() => setOpenLeaveModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LeaveForm onClose={setOpenLeaveModal} fetchLeaves = {fetchLeaves} />
      </Modal>
    </Stack>
  )
}

export default Leave