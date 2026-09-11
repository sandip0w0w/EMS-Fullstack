import { MenuItem, Select } from '@mui/material';

function DepartmentSelect({selectedDepartment, handleChange}) {
    const departments = ['All Departments', 'Engineering', 'Human Resource', 'Marketing', 'Sales', 'Finance', 'Operations',
    'IT Support', 'Customer Support', 'Product Management', 'Design'
  ];
  return (
    <>
    <Select
            sx={{
              height: "37px",
              width: {xs: '150px', md : "150px"},
              fontSize: "12px"
            }}

            value={selectedDepartment}
            onChange={(e) => handleChange(e.target.value)}
          >
            {departments.map((department) => (
              <MenuItem key={department}
                value={department}>{department}</MenuItem>
            ))}
          </Select>
    </>
  )
}

export default DepartmentSelect