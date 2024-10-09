import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Box,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";

const data = [
  {
    name: "Priya",
    policy: "Annual Leave",
    status: "Pending",
    request: "Nov 22 - Nov 23",
    reason: "I need this leave",
    applyDate: "Nov 01, 2023",
  },
  {
    name: "Khaviya",
    policy: "Sick Leave",
    status: "Pending",
    request: "Oct 12 - Oct 15",
    reason: "I got Sick",
    applyDate: "Oct 10, 2023",
  },
  {
    name: "Vishnu",
    policy: "Client Visit",
    status: "Pending",
    request: "Nov 24 - Nov 29",
    reason: "I have client Meeting",
    applyDate: "Nov 15, 2023",
  },
  {
    name: "Sanjeevi",
    policy: "Sick Leave",
    status: "Pending",
    request: "Oct 1 - Oct 2",
    reason: "I've got Fever",
    applyDate: "Sep 29, 2023",
  },
  {
    name: "Lalli",
    policy: "Casual Leave",
    status: "Pending",
    request: "Oct 19 - Oct 20",
    reason: "I need this leave",
    applyDate: "Oct 05, 2023",
  },
];

const statusColors = {
  Approved: "green",
  Pending: "orange",
  Rejected: "red",
};

function LeaveRequestManager() {
  const [checkedRows, setCheckedRows] = useState({});

  const handleCheckboxChange = (event, index) => {
    setCheckedRows((prev) => ({
      ...prev,
      [index]: event.target.checked,
    }));
  };

  const anyCheckboxChecked = Object.values(checkedRows).some(Boolean);

  return (
    <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px"  }}>
    <Box p={2}>
      <Box display="flex" justifyContent="stretch" alignItems="center" mb={2}>
        <Button variant="contained" color="primary">
          New Request
        </Button>
      </Box>
      <Grid
        display="flex"
        justifyContent="stretch"
        style={{
          background: "blue",
          height: "40px",
          width: "200px",
          textAlign: "center",
          color: "white",
          fontSize: "15px",
          lineHeight: "2.5",
        }}>
        <IconButton style={{ color: "whitesmoke" }}>
          <FilterList />
        </IconButton>
        <Typography textAlign="center" sx={{ paddingTop: "10px" }}>
          Filter Leave Request
        </Typography>
      </Grid>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ textAlign: "left" }}>Employee Name</TableCell>
              <TableCell>Policy</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Request</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Apply Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={!!checkedRows[index]}
                    onChange={(event) => handleCheckboxChange(event, index)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.policy}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="left">
                    <span
                      style={{
                        backgroundColor: statusColors[row.status],
                        color: "white",
                        width: "80px",
                        height: "20px",
                        textAlign: "center",
                        borderRadius: "10px",
                      }}>
                      {row.status}
                    </span>
                  </Box>
                </TableCell>
                <TableCell>{row.request}</TableCell>
                <TableCell>{row.reason}</TableCell>
                <TableCell>{row.applyDate}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    disabled={anyCheckboxChecked}
                    sx={{ marginRight: 1 }}>
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    disabled={anyCheckboxChecked}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid sx={{ textAlign: "right", padding: "20px" }}>
        <Button variant="contained" color="success" enable={anyCheckboxChecked}>
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          style={{ marginLeft: "10px" }}
          enable={anyCheckboxChecked}>
          Reject
        </Button>
      </Grid>
      
    </Box>
    </Grid>
    </Box>
    </div>
    </Grid>


  );
}

export default LeaveRequestManager;