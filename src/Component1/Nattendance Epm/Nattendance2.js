import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Sidenav from "../Home Page3/Sidenav2";
import Navbar from "../Home Page3/Navbar2";
import { postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { REPORTS, TIMECARD } from "../../serverconfiguration/controllers";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import WeekendIcon from '@mui/icons-material/Weekend'; // Import the weekend icon
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useNavigate } from "react-router-dom";
import './caleder.css'
const LegendItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  border: '1px solid #ccc',
  borderRadius: 4,
  padding: theme.spacing(2),
}));
const WeekendStyledBox = styled('div')({
  backgroundColor: '#f0f0f0', // Light gray background for weekends
  color: '#d32f2f', // Red text color for weekends
});

export default function BasicDateCalendar2() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const intimeRef = useRef(null); // Store intime for comparison
  const timeoutRef = useRef(null); // To store the timeout reference
  const [employee, setEmployee] = useState(null);
  const [employeeName, setEmployeeName] = useState('');
  const[pncompanyid,setPnCompanyId] = useState('');
  // const[pnEmployeeid,setPnEmployeeId] = useState('');
  const[pnbranchid,setPnBranchId] = useState('');
   const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const isloggedin = sessionStorage.getItem('user');
   const [shiftname, setShiftName] = useState(''); // New state for shift code
   const [holidays, setHolidays] = useState([]);
   const navigate = useNavigate();
   const [leaveData, setLeaveData] = useState([]);
   const [weekend, setweekend] = useState("")
   const handleClick = () => {
    navigate('/LeaveapplyHr2'); // Replace with the correct path for your LeaveapplyHr2 component
  };

  useEffect(() => {
    async function getData() {
        try {
            const isloggedin = sessionStorage.getItem('user');
            if (isloggedin) {
                const employeeData = await postRequest(ServerConfig.url, REPORTS, {
                    query: `SELECT * FROM paym_Employee WHERE EmployeeCode = '${isloggedin}'`,
                });
                if (employeeData.data && employeeData.data.length > 0) {
                    const emp = employeeData.data[0]; // Extract the employee object
                    if (emp) { // Check if emp is not null
                        setEmployee(emp);
                        setEmployeeName(emp.Employee_Full_Name);
                        setPnCompanyId(emp.pn_CompanyID);
                        setPnBranchId(emp.pn_BranchID);
                        // Set the pnEmployeeID if it exists
                        // setPnEmployeeId(emp.pn_EmployeeID); // Uncomment if pn_EmployeeID is needed
                    } else {
                        console.error('Employee data is null or undefined');
                    }
                } else {
                    console.error('No employee data found');
                }
            }
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }
    getData();
}, []);

useEffect(() => {
  const fetchShiftName = async () => {
      if (employee && employee.pn_EmployeeID) {
          try {
              // Query to get pn_ShiftID from paym_employee_profile1 based on pn_EmployeeID
              const profileData = await postRequest(ServerConfig.url, REPORTS, {
                  query: `SELECT pn_ShiftID FROM paym_employee_profile1 WHERE pn_EmployeeID = '${employee.pn_EmployeeID}'`,
              });
              
              if (profileData.data && profileData.data.length > 0) {
                  const shiftId = profileData.data[0].pn_ShiftID;

                  // Now query to get v_shiftname from paym_shift based on pn_ShiftID
                  const shiftData = await postRequest(ServerConfig.url, REPORTS, {
                      query: `SELECT v_shiftname FROM paym_shift WHERE pn_ShiftID = '${shiftId}'`,
                  });

                  if (shiftData.data && shiftData.data.length > 0) {
                      const shiftName = shiftData.data[0].v_shiftname;
                      setShiftName(shiftName)
                      console.log('Shift Name:', shiftName);
                      // Now you can use the shiftName as needed
                  } else {
                      console.error('No shift data found for Shift ID:', shiftId);
                  }
              } else {
                  console.error('No profile data found for Employee ID:', employee.pn_EmployeeID);
              }
          } catch (error) {
              console.error('Error fetching shift data:', error);
          }
      }
  };

  fetchShiftName();
}, [employee]); // This will run when employee data is fetched

useEffect(() => {
  const fetchHolidays = async () => {
    if (employee && employee.pn_CompanyID && employee.pn_BranchID) {
      try {
        // Fetching holiday data based on CompanyID and BranchID
        const holidayData = await postRequest(ServerConfig.url, REPORTS, {
          query: `
            SELECT pn_Holidayname, From_date, To_date, days
            FROM paym_Holiday 
            WHERE pn_CompanyID = '${employee.pn_CompanyID}' 
              AND pn_BranchID = '${employee.pn_BranchID}'
          `,
        });

        if (holidayData.data && holidayData.data.length > 0) {
          // Map holidays to FullCalendar event structure
          const holidayEvents = holidayData.data.map(holiday => ({
            title: holiday.pn_Holidayname,  // Holiday name as event title
            start: holiday.From_date,       // Start date
            end: holiday.To_date || holiday.From_date, // End date or same as start if no range
            color: "#006BB6",  // Blue color for holiday events
          }));

          setHolidays(holidayEvents); // Setting mapped holiday events for FullCalendar
        
          
        } else {
          console.error('No holidays found for the specified company and branch.');
        }
      } catch (error) {
        console.error('Error fetching holiday data:', error);
      }
    }
  };

  fetchHolidays();
}, [employee]); // Re-run when employee changes

useEffect(() => {
  const fetchLeaveData = async () => {
      if (employee && employee.pn_CompanyID && employee.pn_BranchID && employee.pn_EmployeeID) {
          try {
              // Fetching leave data based on CompanyID, BranchID, and EmployeeID
              const response = await postRequest(ServerConfig.url, REPORTS, {
                  query: `
                      SELECT pn_Leavename, from_date, to_date, approve
                      FROM leave_apply 
                      WHERE pn_CompanyID = '${employee.pn_CompanyID}' 
                        AND pn_BranchID = '${employee.pn_BranchID}'
                        AND pn_EmployeeID = '${employee.pn_EmployeeID}'  -- Compare EmployeeID
                  `,
              });

              if (response.data && response.data.length > 0) {
                  // Set the leave data fetched from the database
                  setLeaveData(response.data);
                  console.log(response)
              } else {
                  console.error('No leave applications found for the specified employee, company, and branch.');
              }
          } catch (error) {
              console.error('Error fetching leave data:', error);
          }
      }
  };

  fetchLeaveData();
}, [employee]); // Re-run when employee changes


const generateLeaveEvents = () => {
  return leaveData.map((leave) => {
    const fromDate = new Date(leave.from_date);
    const toDate = new Date(leave.to_date);
    const daysDiff = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1; // Calculate number of days

    // Create an array of events for the leave period
    const events = [];
    for (let i = 0; i < daysDiff; i++) {
      const eventDate = new Date(fromDate);
      eventDate.setDate(fromDate.getDate() + i);

      // Create an event object for each date
      events.push({
        title: leave.pn_Leavename, // Leave name
        start: eventDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
        color: leave.approve === 'Approved' ? 'green' : leave.approve === 'Rejected' ? 'red' : 'yellow', // Color based on approval status
        isWeekend: eventDate.getDay() === 0 || eventDate.getDay() === 6 // Check if it's a weekend
      });
    }
    return events;
  }).flat(); // Flatten the array of arrays into a single array
};

const leaveEvents = generateLeaveEvents();

  useEffect(() => {
    // Cleanup timer when component unmounts
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timerInterval]);
  
 
  const handleDateClick = (arg) => {
    const selected = new Date(arg.dateStr); // Get the clicked date from FullCalendar
    const today = new Date(); // Get today's date
    
    // Check if the selected date is today's date
    if (
      selected.getDate() === today.getDate() &&
      selected.getMonth() === today.getMonth() &&
      selected.getFullYear() === today.getFullYear()
    ) {
      setSelectedDate(selected); // Update selectedDate state
  
      // Handle logic for today's date
      if (!timerRunning && !hasCheckedIn) {
        startTimer();
        setHasCheckedIn(true); // Mark as checked in
      } else if (hasCheckedIn && !hasCheckedOut) {
        stopTimer(); // Allow check-out only if already checked in
      }
      setOpenDialog(true);
    } else {
      // If not today's date, reset
      stopTimer();
      intimeRef.current = null;
      setHasCheckedIn(false); // Reset check-in for other dates
      setHasCheckedOut(false);
      setSelectedDate(selected); // Update selectedDate state
    }
  };
  
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const startTimer = () => {
    if (!intimeRef.current) {
      intimeRef.current = new Date();
    }
    setTimerRunning(true);
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setTimerInterval(interval);

    timeoutRef.current = setTimeout(() => {
      if (timerRunning) {
        stopTimer();
      }
    }, 8 * 60 * 60 * 1000);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
    }
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }

    if (intimeRef.current) {
        // Save outtime when the timer is stopped
        const dt = new Date();
        const outtime = timerRunning ? dt : calculateOutTime(intimeRef.current);

        // Get the current day of the week
        const dayOfWeek = getDayOfWeek(new Date());

        // Check-in time (for late-in logic)
        const intimeHour = intimeRef.current.getHours();
        const intimeMinutes = intimeRef.current.getMinutes();

        // Late-in condition: If check-in time is after 9:05 AM
        let lateIn = null;
        if (intimeHour > 9 || (intimeHour === 9 && intimeMinutes > 5)) {
            lateIn = formatDateTime(intimeRef.current); // Mark the intime as late
        }

         // Break times (if check-in is before 12:00 PM)
         let breakOut = null;
         let breakIn = null;
         if (intimeHour < 12) {
             // Set break-out to 1:00 PM and break-in to 2:00 PM
             breakOut = "13:00";
             breakIn = "14:00";
         }
        // Check-out time
        const checkOutHour = outtime.getHours();
        const checkOutMinutes = outtime.getMinutes();

        let status = "P"; // Default status is Present
        let earlyOut = null; // To track early out time
        if (checkOutHour < 18) {
          earlyOut = formatDateTime(outtime); // Set earlyOut
          status = "P"; // Keep status as Present for early out
      } 
        let lateOut = null; // To track late out time
        let otHours = null; // Placeholder for overtime hours

        // Determine the status based on check-out time
        if (checkOutHour >= 12) {
            status = "O"; // Set status to 'O' (half day) if check-out is after 12 PM
        }

        // Determine earlyOut, lateOut, and otHours based on check-out time
        else if (checkOutHour === 6 && checkOutMinutes === 0) {
            // Check out at 6:00 AM should only set outtime
            // No earlyOut, lateOut, or otHours set
        } else if (checkOutHour === 6 && checkOutMinutes >= 30 && checkOutMinutes < 45) {
            // Check out at 6:30 AM should set both outtime and lateOut
            lateOut = formatDateTime(outtime); // Set lateOut
        } else if (checkOutHour === 6 && checkOutMinutes >= 45) {
            // Check out at or after 6:45 AM should set outtime, lateOut, and otHours
            lateOut = formatDateTime(outtime); // Set lateOut
            otHours = calculateOvertime(outtime); // Calculate OT hours here
        }

        // Construct the object to be sent
        var obj = {
            pnCompanyid: pncompanyid,
            pnBranchid: pnbranchid,
            empCode: sessionStorage.getItem("user"),
            empName: employeeName,
            shiftCode: shiftname,
            status: status,
            dates: new Date(),
            intime: formatDateTime(intimeRef.current), // Use stored intime
            outtime: formatDateTime(outtime),
            days: dayOfWeek,
            earlyOut: earlyOut, // Include earlyOut if applicable
            lateOut: lateOut, // Include lateOut if applicable
            otHours: otHours, // Include OT hours if applicable
            lateIn: lateIn, // Include lateIn if applicable
            breakOut: breakOut, // Include break-out if applicable
            breakIn: breakIn, // Include break-in if applicable
            // pnEmployeeId: pnEmployeeid
        };

        // Log the object to check values before sending
        console.log("Time Card Object:", obj);

        postRequest(ServerConfig.url, TIMECARD, obj)
            .then((e) => {
                // Handle success
                console.log("Post successful:", e);
            })
            .catch((e) => console.error("Post failed:", e));

        // Clear the intime reference after saving
        intimeRef.current = null;
    }
};

