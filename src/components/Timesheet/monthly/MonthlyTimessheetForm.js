import React, { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, Grid, MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';
import { PAYMEMPLOYEE, TIMECARD } from '../../../serverconfiguration/controllers';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';

function filterUniqueObjects(array, propertyName) {
  return array.filter((obj, index, self) =>
    index === self.findIndex((t) => (
      t[propertyName] === obj[propertyName]
    ))
  );
}

const MonthlyTimesheetForm = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [timeCard, setTimeCard] = useState([]);
  const [empCode, setEmpcode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [formData, setFormData] = useState({
    selectedMonth: '',
    entries: []
  });

  const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  useEffect(() => {
    async function getData() {
      const employeeData = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(employeeData.data);
      const timeCardData = await getRequest(ServerConfig.url, TIMECARD);
      setTimeCard(filterUniqueObjects(timeCardData.data, 'sno'));
    }
    getData();
  }, []);

  const handleMonthChange = async (event) => {
    const selectedMonth = event.target.value;
    setFormData({
      ...formData,
      selectedMonth,
    });
    try {
      const response = await getRequest(ServerConfig.url, `${TIMECARD}?month=${selectedMonth}`);
      const timecardData = response.data;
      console.log('Timecard data:', timecardData); // Log timecardData to check its structure
      const entries = timecardData.map((entry) => ({
        dates: entry.dates,
        days: getDayOfWeek(entry.dates),
        intime: entry.intime,
        outtime: entry.outtime,
        lateIn: entry.lateIn,
        lateOut: entry.lateOut,
        breakIn: entry.breakIn,
        breakOut: entry.breakOut,
        otHrs: entry.otHrs,
        status: entry.status,
        empCode: entry.empCode, // Add empCode property if it's missing
      }));
      console.log('Entries:', entries); // Log entries to check if they are populated correctly
      setFormData((prevFormData) => ({
        ...prevFormData,
        entries,
      }));
    } catch (error) {
      console.error('Error fetching timecard data:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 1100 }}>
        <Typography variant="h5" gutterBottom>
          Monthly Time sheet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel shrink>Company</InputLabel>
              <select name="pnCompanyId" style={{ height: '50px' }}>
                <option value="">Select</option>
                {employee.map((e) => (
                  <option>{e.pnCompanyId}</option>
                ))}
              </select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel shrink>Branch</InputLabel>
              <select name="pnBranchId" style={{ height: '50px' }}>
                <option value="">Select</option>
                {employee.map((e) => (
                  <option>{e.pnBranchId}</option>
                ))}
              </select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel shrink>EmpCode</InputLabel>
              <select
                name="empcode"
                onChange={(e) => {
                  const selectedEmpCode = e.currentTarget.value;
                  setEmpcode(selectedEmpCode);
                  const selectedEmployee = employee.find((e) => e.employeeCode === selectedEmpCode);
                  if (selectedEmployee) {
                    setEmployeeName(selectedEmployee.employeeFullName);
                  }
                }}
                style={{ height: '50px' }}
              >
                <option value="">Select</option>
                {employee.map((e) => (
                  <option key={e.employeeCode}>{e.employeeCode}</option>
                ))}
              </select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <TextField
                name="pnEmployeeName"
                value={employeeName}
                label="Employee Name"
                variant="outlined"
                fullWidth
                required
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={6}>
    <FormControl fullWidth>
      <InputLabel shrink>Month</InputLabel>
      <Select
        value={formData.selectedMonth}
        onChange={handleMonthChange}
        style={{ height: '50px', width: '388px' }}
        displayEmpty
      >
        <MenuItem value="" disabled>Selected</MenuItem> {/* Placeholder */}
        {monthOptions.map((month, index) => (
          <MenuItem key={index} value={month}>{month}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>

        
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>In Time</TableCell>
              <TableCell>Out Time</TableCell>
              <TableCell>Late In</TableCell>
              <TableCell>Late Out</TableCell>
              <TableCell>Break In</TableCell>
              <TableCell>Break Out</TableCell>
              <TableCell>Ot Hours</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {formData.entries
    .filter(entry => entry.empCode === empCode && new Date(entry.dates).getMonth() === monthOptions.indexOf(formData.selectedMonth))
    .map((entry, index) => (
      console.log('Rendering entry:', entry), // Add this line to check if entries are being rendered
   
       <TableRow key={index}>
                <TableCell>{entry.dates}</TableCell>
                <TableCell>{entry.days}</TableCell>
                <TableCell>{entry.intime}</TableCell>
                <TableCell>{entry.outtime}</TableCell>
                <TableCell>{entry.lateIn}</TableCell>
                <TableCell>{entry.lateOut}</TableCell>
                <TableCell>{entry.breakIn}</TableCell>
                <TableCell>{entry.breakOut}</TableCell>
                <TableCell>{entry.otHrs}</TableCell>
                <TableCell>{entry.status}</TableCell>
              </TableRow>
    ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default MonthlyTimesheetForm;
