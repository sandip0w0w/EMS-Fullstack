import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { Plus } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import EmployeeCard from '../components/employees/EmployeeCard';
import { dummyEmployeeData } from '../assets/assets';
import AddNewEmployee from '../components/employees/AddNewEmployee';
import DepartmentSelect from '../components/employees/DepartmentSelect';
import EditEmployee from '../components/employees/EditEmployee';
import api from '../api/axios';

function Employees() {
  const [createEmployeeModal, setCreateEmployeeModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [search, setSearch] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const url = selectedDepartment == 'All Departments' ? "/employees" : `/employees?department=${selectedDepartment}`;
      const res = await api.get(url)
      setEmployees(res.data)
    } catch (err) {
      console.error("Failed to fetch employees")
    } finally {
      setLoading(false)
    }
  }, [selectedDepartment])

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees])

  const filtered = employees
    .filter((emp) => !emp.isDeleted)
    .filter((emp) => `${emp.firstName} ${emp.lastName} ${emp.position}`.toLowerCase()
      .includes(search.toLowerCase()))

  return (
    <Stack sx={{
      paddingRight: 4,
      gap: 4
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
          justifyContent: "center"
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
          onClick={() => setCreateEmployeeModal(true)}
        >Add Employee </Button>
      </Box>

      {/* search bar section */}
      <Stack sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: "space-between",
        gap: 2,
      }}>
        <Box sx={{
          flex: 1,
        }}>
          <SearchBar search={search} setSearch={setSearch} />
        </Box>
        <Box>
          <DepartmentSelect selectedDepartment={selectedDepartment} handleChange={setSelectedDepartment} />
        </Box>
      </Stack>

      {filtered.length === 0 ? (
        <Stack sx = {{
          display: "flex",
          justifyContent : "center",
        }}>
          <Typography sx={{
            textAlign: "center",
            fontSize: "14px",
            color: "rgb(98, 116, 142)",
          }}>No employees found</Typography>
        </Stack>
      ) :
        (<Stack sx={{
          flexDirection: "row",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 320px))",
          alignItems: "center",
          gap: 2,
        }}> 
          {filtered.map((emp) => (
          <EmployeeCard
            key={emp.userId}
            employee={emp}
            onEdit={setShowEditModal}
            setCurrentEmployee={setCurrentEmployee}
          />
          ))}
          </Stack>)}

      {/* create new employees */}

      <Modal
        open={createEmployeeModal}
        onClose={() => setCreateEmployeeModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <AddNewEmployee addModal={setCreateEmployeeModal} />
      </Modal>


      {/* edit employee */}

      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <EditEmployee showModal={setShowEditModal} emp={currentEmployee} />
      </Modal>


    </Stack>
  )
}

export default Employees