// Helper function to calculate overtime hours
const calculateOvertime = (outtime) => {
    // Assuming overtime starts after 6:45 AM
    const overtimeStart = new Date(outtime);
    overtimeStart.setHours(6, 45, 0, 0); // Set time to 6:45 AM
    
    const otMilliseconds = outtime - overtimeStart;
    const otHours = (otMilliseconds / (1000 * 60 * 60)).toFixed(2); // Convert milliseconds to hours and format to 2 decimal places
    
    return otHours > 0 ? otHours : null; // Return OT hours only if positive
};



  const getDayOfWeek = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()]; // Returns the string representation of the day
  };

  const calculateOutTime = (intime) => {
    const outDate = new Date(intime);
    outDate.setHours(outDate.getHours() + 8);
    return outDate;
  };

  const formatDateTime = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0") +
      "T" +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0") +
      "." +
      "000"
    );
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  

  const renderEventContent = (eventInfo) => {
    return (
      <Tooltip title={eventInfo.event.title} placement="top">
        <span 
          className="holiday-name" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontSize:'10px',
            overflow: 'hidden',    // Hide overflow
            textOverflow: 'ellipsis' // Show ellipsis if necessary
          }}
        >
          <span style={{ marginRight: '1px', fontSize: '1.5em', color: '#006BB6' }}>•</span> {/* Adjust font size as needed */}
          {eventInfo.event.title}
        </span>
      </Tooltip>
    );
};

  

  return (
    <Grid container>
       <style>
    {`
      .fc-daygrid-day-number {
        text-decoration: none !important;
        border-bottom: none !important;
      }
        

      .fc-toolbar-title {
        text-decoration: none !important;
        border-bottom: none !important;
       
      }
        
    `}
  </style>

  <Grid item xs={12}>
    <div style={{ backgroundColor: "#fff" }}>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Grid container item xs={12} sm={10} md={9} lg={8} xl={7} style={{ margin: "50px auto 0", textAlign: 'left' }}>
          <Grid item xs={12} md={9} sx={{ padding: "20px", width: '100%' }}>
            
          <FullCalendar
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  weekends={true}
  events={[...holidays, ...leaveEvents]} // Combine holiday and leave events
  eventContent={renderEventContent} // Use the enhanced render function
  displayEventTime={false}
  dateClick={handleDateClick}
  headerToolbar={{
    start: "today,prev,next",
    center: "",
    end: "title",
  }}
  contentHeight="auto"
  fixedWeekCount={false}
  dayCellContent={(arg) => {
    const dayOfWeek = arg.date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return (
        <div className="weekend-day" style={{ paddingLeft: "15px" }}>
          {arg.dayNumberText}
          <BeachAccessIcon
            sx={{
              color: "#ff6f61",
              fontSize: "20px",
              
              position: "absolute",
              right: "20px",
              bottom: "5px",
            }}
          />
        </div>
      );
    }
    return <div className="normal-day">{arg.dayNumberText}</div>;
  }}
