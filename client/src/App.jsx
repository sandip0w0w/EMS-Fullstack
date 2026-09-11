import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginLanding from './pages/LoginLanding'
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import Attendance from "./pages/Attendance.jsx";
import PaySlip from "./pages/PaySlip.jsx";
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import PrintPaySlip from './pages/PrintPaySlip';
import Leave from './pages/Leave';
import Layout from './pages/Layout';
import LoginForm from './components/login/LoginForm.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProtectedLayout from './pages/ProtectedLayout.jsx';

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            height: "100%",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.23)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#615EFE",
              boxShadow: "0px 0px 0px 1px #615efe4b",
            },
          },
          '& .MuiInputBase-input': {
            fontSize: "13px",
          },
        },
      },
    },

    MuiSelect :{
      styleOverrides:{
        root : {
          "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#615EFE",
                boxShadow: "0px 0px 0px 1px #615efe4b"
              },
        }
      }
    }
  },
});


function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginLanding />} />
          <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" description="Sign in to manage the organization" />} />
          <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" description="Sign in to access your account" />} />

          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route element={<ProtectedLayout allowedRoles={['ADMIN']} />}>
            <Route path="/employees" element={<Employees />} />
          </Route>

            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/payslips" element={< PaySlip />} />
            <Route path="/settings" element={<Settings />} />
            

          </Route>
          <Route path="/print/payslips/:id" element={<PrintPaySlip />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App