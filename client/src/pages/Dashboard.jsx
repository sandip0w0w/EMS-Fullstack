import { Box, Stack, Typography } from '@mui/material'
import { Building2, Calendar, ScrollText, Users } from 'lucide-react'
import React, { useState } from 'react'
import { dummyAdminDashboardData } from '../assets/assets'
import AdminDashboard from '../components/AdminDashboard';
import EmployeeDashboard from '../components/EmployeeDashboard';


function Dashboard() {
  const [role, setRole] = useState('AD');

  if (role === 'ADMIN'){
    return (
      <AdminDashboard />
    );
    
} else {
  return (
    <EmployeeDashboard />
  );
}
}

export default Dashboard