/>

</Grid>
          <Grid item xs={6} md={3} sx={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h2" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
  {currentTime ? currentTime.toLocaleTimeString('en-GB') : "Timer stopped"}
</Typography>
<Grid item xs={6}>
            <StyledBox width={'200px'}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#e6edf5" }}>
                <Typography variant="h6" gutterBottom> 
                  Legends
                </Typography>
              </Box>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    
                   
                  <Grid item xs={12}>
      <LegendItem>
        <BeachAccessIcon sx={{ color: 'Coral', marginRight: '8px' }} />
        Weekend (Sat/Sun)
      </LegendItem>
    </Grid>
<Grid item xs={12}>
  <LegendItem>
    <CheckCircleIcon sx={{ color: "#8bc34a", marginRight: '16px' }} /> {/* Green for Off Day */}
    Off Day
  </LegendItem>
</Grid>
<Grid item xs={12}>
  <LegendItem>
    <CheckCircleIcon sx={{ color: "#006BB6", marginRight: '16px' }} /> {/* Blue for Holiday */}
    Holiday
  </LegendItem>
</Grid>
<Grid item xs={12}>
      <div onClick={handleClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <LegendItem>
          <CheckCircleIcon sx={{ color: "#00bcd4", marginRight: '16px' }} />
          Leave
        </LegendItem>
      </div>
    </Grid>

     
                  </Grid>
                </Grid>
              </Grid>
            </StyledBox>
          </Grid>
           
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{timerRunning ? "Timer Started!" : "Timer Stopped!"}</DialogTitle>
        <DialogContent>
          <p>
            You have selected today's date at {selectedTime ? selectedTime : ""}.<br />
            The timer is {timerRunning ? "running" : "stopped"}.
          </p>
        </DialogContent>
      
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </Grid>
</Grid>
  );
}