import { Box, Button,  Modal, Stack, Typography } from '@mui/material'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import EmployeeCard from '../components/EmployeeCard';
import { dummyEmployeeData } from '../assets/assets';
import AddNewEmployee from '../components/AddNewEmployee';
import DepartmentSelect from '../components/DepartmentSelect';
import EditEmployee from '../components/EditEmployee';

function Employees() {
  const [createEmployeeModal, setCreateEmployeeModal] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [filteredEmployees, setFilteredEmployees] = useState(dummyEmployeeData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleChange = (e) => {
    const selectedDepartment = e.target.value;
    setSelectedDepartment(selectedDepartment);

    if (selectedDepartment === 'All Departments'){
      setFilteredEmployees(dummyEmployeeData)
    } else {
      const filtered = dummyEmployeeData.filter(
        (employee) => employee.department === selectedDepartment
      );

      setFilteredEmployees(filtered);
    }
  };
  return (
    <Stack sx={{
      paddingRight: 4,
    }}>

      {/* header box  */}
      <Box sx={{
        display: "flex",
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: '', sm: 'center' },
        justifyContent: "space-between"
      }}>

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          height: "100px",
          justifyContent: "center",
        }}>
          <Typography sx={{
            fontSize: "24px",
            fontWeight: "500"
          }}> Employees</Typography>
          <Typography sx={{
            fontSize: "13px",
            color: "rgb(99, 116, 143)",
            marginTop: "2px"
          }}> Manage your team members</Typography>
        </Box>
        <Button variant="contained" size='small' startIcon={<Plus size={'14'} />} sx={{
          background: "rgb(91, 82, 252)",
          marginBottom: "20px",
          textTransform: "none",
          fontWeight: '300',
          padding: "7px 16px"
        }}
        onClick = {() => setCreateEmployeeModal(true)}
        >Add Employee </Button>
      </Box>

      {/* search bar section */}
      <Stack sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: "space-between",
        gap: 3,
      }}>
        <Box sx={{
          flex: 1,
        }}>
          <SearchBar />
        </Box>
        <Box>
          <DepartmentSelect selectedDepartment = {selectedDepartment} handleChange ={handleChange} />
        </Box>
      </Stack>

      <Stack sx={{
        flexDirection: "row",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 2,
        justifyContent: "space-between",
        marginTop: "30px",
        paddingRight: 3,
      }}>

        {filteredEmployees.map((emp, key) => (
          <EmployeeCard key = {key} employee = {emp} onEdit = {setShowEditModal} setCurrentEmployee = {setCurrentEmployee} />
        ))}
      </Stack>
      
      {/* create new employees */}

      <Modal
      open = {createEmployeeModal}
      onClose = {() => setCreateEmployeeModal(false)}
      sx = {{
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
      }}
      > 
      <AddNewEmployee addModal = {setCreateEmployeeModal} />
      </Modal>


      {/* edit employee */}

      <Modal
      open = {showEditModal}
      onClose = {() => setShowEditModal(false)}
      sx = {{
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
      }}
      > 
      <EditEmployee showModal = {setShowEditModal} emp = {currentEmployee} />
      </Modal>


    </Stack>
  )
}

export default Employees