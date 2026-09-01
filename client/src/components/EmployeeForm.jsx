import { Box, Button, Divider, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DepartmentSelect from './DepartmentSelect';


function EmployeeForm({openModal, empData}) {

    const isEdit = !!empData;
    const [selectedDepartment, setSelectedDepartment] = useState(empData?.department || 'All Departments');
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const selectedDepartment = e.target.value;
        setSelectedDepartment(selectedDepartment);

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
                        <TextField name="firstname" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue= {empData?.firstName} />
                    </Box>

                    <Box>
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Last Name</Typography>
                        <TextField name="lastname" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue= {empData?.lastName} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Phone Number</Typography>
                        <TextField name="phoneno" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue= {empData?.phone} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Join Date</Typography>
                        <TextField name="joindate" type='date'
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
                        <DepartmentSelect selectedDepartment={selectedDepartment} handleChange={handleChange} />
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
                            name="basicsalary"
                            type='number'
                            size='small' sx={{ mt: 1, width: "100%" }} required
                            defaultValue={empData?.basicSalary} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>Allowance</Typography>
                        <TextField
                            name="allowance"
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
                        <Select name="employmentStatus" size='small' sx={{ mt: 1, width: "100%", fontSize: "13px" }}
                        defaultValue={empData?.employmentStatus}>
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
                        <TextField name="workemail" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue={empData?.email} />
                    </Box>

                    <Box>
                        <Typography sx={{
                            fontSize: "13px"
                        }}>{isEdit? "Change Password(Optional)" : "Temporary Password"}</Typography>
                        <TextField name="temppass" size='small' sx={{ mt: 1, width: "100%" }} required
                        defaultValue={empData? 'Leave blank to keep current':''} />
                    </Box>

                    <Box >
                        <Typography sx={{
                            fontSize: "13px"
                        }}>System Role</Typography>
                        <Select name="systemrole" size='small' sx={{ mt: 1, width: "100%", fontSize: "13px" }}
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
                >{isEdit ? "Update Employee" : "Create Employee"}</Button>

            </Stack>

        </form>
    )
}

export default EmployeeForm