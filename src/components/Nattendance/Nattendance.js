import React from "react";
import { Box, colors, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "../../../src/App.css";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { NATTENDANCE } from "../../serverconfiguration/controllers";
import { useEffect } from "react";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { postRequest } from "../../serverconfiguration/requestcomp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TIMECARD } from "../../serverconfiguration/controllers";
export default function BasicDateCalendar() {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (isToday(date)) {
      setOpenDialog(true);
    }

    var dt = new Date();

    var obj = {
      pnCompanyid: 1,
      pnBranchid: 1,
      empCode: sessionStorage.getItem("user"),
      shiftCode: null,
      status: "P",
      dates: new Date(),
      intime:
        dt.getFullYear() +
        "-" +
        (dt.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        dt.getDate().toString().padStart(2, "0") +
        "T" +
        dt.getHours().toString().padStart(2, "0") +
        ":" +
        dt.getMinutes().toString().padStart(2, "0") +
        ":" +
        dt.getSeconds().toString().padStart(2, "0") +
        "." +
        "000", //dt.getFullYear()+"-"+dt.getMonth()+"-"+dt.getDay()+"T"+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()+"."+"000",
      outtime: "2024-04-23T18:00:46.867",
      pnEmployeeId: sessionStorage.getItem("user"),
    };
    console.log(obj);
    console.log(
      dt.getFullYear() +
        "-" +
        (dt.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        dt.getDate().toString().padStart(2, "0") +
        "T" +
        dt.getHours().toString().padStart(2, "0") +
        ":" +
        dt.getMinutes() +
        ":" +
        dt.getSeconds() +
        "." +
        "000"
    );
    postRequest(ServerConfig.url, TIMECARD, obj)
      .then((e) => {
        // console.log(e.data)
      })
      .catch((e) => console.log(e));
  };

  const isToday = (date) => {
    const today = new Date();
    console.log(date);
    console.log();
    var dt = new Date();
    setSelectedTime(
      dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
    );
    return (
      date.$D == today.getDate() &&
      date.$M === today.getMonth() &&
      date.$y === today.getFullYear()
    );
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        <DialogTitle>{"Today is Selected!"}</DialogTitle>
        <DialogContent>
          <p>
            You have selected today's date at
            {selectedTime != null ? selectedTime : ""}
          </p>
          <p></p>
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

// const [value, setValue] = useState(dayjs("2022-04-17"));
// return (
//   <div style={{ textAlign: "center" }}>
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={["DateCalendar", "DateCalendar"]}>
//         <DemoItem label="Uncontrolled calendar">
//           <DateCalendar defaultValue={dayjs("2022-04-17")} />
//         </DemoItem>
//         <DemoItem label="Controlled calendar">
//           <DateCalendar
//             value={value}
//             onChange={(newValue) => setValue(newValue)}
//           />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
{
  /* <Box style={{ padding: "20px" }}>
        <Typography variant="h5">HRMS CALENDAR</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
  </Box>*/
}
// </div>
// );
