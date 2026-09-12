import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { Plus } from 'lucide-react';
import PaySlipTable from '../components/payslips/PaySlipTable';
import GeneratePaySlipForm from '../components/payslips/GeneratePaySlipForm';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import Loading from '../Loading';

function PaySlip() {

  const [payslips, setPayslips] = useState([]); // 11: 30
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [openGeneratePaySlip, setOpenGeneratePaySlip] = useState(false);

  const fetchPayslips = useCallback(async () => {
    try {
      const res = await api.get('/payslips');
      setPayslips(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    }finally{
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    if (isAdmin) api.get('/employees').then((res) => setEmployees(res.data.filter(
      (e) => !e.isDeleted
    ))).catch(() => { })
  }, [isAdmin]);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips])

  if(loading) return <Loading />;

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
          }}>Payslips</Typography>
          <Typography sx={{
            fontSize: "13px",
            color: "rgb(99, 116, 143)",
            marginTop: "5px"
          }}>{isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}</Typography>
        </Box>

        {isAdmin &&
          (<Box>
            <Button variant="contained" size='small' startIcon={<Plus size={'14'} />} sx={{
              background: "rgb(91, 82, 252)",
              marginBottom: "20px",
              textTransform: "none",
              fontWeight: '300',
              padding: "7px 16px"
            }}
              onClick={() => setOpenGeneratePaySlip(true)}
            >Generate Payslip</Button>
          </Box>)}

      </Box>

      {/* payslip details */}

      <Box sx={{
        border: "1px solid rgb(241, 244, 248)",
        borderRadius: "5px",
        flexDirection: "row",
        width: "95%",
        marginTop: "30px",
      }}>
        <PaySlipTable payslips={payslips} isAdmin = {isAdmin} />
      </Box>

      {/* generate payslip modal */}

      <Modal
        open={openGeneratePaySlip}
        onClose={() => setOpenGeneratePaySlip(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <GeneratePaySlipForm onClose={setOpenGeneratePaySlip}
          employees={employees}
          fetchPayslips={fetchPayslips}
          isAdmin={isAdmin} />
      </Modal>


    </Stack>
  )
}

export default PaySlip

