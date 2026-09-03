import { Box, Button, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { dummyPayslipData } from '../assets/assets';

function period_converter(month, year) {
  const month_name = new Date(year, month - 1).toLocaleString('default', { month: 'long' });
  return `${month_name} ${year}`
}

function PrintPaySlip() {
  const { id } = useParams();

  const [paySlip, setPaySlip] = useState(null);

  useEffect(() => {
    setPaySlip(dummyPayslipData.find(slip => slip._id === id))
  }, [id])

  return (
    <>
      {paySlip && (
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          pt: 7
        }}>
          <Stack sx={{
            width : {xs : "80%", sm : "400px"},
            gap: 3
          }}>

            {/* header */}
            <Box sx={{
              textAlign: "center"
            }}>

              <Typography sx={{
                fontSize: "20px",
                fontWeight: "600"
              }}>PAYSLIP</Typography>

              <Typography sx={{
                fontSize: "12px",
                color: 'rgb(144, 160, 184)'
              }}>{period_converter(paySlip.month, paySlip.year)}</Typography>

            </Box>

            <Divider />

            {/* employee details */}

            <Stack sx={{
              gap: 3
            }}>
              {/* name and position */}
              <Box sx={{
                display: "flex",
                flexDirection : {xs : 'column', sm : 'row'}
              }}>
                {/* name */}
                <Box sx={{ width: "100%" }}>
                  <Typography sx={{
                    fontSize: "12px",
                    fontWeight: '300',
                    color: 'rgb(144, 160, 184)'
                  }}>EMPLOYEE NAME</Typography>

                  <Typography sx={{
                    fontSize: "15px",
                    fontWeight: '500'
                  }}>{paySlip.employee.firstName} {paySlip.employee.lastName}</Typography>
                </Box>

                {/* position */}
                <Box sx={{ width: "100%" }}>
                  <Typography sx={{
                    fontSize: "12px",
                    fontWeight: '300',
                    color: 'rgb(144, 160, 184)'
                  }}>POSITION</Typography>

                  <Typography sx={{
                    fontSize: "15px",
                    fontWeight: '500'
                  }}>{paySlip.employee.position}</Typography>
                </Box>
              </Box>

              {/* email and period */}

              <Box sx={{
                display: "flex",
                flexDirection : {xs : 'column', sm : 'row'}
              }}>
                {/* email*/}
                <Box sx={{ width: "100%" }}>
                  <Typography sx={{
                    fontSize: "12px",
                    fontWeight: '300',
                    color: 'rgb(144, 160, 184)'
                  }}>EMAIL</Typography>

                  <Typography sx={{
                    fontSize: "15px",
                    fontWeight: '500'
                  }}>{paySlip.employee.email}</Typography>
                </Box>

                {/* period */}
                <Box sx={{ width: "100%" }}>
                  <Typography sx={{
                    fontSize: "12px",
                    fontWeight: '300',
                    color: 'rgb(144, 160, 184)'
                  }}>PERIOD</Typography>

                  <Typography sx={{
                    fontSize: "15px",
                    fontWeight: '500'
                  }}>{period_converter(paySlip.month, paySlip.year)}</Typography>
                </Box>
              </Box>


            </Stack>

            {/* slip break down table */}
            <Box sx={{
              border: "1px solid rgb(241, 244, 248)",
              borderRadius: "7px",
              flexDirection: "row",
              width: "95%",
            }}>
              <TableContainer >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{
                        color: 'rgb(99, 117, 142)',
                        fontSize: "11px",
                        fontWeight: '600',
                        background: "rgb(249, 251, 252)"
                      }} align="left">
                        DESCRIPTION
                      </TableCell>

                      <TableCell sx={{
                        color: 'rgb(99, 117, 142)',
                        fontSize: "11px",
                        fontWeight: '600',
                        background: "rgb(249, 251, 252)"
                      }} align="right">
                        AMOUNT
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {/* basic salary */}

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{
                        color: 'rgb(99, 117, 142)',
                        fontSize: "13px",
                        fontWeight: '600',
                      }} align="left">
                        Basic Salary
                      </TableCell>

                      <TableCell sx={{
                        fontSize: "13px",
                        fontWeight: '600',
                      }} align="right">
                        +${paySlip.basicSalary}
                      </TableCell>
                    </TableRow>

                    {/* allowance */}
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{
                        color: 'rgb(99, 117, 142)',
                        fontSize: "13px",
                        fontWeight: '600',
                      }} align="left">
                        Allowances
                      </TableCell>

                      <TableCell sx={{
                        fontSize: "13px",
                        fontWeight: '600',
                      }} align="right">
                        +${paySlip.allowances}
                      </TableCell>
                    </TableRow>

                    {/* deductions */}

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{
                        color: 'rgb(99, 117, 142)',
                        fontSize: "13px",
                        fontWeight: '600',
                      }} align="left">
                        Deductions
                      </TableCell>

                      <TableCell sx={{
                        fontSize: "13px",
                        fontWeight: '600',
                      }} align="right">
                        -${paySlip.deductions}
                      </TableCell>
                    </TableRow>

                    {/* net salary */}

                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{
                        fontSize: "13px",
                        fontWeight: '600',
                        background: "rgb(249, 251, 252)"
                      }} align="left">
                        Net Salary
                      </TableCell>

                      <TableCell sx={{
                        fontSize: "13px",
                        fontWeight: '600',
                        background: "rgb(249, 251, 252)"
                      }} align="right">
                        ${paySlip.netSalary}
                      </TableCell>
                    </TableRow>


                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* print button */}
            <Box sx = {{alignSelf : "center"}}>
              <Button variant="contained" size='small' sx={{
                background: "rgb(91, 82, 252)",
                marginBottom: "20px",
                textTransform: "none",
                fontWeight: '300',
                padding: "7px 16px"
              }}
              onClick={() => window.print()}
              >Print Payslip</Button>
            </Box>

          </Stack>

        </Box>

      )}

    </>

  )
}

export default PrintPaySlip