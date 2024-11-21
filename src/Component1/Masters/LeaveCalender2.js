import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, IconButton } from "@mui/material";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday } from "date-fns";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import WeekendIcon from '@mui/icons-material/Weekend'; // Import the weekend icon
// Import the necessary icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CircleIcon from '@mui/icons-material/Circle';
// Import your server configuration and request functions
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { TIMECARD } from "../../serverconfiguration/controllers";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

const LeaveCalendar2 = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("user"));
  const empCode = sessionStorage.getItem("user") || ''; // Get the logged-in user's code
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  useEffect(() => {
    async function getData() {
      const empCode = sessionStorage.getItem("user");
      const obj = { 
        empCode: empCode, // Ensure this is the logged-in user's code
        shiftCode: null,
        status: "",
        dates: new Date(),
        intime: new Date().toISOString(),
        outtime: "2024-04-23T18:00:46.867",
        pnEmployeeId: empCode,
      };

      try {
        const response = await getRequest(ServerConfig.url, TIMECARD, obj);
        setAttendanceData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (isLoggedIn) {
      getData();
    }
  }, [isLoggedIn]);

  const getAttendanceMap = (data) => {
    const map = {};
    const empCode = sessionStorage.getItem("user"); // Get the logged-in user's code
  
    data.forEach((entry) => {
      const { dates, status, empCode: entryEmpCode } = entry; // Access empCode
      if (entryEmpCode === empCode) { // Filter by employee code
        map[format(new Date(dates), 'yyyy-MM-dd')] = status;  
      }
    });
    return map;
  };

  const attendanceMap = getAttendanceMap(attendanceData);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  rows.push(
    <Grid container key="weekdays">
      {weekDays.map((day, index) => (
        <Grid item xs key={index}>
          <Box sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: "#e0dfdc", borderBottom: '1px solid #ccc', padding: '8px' }}>
            {day}
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, dateFormat);
      const attendance = attendanceMap[format(day, 'yyyy-MM-dd')] || '';
      const isTodayFlag = isToday(day);

      const getBackgroundColor = (status) => {
        switch (status) {
          case 'P':
            return "#ccffcc";
          case 'A':
            return "#ffcccc";
          case 'O':
            return "#ffff99"; // Off Day
          case 'H':
            return "#ccccff"; // Holiday
          case 'L':
            return "#ffcc99"; // Leave
            case 'W':
              return "#2f4f4f"; // Work From Home
            default:
              return "#ffffff";
          }
        };
              
        const getStatusColor = (status) => {
          switch (status) {
            case 'P':
              return "#2ecc71";
            case 'A':
              return "#e74c3c";
            case 'O':
              return "#f7dc6f"; // Off Day
            case 'H':
              return "#6495ed"; // Holiday
            case 'L':
              return "#ffa07a"; // Leave
              case 'W':
                return "#2f4f4f"; // Work From Home
            default:
              return "#333";
          }
        };

      days.push(
        <Grid item xs key={day}>
          <Paper
            sx={{
              height: "70px",
              border: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start", // Align day numbers to the top
              alignItems: "flex-start", // Align day numbers to the left
              padding: "8px",
              position: "relative",
              backgroundColor: getBackgroundColor(attendance),
              textAlign: 'center', // Center-align text within the cell
            }}
            square
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'inline-block',
                padding: '2px ',
                borderRadius: '50%',
                border: isTodayFlag ? '2px solid #007bff' : 'none', // Circle border if today
                backgroundColor: isTodayFlag ? '#fff' : 'transparent', // Background if today
              }}
            >
              {formattedDate}
            </Typography>
            {attendance && (
              <Typography variant="body1" sx={{ color: getStatusColor(attendance), textAlign: "center", paddingTop: "10px" ,paddingLeft:"24px"}}>
                {attendance}
              </Typography>
            )}
            {(day.getDay() === 0 || day.getDay() === 6) && (
              <WeekendIcon sx={{ position: 'absolute', top: '8px', right: '8px', fontSize: 18, color: '#202120' }} />
            )}
          </Paper>
        </Grid>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <Grid container key={`week-${day}`}>
        {days}
      </Grid>
    );

    days = [];
  }

  return (
    
    <Box sx={{ display: "flex", padding: "16px", justifyContent: "center", gap: "16px" }}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={handlePrevMonth}>
                <ArrowBackIosIcon />
                <Typography fontSize={'15px'}>Prev</Typography>
              </IconButton>
              <Typography variant="h6">
                {format(currentDate, "MMMM yyyy")}
              </Typography>
              <IconButton onClick={handleNextMonth}>
                <Typography fontSize={'15px'}>Next</Typography>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            <Box sx={{ width: "600px" }}>
              {rows}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <StyledBox width={'570px'}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#e6edf5" }}>
                <Typography variant="h6" gutterBottom> 
                  Legends
                </Typography>
              </Box>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <LegendItem>
                        <CheckCircleIcon sx={{ color: "#2ecc71", marginRight: '8px' }} />
                        Present
                      </LegendItem>
                    </Grid>
                    <Grid item xs={4}>
                      <LegendItem>
                        <CancelIcon sx={{ color: "#e74c3c", marginRight: '8px' }} />
                        Absent
                      </LegendItem>
                    </Grid>
                   
                    <Grid item xs={4}>
                      <LegendItem>
                        <WeekendIcon sx={{ color: "#e6edf5", marginRight: '8px' }} />
                        Weekend (Sat/Sun)
                      </LegendItem>
                    </Grid>
                    <Grid item xs={4}>
        <LegendItem>
          <CheckCircleIcon sx={{ color: "#f7dc6f", marginRight: '8px' }}/>
          Off Day
        </LegendItem>
      </Grid>
      <Grid item xs={4}>
        <LegendItem>
          <CheckCircleIcon sx={{ color: "#6495ed", marginRight: '8px' }} />
          Holiday
        </LegendItem>
      </Grid>
      <Grid item xs={4}>
        <LegendItem>
          <CheckCircleIcon sx={{ color: "#ffa07a", marginRight: '8px' }} />
          Leave
        </LegendItem>
      </Grid>
      <Grid item xs={4}>
  <LegendItem>
    <CheckCircleIcon sx={{ color: "#2f4f4f", marginRight: '8px' }} />
    Work From Home
  </LegendItem>
</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </StyledBox>
          </Grid>
          </Grid>
        
      </Box>
</Box>
  );
};

export default LeaveCalendar2;