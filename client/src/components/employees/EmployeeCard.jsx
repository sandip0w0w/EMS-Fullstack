import { Box, Stack, Typography } from '@mui/material'
import { Pen, Trash } from 'lucide-react';
import React from 'react'
import AddNewEmployee from './AddNewEmployee';
import api from '../../api/axios';
import toast from 'react-hot-toast';

function EmployeeCard({employee, onEdit, setCurrentEmployee}) {

    const handleEdit = () => {
        setCurrentEmployee(employee);
        onEdit(true);
    }
    
    const handleDelete = async () => {
        if(!confirm("Are you sure you want to delete the employee?"))
        return;
        try{
            await api.delete(`/employees/${employee.id}`)

        }catch(error){
            toast.error(error.response?.data?.error || error.message);
        }

    }
  return (
    <Stack sx = {{
        border : "1px solid rgb(234, 239, 245)",
        borderRadius : "3px",
        position : "relative",
        transition : "all 0.4s ease",
        '&:hover': {
            'transform' : 'translateY(-2px)',
            'cursor' : "pointer",
            "boxShadow": 'inset 0px -80px 100px -80px #615efe76',
            '& .action-buttons': {
            opacity: 1,
          },
        }
    }}>
        <Typography sx = {{
            fontSize : "11px",
            fontWeight : "500",
            color : "rgb(68, 84, 108)",

            position : "absolute",
            top : 10,
            left : 10,

            p : "3px 10px",
            background : "rgb(254, 253, 254)",
            borderRadius : "5px",
            boxShadow : "0px 0px 5px 1px rgb(236, 233, 233)"
        }}>{employee.department}</Typography>
        <Box sx = {{
            display : "flex",
            background : "rgb(244, 248, 251)",
            justifyContent: "center",
            alignItems : "center",
            p : 5,
        }}>
            <Box sx = {{
                borderRadius : "100px",
                p : 3,
                textAlign : "center",
                background : "rgb(229, 234, 252)"
            }}>
                <Typography sx = {{
                    fontSize : "20px",
                    color : '#615EFE',
                    fontWeight : "500"
                }}>{employee.firstName[0]} {employee.lastName[0]}</Typography>
            </Box>

        </Box>

        <Stack
        sx = {{
            p : "20px 15px",
            flex : 1
        }}>
            <Typography sx = {{
                fontSize : "15px"
            }}>{employee.firstName} {employee.lastName}</Typography>
            <Typography sx = {{
                fontSize : "12px",
                color : "#63748F",
                }}>{employee.position}</Typography>
        </Stack>

        <Stack className='action-buttons' sx = {{
            flexDirection : "row",
            position : "absolute",
            bottom : "15%",
            left : "35%",
            gap : 2,
            opacity : 0
        }}>
             {/* edit icon */}
            <Box sx = {{
                display : "flex",
                background : "white",
                padding : "8px",
                borderRadius : "6px",
                transition : "0.3s",
                '&:hover': {
                    color :"#615EFE",
                    transform : "scale(1.05)" 
                }
                
            }}>
                <Pen  size = {'16'} onClick={() => handleEdit()}/>

            </Box>

            {/* delete icon */}
            <Box sx = {{
                display : "flex",
                background : "white",
                padding : "8px",
                borderRadius : "6px",
                transition : "0.3s",
                '&:hover': {
                    color :"red",
                    transform : "scale(1.05)" 
                }
                
            }}
            onClick = {handleDelete}>
                <Trash size = {'16'}/>

            </Box>
        </Stack>
    </Stack>
  )
}

export default EmployeeCard