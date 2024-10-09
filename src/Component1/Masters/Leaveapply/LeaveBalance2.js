import React, { useState, useEffect } from 'react';
import { Grid, Paper, CardContent, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../serverconfiguration/controllers';
import { postRequest } from '../../../serverconfiguration/requestcomp';
import Sidenav from "../../Home Page3/Sidenav2";
import Navbar from "../../Home Page3/Navbar2";
const LeaveBalances2 = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [employeeLeaveData, setEmployeeLeaveData] = useState([]);
  const navigate = useNavigate();

  const fetchLeaveData = async () => {
    try {
      const query = `
        SELECT 
            paym_EncashmentDetails.pn_EmployeeId,
            paym_Employee.Employee_Full_Name, 
            paym_EncashmentDetails.Pn_LeaveId,
            leave_apply.pn_Leavename,
            paym_EncashmentDetails.Allow_Days,
            paym_EncashmentDetails.Taken_Days,
            paym_EncashmentDetails.Bal_Days
        FROM 
            paym_EncashmentDetails 
        JOIN 
            paym_Employee 
        ON 
            paym_Employee.pn_EmployeeID = paym_EncashmentDetails.pn_EmployeeId 
        JOIN
            leave_apply
        ON
            paym_EncashmentDetails.Pn_LeaveId = leave_apply.pn_LeaveID;
      `;
      
      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        // Assuming the response data contains the rows
        const data = response.data || [];
        
        // Process leave data if needed
        const leaveData = data.map(row => ({
          type: row.pn_Leavename,
          granted: row.Allow_Days,
          balance: row.Bal_Days
        }));

        setLeaveData(leaveData);
        setEmployeeLeaveData(data);
      } else {
        console.error`(Unexpected response status: ${response.status})`;
      }
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const handleApplyClick = () => {
    navigate('/LeaveBalanceForm');
  };

  return (
    <Grid container>
    {/* Navbar and Sidebar */}
    <Grid item xs={12}>
      <div style={{ backgroundColor: "#fff" }}>
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          {/* Main Content */}
          <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px" ,textAlign: 'left' }}>
          
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginTop: '1px' }}>
        Leave Balances
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="secondary" onClick={handleApplyClick} style={{ fontWeight: 'bold', marginRight: '50px', width: '190px', height: '40px', marginTop: '-20px' }}>
          Leave Balance Form
        </Button>
      </div>

      <Grid container spacing={2} mt={2} ml={-2}>
        {leaveData.map((leave, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Paper sx={{ background: 'linear-gradient(to right, #9d02cc, #67bfb8)', height: "160px", width: "220px", color: "white", fontWeight: "400" }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1" style={{ textAlign: 'left' }}>
                    {leave.type}
                  </Typography>
                  <Typography variant="subtitle1" color="white" style={{ textAlign: 'right' }}>
                    Granted: {leave.granted}
                  </Typography>
                </Box>
                <Typography variant="h4" mt={5}>{leave.balance}</Typography>
                <Typography variant="body2" color="white">
                  Balance
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 4 }} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Leave ID</TableCell>
              <TableCell>Leave Name</TableCell>
              <TableCell>Allow Days</TableCell>
              <TableCell>Taken Days</TableCell>
              <TableCell>Balance Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeLeaveData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.pn_EmployeeId}</TableCell>
                <TableCell>{row.Employee_Full_Name}</TableCell>
                <TableCell>{row.Pn_LeaveId}</TableCell>
                <TableCell>{row.pn_Leavename}</TableCell>
                <TableCell>{row.Allow_Days}</TableCell>
                <TableCell>{row.Taken_Days}</TableCell>
                <TableCell>{row.Bal_Days}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </Grid>
    </Box>
    </div>
    </Grid>
    </Grid>
  );
};

export default LeaveBalances2;