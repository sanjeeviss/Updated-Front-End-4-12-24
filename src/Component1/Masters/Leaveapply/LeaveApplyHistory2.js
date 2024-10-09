import React, { useState, useEffect } from 'react';
import { Box, Typography, Table,Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
import { postRequest } from "../../../serverconfiguration/requestcomp";
import { REPORTS } from "../../../serverconfiguration/controllers";
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import Sidenav from "../../Home Page3/Sidenav2";
import Navbar from "../../Home Page3/Navbar2";
// Status Chip component
const statusChip = (status) => {
    if (status === 'A') {
        return <Chip label="Approved" style={{ backgroundColor: 'green', color: 'white', fontSize: '12px', height: '20px' }} />;
    } else if (status === 'R') {
        return <Chip label="Rejected" style={{ backgroundColor: 'red', color: 'white', fontSize: '12px', height: '20px' }} />;
    } else {
        return <Chip label="Pending" style={{ backgroundColor: 'orange', color: 'white', fontSize: '12px', height: '20px' }} />;
    }
};

const LeaveRequestTable2 = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const isloggedin = sessionStorage.getItem("user");

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch all leave requests
                const allData = await postRequest(ServerConfig.url, REPORTS, {
                    query: `SELECT pn_Leavename, status, from_date, to_date, reason, approve FROM leave_apply WHERE pn_EmployeeID = (SELECT pn_EmployeeID FROM paym_Employee WHERE EmployeeCode = '${isloggedin}')`
                });
                setLeaveRequests(allData.data);

                // Fetch employee name
                const employeeData = await postRequest(ServerConfig.url, REPORTS, {
                    query:`SELECT Employee_Full_Name FROM paym_Employee WHERE EmployeeCode = '${isloggedin}'`
                });
                setEmployeeName(employeeData.data[0]?.Employee_Full_Name || 'Employee');
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [isloggedin]);

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
               
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            <Box sx={{ padding: '8px', backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '900px', width: '100%', position: 'relative' }}>
                <Typography variant="h6" component="div" sx={{ marginBottom: '8px', fontSize: '16px', textAlign: 'center' }}>
                    Leave Status 
                </Typography>
                <Box sx={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', marginBottom: '8px', textAlign: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '14px' }}>Employee Name: {employeeName}</Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: '4px', fontSize: '12px' }}>Leave Name</TableCell>
                                <TableCell sx={{ padding: '4px', fontSize: '12px' }}>Status</TableCell>
                                <TableCell sx={{ padding: '4px', fontSize: '12px' }}>Request Dates</TableCell>
                                <TableCell sx={{ padding: '4px', fontSize: '12px' }}>Reason</TableCell>
                                <TableCell sx={{ padding: '4px', fontSize: '12px' }}>Approved By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leaveRequests.map((request, index) => (
                                <TableRow key={index}>
                                    <TableCell>{request.pn_Leavename}</TableCell>
                                    <TableCell>{statusChip(request.status)}</TableCell>
                                    <TableCell>
                                        {`${new Date(request.from_date).toLocaleDateString()} - ${new Date(request.to_date).toLocaleDateString()}`}
                                    </TableCell>
                                    <TableCell>{request.reason}</TableCell>
                                    <TableCell>{request.approve}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
        </Grid>
        </Box>
        </div>
        </Grid>
        </Grid>
    );
};

export default LeaveRequestTable2;