import { Button, Stack, Typography, Box, TextField } from '@mui/material';
import { Lock, X } from 'lucide-react';
import React from 'react'
import PasswordField from './login/PasswordField';
import api from '../api/axios';
import toast from 'react-hot-toast';

function ChangePassword({ onClose }) {
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try{
            await api.patch('/auth/change-password', data);
            onClose(false);
            toast.success("Password Updated!");
        }catch(error){
            toast.error(error?.response?.data?.error || error.message);
        }
    }

    return (
        <Stack sx={{
            background: "white",
            minWidth: "250px",
            width: "35%",
            borderRadius: "5px",
            padding: "20px 20px",
            maxHeight: "85vh",
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            gap: 3

        }}>
            {/* header */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                <Typography sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "16px",
                    fontWeight: '500',
                    textAlign: 'center',
                }}> <Lock size={'18'} /> Change Password</Typography>


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
                    onClick={() => onClose(false)}>
                    <X size={'18'} />
                </Box>
            </Box>

            {/* form content */}

            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}>
                    <Typography sx={{ fontSize: "13px", fontWeight : '500' }} >Current Password</Typography>
                    <TextField name="currentPassword" size='small'
                        sx={{
                            "& .MuiInputBase-root": {
                                padding: "1px 3px"
                            }
                        }}
                        type='text' fullWidth
                    />

                    <Typography sx={{ fontSize: "13px", fontWeight : '500' }} >New Password</Typography>

                    <TextField name="newPassword" size='small'
                        sx={{
                            "& .MuiInputBase-root": {
                                padding: "1px 3px"
                            }
                        }}
                        type='text' fullWidth
                    />
                    {/* submit buttons */}

                    <Stack sx={{
                        flexDirection: "row",
                        mt: 2,
                        justifyContent: "space-between",
                        gap: 2,
                    }}>
                        <Button variant="contained" size='small' sx={{
                            background: "white",
                            color: 'rgb(47, 51, 56)',
                            width: "100%",
                            marginBottom: "20px",
                            textTransform: "none",
                            fontWeight: '300',
                            padding: "7px 16px"
                        }}
                            onClick={() => onClose(false)}
                        >Cancel</Button>

                        <Button variant="contained" size='small' sx={{
                            background: "rgb(91, 82, 252)",
                            marginBottom: "20px",
                            width: "100%",
                            textTransform: "none",
                            fontWeight: '300',
                            padding: "7px 16px"
                        }}
                        type = 'submit'
                        >Update Password</Button>

                    </Stack>
                </Box>
            </form>
        </Stack >
    )
}

export default ChangePassword