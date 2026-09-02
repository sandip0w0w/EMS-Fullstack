import React, { useState } from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets'
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { Plus } from 'lucide-react';
import PaySlipTable from '../components/payslips/PaySlipTable';
import GeneratePaySlipForm from '../components/payslips/GeneratePaySlipForm';

function PaySlip() {

  const [payslips, setPayslips] = useState(dummyPayslipData);
  const [employees, setEmployees] = useState(dummyEmployeeData);
  const isAdmin = true

  const [openGeneratePaySlip, setOpenGeneratePaySlip] = useState(true);

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
     
             <Box>
               <Button variant="contained" size='small' startIcon={<Plus size={'14'} />} sx={{
                 background: "rgb(91, 82, 252)",
                 marginBottom: "20px",
                 textTransform: "none",
                 fontWeight: '300',
                 padding: "7px 16px"
               }}
               onClick={() => setOpenGeneratePaySlip(true)}
               >Generate Payslip</Button>
             </Box>
     
           </Box>

      {/* payslip details */}
      
      <Box sx={{
              border : "1px solid rgb(241, 244, 248)",
              borderRadius : "5px",
              flexDirection: "row",
              width: "95%",
              marginTop: "30px",
            }}>
              <PaySlipTable />
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
        <GeneratePaySlipForm onClose = {setOpenGeneratePaySlip} />
      </Modal>
      

    </Stack>
  )
}

export default PaySlip

