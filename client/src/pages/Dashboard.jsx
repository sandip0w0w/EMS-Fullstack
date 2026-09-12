import { Box, Stack, Typography } from '@mui/material'
import { Building2, Calendar, ScrollText, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyAdminDashboardData } from '../assets/assets'
import AdminDashboard from '../components/AdminDashboard';
import EmployeeDashboard from '../components/employees/EmployeeDashboard';
import { useAuth } from '../context/AuthContext'
import api from '../api/axios';
import toast from "react-hot-toast";
import Loading from '../Loading';


function Dashboard() {
  const [data, setData] = useState(null)
  const { user } = useAuth();
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data)).catch((err) =>
    toast.error(err.response?.data?.error || err?.message)).finally(() => setLoading(false))
  }, [])

  if(loading) return <Loading />;
  if (!data) return <div>No dashboard data</div>;

  if (user?.role === 'ADMIN'){
    return (
      <AdminDashboard data = {data} />
    );
    
} else {
  return (
    <EmployeeDashboard data = {data} />
  );
}
}

export default Dashboard