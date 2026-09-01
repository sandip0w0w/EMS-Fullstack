import { Box, Divider, Stack, TextField, Typography } from '@mui/material'
import { TypeIcon, X } from 'lucide-react'
import React from 'react'
import EmployeeForm from './EmployeeForm'


function EditEmployee({ showModal, emp}) {

   
    return (
        <Stack sx={{
            background: "white",
            width: "50%",
            borderRadius: "5px",
            padding: "20px 20px",
            maxHeight: "85vh",
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            
        }}>
            {/* header */}
            <Stack>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography sx={{
                        fontSize: "16px",
                        fontWeight: '500'
                    }}>Edit Employee</Typography>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        color: 'rgb(115, 131, 153)',
                        p: 1,
                        borderRadius: "5px",

                        '&:hover': {
                            background: "rgb(240, 241, 243)",
                            color: "rgb(63, 65, 68)"
                        }
                    }}
                        onClick={() => showModal(false)}>
                        <X size={'18'} />
                    </Box>

                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Typography sx={{
                        fontSize: "13px",
                        color: "rgb(115, 131, 153)",
                    }}>Update employee details</Typography>

                </Box>
            </Stack>

            {/* modal body */}

            <EmployeeForm openModal = {showModal} empData = {emp} />


        </Stack>
    )
}

export default EditEmployee