import React from "react";
import { Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { TIMECARD } from "../../serverconfiguration/controllers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Empcalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const intimeRef = useRef(null); // Store intime for comparison
  const timeoutRef = useRef(null); // To store the timeout reference

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

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (isToday(date)) {
      if (!timerRunning) {
        startTimer();
      } else {
        stopTimer();
      }
      setOpenDialog(true);
    } else {
      stopTimer(); // Ensure timer is stopped for other dates
      intimeRef.current = null; // Reset intime for other dates
    }
  };

  const isToday = (date) => {
    const today = new Date();
    setSelectedTime(
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    );
    return (
      date.$D === today.getDate() &&
      date.$M === today.getMonth() &&
      date.$y === today.getFullYear()
    );
  };

  const startTimer = () => {
    if (!intimeRef.current) {
      // Set the start time if not set
      intimeRef.current = new Date();
    }
    setTimerRunning(true);
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    setTimerInterval(interval);

    // Set a timeout to stop the timer automatically after 8 hours
    timeoutRef.current = setTimeout(() => {
      if (timerRunning) {
        stopTimer();
      }
    }, 8 * 60 * 60 * 1000); // 8 hours in milliseconds
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

      var obj = {
        pnCompanyid: 1,
        pnBranchid: 1,
        empCode: sessionStorage.getItem("user"),
        shiftCode: null,
        status: "P",
        dates: new Date(),
        intime: formatDateTime(intimeRef.current),
        outtime: formatDateTime(outtime),
        pnEmployeeId: sessionStorage.getItem("user"),
      };

      postRequest(ServerConfig.url, TIMECARD, obj)
        .then((e) => {
          // Handle success
        })
        .catch((e) => console.log(e));

      // Clear the intime reference after saving
      intimeRef.current = null;
    }
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h2" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          {currentTime ? currentTime.toLocaleTimeString() : "Timer stopped"}
        </Typography>
      </div>
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: "100vw", // Full screen width
          height: "100vh", // Full screen height
          overflow: "hidden", // Hide overflow to remove scrollbar
        }}>
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            today={new Date()} // Highlight today's date
            todayColor="red" // Change today's date color to red
            sx={{
              "& .MuiPickersBasePicker-container": {
                width: "100%",
                maxWidth: "none", // Remove max width
              },
              "& .MuiPickersCalendarHeader-switchHeader": {
                width: "100%",
              },
              "& .MuiPickersCalendar-week": {
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)", // Equal width columns
                width: "100%",
              },
              "& .MuiPickersDay-root": {
                width: "calc(100%)", // Equal width cells
                height: "auto", // Adjust height as needed
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc", // Add border for visualization
              },
            }}
          />
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{timerRunning ? "Timer Started!" : "Timer Stopped!"}</DialogTitle>
        <DialogContent>
          <p>
            You have selected today's date at {selectedTime != null ? selectedTime : ""}.<br />
            The timer is {timerRunning ? "running" : "stopped"}.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}