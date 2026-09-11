import { Box, Button, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DepartmentSelect from './DepartmentSelect';
import toast from 'react-hot-toast'
import api from '../../api/axios';


function EmployeeForm({openModal, empData}) {

    const isEdit = !!empData;
    const [selectedDepartment, setSelectedDepartment] = useState(empData?.department || 'All Departments');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        formData.append("department", selectedDepartment);
        if(isEdit){
            const pwd = formData.get("password")
            if(!pwd) formData.delete("password") 
        }
        
        try{
            const url = isEdit ? `/employees/${empData.id}` : "/employees";
            {isEdit? console.log(`trying to update ${empData.firstName}`):''}
            const method = isEdit ? "put" : "post";
            {isEdit? console.log(`${method} selected`):''}
            console.log(`selected url ${url}`);
            console.log(api.defaults.baseURL + url);
            await api[method](url, formData);
            {isEdit? console.log(`updated`):''}
            setTimeout(() => {openModal(false)}, 1500)
        }catch(error){
            toast.error(error.response?.data?.error || error.message);

        }finally{
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Personal Info */}
            <Stack sx={{
                mt: 2,
                padding: "13px 17px",
                border: "1px solid rgb(240, 241, 243)",
                borderRadius: "4px",
                overflowY: 'auto'
            }}>

                <Typography sx={{
                    fontSize: "14px",
                    fontWeight: '500'
                }}>Personal Information</Typography>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Box sx={{
                    flexDirection: "row",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: 2
                }}>

                    <Box>
                        <Typography sx={{
                            fontSize: "13px"
                        }}>First Name</Typography>
                        <TextField name="firstName" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue= {empData?.firstName} />
                    </Box>

                    <Box>
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Last Name</Typography>
                        <TextField name="lastName" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue= {empData?.lastName} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Phone Number</Typography>
                        <TextField name="phone" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue= {empData?.phone} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Join Date</Typography>
                        <TextField name="joinDate" type='date'
                            size='small' sx={{ mt: 1, width: "100%" }} required
                            defaultValue= {empData?.joinDate ? empData.joinDate.split('T')[0]: ''} />
                    </Box>

                    <Box sx={{ gridColumn: 'span 2' }}>
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Bio(Optional)</Typography>
                        <TextField
                            name="bio"
                            multiline
                            rows={2}
                            placeholder='Brief description...'
                            size='small' sx={{ mt: 1, width: "100%" }}
                            defaultValue= {empData?.bio} />
                    </Box>
                </Box>

            </Stack>

            {/* Employment Details */}
            <Stack sx={{
                mt: 2,
                padding: "13px 17px",
                border: "1px solid rgb(240, 241, 243)",
                borderRadius: "4px",
                overflowY: 'auto'
            }}>

                <Typography sx={{
                    fontSize: "14px",
                    fontWeight: '500'
                }}>Employment Details</Typography>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Box sx={{
                    flexDirection: "row",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: 2
                }}>

                    <Box>
                        <Typography sx={{
                            fontSize: "13px",
                            mb: 1
                        }}>Department</Typography>
                        <DepartmentSelect selectedDepartment={selectedDepartment} handleChange={setSelectedDepartment} />
                    </Box>

                    <Box>
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Position</Typography>
                        <TextField name="position" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue={empData?.position} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Basic Salary</Typography>
                        <TextField
                            name="basicSalary"
                            type='number'
                            size='small' sx={{ mt: 1, width: "100%" }} required
                            defaultValue={empData?.basicSalary} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Allowance</Typography>
                        <TextField
                            name="allowances"
                            type='number'
                            size='small' sx={{ mt: 1, width: "100%" }}
                            defaultValue={empData?.allowances} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Deductions</Typography>
                        <TextField
                            name="deductions"
                            type='number'
                            size='small' sx={{ mt: 1, width: "100%" }}
                            defaultValue={empData?.deductions} />
                    </Box>
                    {isEdit && <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Status</Typography>
                        <Select name="employementStatus" size='small' sx={{ mt: 1, width: "100%", fontSize: "13px" }}
                        defaultValue={empData?.employementStatus}>
                            <MenuItem value="ACTIVE">Active</MenuItem>
                            <MenuItem value="INACTIVE">Inactive</MenuItem>

                        </Select>
                    </Box> }
                </Box>

            </Stack>

            {/* Account Setup */}

            <Stack sx={{
                mt: 2,
                padding: "13px 17px",
                border: "1px solid rgb(240, 241, 243)",
                borderRadius: "4px",
                overflowY: 'auto'
            }}>

                <Typography sx={{
                    fontSize: "14px",
                    fontWeight: '500'
                }}>Account Setup</Typography>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Box sx={{
                    flexDirection: "row",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: 2
                }}>

                    <Box sx={{ gridColumn: 'span 2' }}>
                        <Typography sx={{
                            fontSize: "13px",
                            mb: 1
                        }}>Work Email</Typography>
                        <TextField name="email" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue={empData?.email} />
                    </Box>

                    <Box>
                        <Typography sx={{
                            fontSize: "13px"
                        }}>{isEdit? "Change Password(Optional)" : "Temporary Password"}</Typography>
                        <TextField name="password" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue={empData? 'Leave blank to keep current':''} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>System Role</Typography>
                        <Select name="role" size='small' sx={{ mt: 1, width: "100%", fontSize: "13px" }}
                        defaultValue={empData?.user.role}>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="EMPLOYEE">Employee</MenuItem>

                        </Select>
                    </Box>


                </Box>

            </Stack>
            
            {/* CRUD buttons */}
            <Stack sx={{
                flexDirection: "row",
                mt : 2,
                justifyContent : "flex-end",
                gap : 2,
            }}>
                 <Button variant="contained" size='small'   sx={{
                    background : "white",
                    color : 'grey',
                    marginBottom: "20px",
                    textTransform: "none",
                    fontWeight: '300',
                    padding: "7px 16px"
                }}
                onClick = {() => openModal(false)}
                >Cancel</Button>

                <Button variant="contained" size='small'   sx={{
                    background: "rgb(91, 82, 252)",
                    marginBottom: "20px",
                    textTransform: "none",
                    fontWeight: '300',
                    padding: "7px 16px"
                }}
               type = "submit"
                >{isEdit ? "Update Employee" : "Create Employee"}
                </Button>

            </Stack>

        </form>
    )
}

export default EmployeeForm