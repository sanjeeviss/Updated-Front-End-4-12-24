import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import React from "react";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { NATTENDANCE } from "../../serverconfiguration/controllers";
import { getRequest } from "../../serverconfiguration/requestcomp";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import "../../App.css"
import Sidenav from "../Home Page3/Sidenav2";
import Navbar from "../Home Page3/Navbar2";
class EmployeeDashBoard2 extends React.Component {
  constructor() {
    super();
    this.state = {
      attendance: [],
    };
  }
  componentDidMount() {
    /*axios.get("https://localhost:7266/api/Attendance/2").then((e) => {
      this.setState({ attendance: e.data });
    });*/
    getRequest(ServerConfig.url, NATTENDANCE).then((e) => {
      this.setState({ attendance: e.data });
    });
  }
  render() {
    {
      console.log(this.state.attendance);
    }
    const convertedEvents = this.state.attendance.map((record) => ({
      title: record.status,
      start: record.intime, // Assuming intime is the start time of the event
      end: record.outtime, // Assuming out_time is the end time of the event
    }));

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
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "50px 50px 50px 50px" ,textAlign: 'left' }}>
             
      <div>
        {/*this.state.attendance.map((e) => {
          return (
           <li>
              {e.pnEmployeeId} {e.dayStatus}
            </li>
          );
        })*/}
              <div style={{ width: "75%", height: "400px", margin: "0 auto" }}>
        <FullCalendar  
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          
          initialView="dayGridMonth"
          weekends={true}
          events={convertedEvents}
          displayEventTime={false}
        
          headerToolbar={{
            start: "today,prev,next",
            center: "title",
             end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        
        />
        {/* <Button variant="outlined">Move to layout</Button> */}
        </div>
      </div>
      </Grid>
      </Box>
      </div>
      </Grid>
      </Grid>
    );
  }
}

export default EmployeeDashBoard2;
