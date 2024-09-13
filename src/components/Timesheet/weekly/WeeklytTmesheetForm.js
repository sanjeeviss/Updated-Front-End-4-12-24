import React, { useState } from 'react';
import { Paper, Typography, Table, InputLabel,TableHead, TableBody, TableRow, TableCell, Select, MenuItem, Grid,FormControl,TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { PAYMEMPLOYEE, TIMECARD } from '../../../serverconfiguration/controllers';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';

const WeeklyTimesheetForm = () => {
  // Simulated dropdown options
  const navigate = useNavigate();
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
const [employee,setEmployee]=useState([])
const [timeCard,setTimeCard]=useState([])
  const [pnCompanyid,setCompanyid]=useState("")
  const [pnBranchid,setBranchid]=useState("") 
  const [employeeCode,setEmployeecode]=useState("")
  const [employeeName,setEmployeename]=useState("")
  const [empCode,setEmpcode]=useState("")
  const [empName,setEmpname]=useState("")
  const [dates,setDates]=useState("")
  const [days,setDays]=useState("")
  const [intime,setIntime]=useState("")
  const [breakOut,setBreakout]=useState("")
  const [breakIn,setBreakin]=useState("")
  const [earlyOut,setEarlyout]=useState("")
  const [outtime,setOuttime]=useState("")
  const [lateIn,setLatein]=useState("")
  const [lateOut,setLateout]=useState("")
  const [otHrs,setOthrs]=useState("")
  const [status,setStatus]=useState("")
  const [weekStartDate, setWeekStartDate] = useState("");


  const companyOptions = ['Company A', 'Company B', 'Company C'];
  const branchOptions = ['Branch 1', 'Branch 2', 'Branch 3'];
 

  
  useEffect(() => {
    async function getData() {
      const employeeData = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      console.log("Employee Data:", employeeData); // Check the fetched employee data
      setEmployee(employeeData.data);
      
      const timeCardData = await getRequest(ServerConfig.url, TIMECARD);
      console.log("Time Card Data:", timeCardData); // Check the fetched time card data
      setTimeCard(timeCardData.data);
    }
    getData();
  }, []);

  // Get today's date
var today = new Date();

// Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
var dayOfWeek = today.getDay();

// Calculate the difference between today's date and the start of the week (considering Monday as the start of the week)
var diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

// Create a new Date object for the starting date of the week
var startDateOfWeek = new Date(today.setDate(diff));

// Iterate through each date starting from the first day of the week (Monday) to the current date
for (var d = new Date(startDateOfWeek); d <= today; d.setDate(d.getDate() + 1)) {
    console.log(d);
}


// function compareDatesIgnoringTime(date1, date2) {
//   console.log(date2)
//   console.log(getYear(date1))
//   console.log(getMonth(date1))
//   console.log(getDate(date1))
//   console.log(getJYear(date2))
//   console.log(getJMonth(date2))
//   console.log(getJDate(date2))
//   // Extract year, month, and day components from both dates
//   const year1 = getYear(date1)
//   const month1 = getMonth(date1)
//   const day1 = getDate(date1);

//   const year2 = getJYear(date2)
//   const month2 = getJMonth(date2)
//   const day2 = getJDate(date2);

//   // Compare year, month, and day components
//   if (year1 == year2 && month1 == month2 && day1 == day2) {
//     return 0; // Dates are equal
//   } else if (year1 > year2 || (year1 == year2 && month1 > month2) || (year1 == year2 && month1 == month2 && day1 > day2)) {
//     return 1; // date1 is later than date2
//   } else {
//     return -1; // date1 is earlier than date2
//   }
// }
  const [formData] = useState({
    pnCompanyid: pnCompanyid,
    pnBranchid: pnBranchid,
    employeeCode: empCode,
    empName: empName,
    dates:dates,
    days:days,
    intime:intime,
    breakOut:breakOut,
    breakIn:breakIn,
    earlyOut:earlyOut,
    outtime:outtime,
    lateIn:lateIn,
    lateOut:lateOut,
    otHrs:otHrs,
    status:status,
    
    entries: [
      { day: 'Monday', intime: '', outtime: '', latein: '', lateout: '', breakin:'',breakout:'', othrs: '', status: '' },
      { day: 'Tuesday',  intime: '', outtime: '', latein: '', lateout: '', breakin:'',breakout:'', othrs: '', status: '' },
      { day: 'Wednesday', intime: '', outtime: '', latein: '', lateout: '', breakin:'',breakout:'', othrs: '', status: '' },
      { day: 'Thursday',  intime: '', outtime: '', latein: '', lateout: '',  breakin:'',breakout:'',othrs: '', status: '' },
      { day: 'Friday',  intime: '', outtime: '', latein: '', lateout: '',  breakin:'',breakout:'',othrs: '', status: '' },
      { day: 'Saturday', intime: '', outtime: '', latein: '', lateout: '', breakin:'',breakout:'', othrs: '', status: '' },
      { day: 'Sunday', intime: '', outtime: '', latein: '', lateout: '', breakin:'',breakout:'', othrs: '', status: '' }
    ]
  });

  const handleCompanyChange = (event) => {
    // Handle company selection
    console.log(event.target.value);
  };

  const handleBranchChange = (event) => {
    // Handle branch selection
    console.log(event.target.value);
  };

  const filterTimeSheetByWeek = (entries) => {
    if (!Array.isArray(entries)) return [];
  
    const startDate = new Date(weekStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
  
    return entries.filter(entry => {
      const entryDate = new Date(entry.dates);
      // Check if entry date falls within the selected week
      return entryDate >= startDate && entryDate <= endDate;
    });
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 1100 }}>
        <Typography variant="h5" gutterBottom>
          Weekly Timesheet
        </Typography>
        <Grid container spacing={2}>
  {/* Company ID and Branch ID */}
  <Grid item xs={6} sm={6}>
    <FormControl fullWidth>
      <InputLabel shrink>Company</InputLabel>
      <select
        name="pnCompanyId"
        onChange={(e) => {
          // setCompany(e.target.value)
        }}
        style={{ height: '50px' }}
      >
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
      <select name="pnBranchId"  style={{ height: '50px' }}>
        <option value="">Select</option>
        {employee.map((e) => (
          <option>{e.pnBranchId}</option>
          
        ))}
        
      </select>
    </FormControl>
  </Grid>

  {/* Employee Code and Employee Name */}
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
                    setEmployeename(selectedEmployee.employeeFullName);
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
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <TextField
                type="date"
                label="Week Start Date"
                value={weekStartDate}
                onChange={(e) => setWeekStartDate(e.target.value)
                   
                }
               
                variant="outlined"
                fullWidth
                required
              />
            </FormControl>
          </Grid>
</Grid>

        
  
       
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Date</TableCell> {/* Moved Date to the second position */}
              <TableCell>Intime</TableCell>
              <TableCell>Outtime</TableCell>
              <TableCell>Late In</TableCell>
              <TableCell>Late Out</TableCell>
              <TableCell>Break In</TableCell>
              <TableCell>Break Out</TableCell>
              <TableCell>Ot Hours</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
          {timeCard
      .filter((entry) => entry.empCode === empCode)
      .map((entry, index) => {
        console.log("Filtered Entries for Employee and Week:", entry);
        const weekEntries = filterTimeSheetByWeek(entry); // Pass the whole entry
        console.log("Week Entries:", weekEntries);
        return weekEntries.map((weekEntry, innerIndex) => (
          <TableRow key={index + "-" + innerIndex}>
            <TableCell>{weekEntry.days}</TableCell>
          <TableCell>{new Date(weekEntry.intime).toLocaleTimeString()}</TableCell>
          <TableCell>{new Date(weekEntry.outtime).toLocaleTimeString()}</TableCell>
                    <TableCell>{new Date(weekEntry.latein).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(weekEntry.lateout).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(weekEntry.breakin).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(weekEntry.breakout).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(weekEntry.othrs).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(weekEntry.status).toLocaleDateString()}</TableCell>
                  </TableRow>
                ));
              })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default WeeklyTimesheetForm;