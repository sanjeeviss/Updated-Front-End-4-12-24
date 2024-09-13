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

class EmployeeDashBoard extends React.Component {
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
      <div>
        {/*this.state.attendance.map((e) => {
          return (
           <li>
              {e.pnEmployeeId} {e.dayStatus}
            </li>
          );
        })*/}
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
        <Button variant="outlined">Move to layout</Button>
      </div>
    );
  }
}

export default EmployeeDashBoard;
