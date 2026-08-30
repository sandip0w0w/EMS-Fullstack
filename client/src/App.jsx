import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginLanding from './pages/LoginLanding'
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import Attendance from "./pages/Attendance.jsx";
import PaySlip from "./pages/PaySlip.jsx";
import Settings from './pages/Settings';
import PrintPaySlip from './pages/PrintPaySlip';
import Leave from './pages/Leave';
import Layout from './pages/Layout';
import LoginForm from './components/LoginForm.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily : "Outfit , sans-serif",
  },
});


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster />
        <Routes>
          <Route path="/login" element={<LoginLanding />} />
          <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" description = "Sign in to manage the organization" />} />
          <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" description = "Sign in to access your account" />} />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/payslips" element={< PaySlip />} />
            <Route path="/settings" element={<Settings />} />

          </Route>
          <Route path="/print/payslips/:id" element={<PrintPaySlip />} />
          <Route path="/*" element={< Navigate to="/dashboard" replace />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App