import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, InputLabel,FormControl,TextField,TableHead } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMEMPLOYEE, TIMECARD } from '../../serverconfiguration/controllers';
import { useState } from 'react';
import { useEffect } from 'react';
import { getRequest} from '../../serverconfiguration/requestcomp';

function getYear(date)
 { 
    let datearr=date.split("-")
    return datearr[0];
 }
 function getMonth(date)
 {
  return date.split("-")[1]
 }
 function getDate(date)
  { 
   return date.split("-")[2].split("T")[0]
  }
  function getJYear(date)
 { 
    let datearr=date.split("/")
    return datearr[2];
 }
 function getJMonth(date)
 {
  return date.split("/")[0]
 }
 function getJDate(date)
  { 
   return date.split("/")[1]
  }

function compareDatesIgnoringTime(date1, date2) {
  console.log(date2)
  console.log(getYear(date1))
  console.log(getMonth(date1))
  console.log(getDate(date1))
  console.log(getJYear(date2))
  console.log(getJMonth(date2))
  console.log(getJDate(date2))
  // Extract year, month, and day components from both dates
  const year1 = getYear(date1)
  const month1 = getMonth(date1)
  const day1 = getDate(date1);

  const year2 = getJYear(date2)
  const month2 = getJMonth(date2)
  const day2 = getJDate(date2);

  // Compare year, month, and day components
  if (year1 == year2 && month1 == month2 && day1 == day2) {
    return 0; // Dates are equal
  } else if (year1 > year2 || (year1 == year2 && month1 > month2) || (year1 == year2 && month1 == month2 && day1 > day2)) {
    return 1; // date1 is later than date2
  } else {
    return -1; // date1 is earlier than date2
  }
}
function Mrgabs() {

    const [employee, setEmployee] = useState([]);
    const [employeeName, setEmployeename] = useState("");
    const [empCode, setEmpcode] = useState("");
    const[employeeCode,setEmployeecode] = useState("");
    const [timeCard, setTimeCard] = useState([]);
    const [pnBranchid, setBranchid] = useState("");
    const [branch, setBranch] = useState([]);
    const [CurrentDay, setCurrentDay] = useState("");
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  

    useEffect(() => {
        async function getData() {
          const employeeData = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
          setEmployee(employeeData.data);
          const timeCardData = await getRequest(ServerConfig.url, TIMECARD);
          setTimeCard(timeCardData.data);
        }
        getData();
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDay(today.toLocaleDateString('en-US', options));
      }, []);
    
      const dateToDay = (dateString) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return days[dayIndex];
      };
      const currentDateEntries = timeCard.filter(entry => entry.dates === currentDate && entry.employeeCode === empCode);
    
  return (
   
<div style={{ textAlign: 'center', margin: '20px' }}>

    <Grid >
<Typography variant="h5" gutterBottom >
      Attendance
</Typography>
<Typography style={{ textAlign:'right',paddingRight:'100px'}}>
    date:15/08/2024

</Typography>
</Grid>

<Grid item xs={6} sm={6}>
            <FormControl fullWidth>
            <InputLabel shrink>PnBranchId</InputLabel>
<select
  name="pnBranchid"
  onChange={(e) => {
    const selectedBranchId = e.currentTarget.value;
    setBranchid(selectedBranchId);
    const selectedEmployee = employee.find((e) => e.pnBranchId == selectedBranchId);
    if (selectedEmployee) {
      setEmpcode(selectedEmployee.employeeCode);
     setEmployeename(selectedEmployee.employeeName);
    }
  }}
  style={{ height: '50px' }}
>
  <option value="">Select</option>
  {employee.map((e) => (
    <option key={e.pnBranchId} value={e.pnBranchId}>{e.pnBranchId}</option>
  ))}
</select>
</FormControl>

<Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <TextField
                name="empCode"
                value={empCode}
                label="Employee Code"
                variant="outlined"
                fullWidth
                required
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <TextField
                name="EmployeeName"
                value={employeeName}
                label="Employee Name"
                variant="outlined"
                fullWidth
                required
              />
            </FormControl>
          </Grid>
        </Grid>

      
<Grid item xs={12}>
<TableContainer component={Paper} style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '1200px' }}>
            <Table>
              <TableBody>
                <TableRow sx={{ border: 1, borderColor: 'black.300' }}>
                  <TableCell sx={{ border: 1, borderColor: 'black.300', padding: '5px' }}>code</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'black.300', padding: '5px' }}>employee</TableCell>
                  {[...Array(31).keys()].map((day) => (
                    <TableCell key={day + 1} sx={{ border: 1, borderColor: 'black.300', padding: '5px' }}>{day + 1}</TableCell>
                  ))}
                  <TableCell sx={{ border: 1, borderColor: 'black.300', padding: '5px' }}>tot</TableCell>
                </TableRow>
                {[...Array(40).keys()].map((row) => (
                  <TableRow key={row + 1} sx={{ border: 1, borderColor: 'black.300' }}>
                    <TableCell sx={{ border: 1, borderColor: 'black.300', padding: '5px' }}>{row + 1}</TableCell>
                    <TableCell sx={{ border: 1, borderColor: 'black.300', padding: '5px' }}>sanjeevi</TableCell>
                    {[...Array(31).keys()].map((day) => (
                      <TableCell key={day + 1} sx={{ border: 1, borderColor: 'black.300', padding: '5px' }}></TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
</Grid>


         


</div>
            
  )
}



export default Mrgabs;