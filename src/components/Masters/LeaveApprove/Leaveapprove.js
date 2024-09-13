import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, Box, IconButton, Grid, Typography,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import Navbar from "../../Home Page/Navbar";
import Sidenav from "../../Home Page/Sidenav";
import { REPORTS } from "../../../serverconfiguration/controllers";
import { postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const statusColors = {
  A: "green",
  P: "orange",
  R: "red",
};

function  LeaveRequestHr() {
  const [checkedRows, setCheckedRows] = useState({});
  const [leaveApply, setLeaveApply] = useState([]);
  const [open, setOpen] = useState(false); // State for modal
  const [imageSrc, setImageSrc] = useState(""); // State for image source

  const getData = async () => {
    try {
      const response = await postRequest(ServerConfig.url, REPORTS, {
        query: 'SELECT * FROM Leave_Apply',
      });
  
      console.log(response);
  
      const filteredData = response.data.filter(row => row.status === 'P');
  
      // Convert `varbinary` data to a viewable format (e.g., base64)
      const processedData = filteredData.map(row => ({
        ...row,
        attachfile: row.attachfile ? `data:${row.file_type};base64,${row.attachfile}` : null, // Use correct MIME type
      }));
  
      setLeaveApply(processedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCheckboxChange = (event, index) => {
    setCheckedRows((prev) => ({
      ...prev,
      [index]: event.target.checked,
    }));
  };

  const anyCheckboxChecked = Object.values(checkedRows).filter(Boolean).length > 1;
  const checkedRowsData = leaveApply.filter((_, index) => checkedRows[index]);

  const updateLeaveRequestStatus = async (employeeID, status) => {
    try {
      const response = await postRequest(ServerConfig.url, REPORTS, {
        query: `UPDATE leave_apply SET status = '${status}', approve = 'Hr' WHERE pn_EmployeeID = ${employeeID}`,
      });
      console.log('Update Response:', response);
      await getData();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleApproveClick = (row) => {
    updateLeaveRequestStatus(row.pn_EmployeeID, 'A');
  };

  const handleRejectClick = (row) => {
    updateLeaveRequestStatus(row.pn_EmployeeID, 'R');
  };

  const handleApproveSelected = () => {
    checkedRowsData.forEach(row => {
      updateLeaveRequestStatus(row.pn_EmployeeID, 'A');
    });
  };

  const handleRejectSelected = () => {
    checkedRowsData.forEach(row => {
      updateLeaveRequestStatus(row.pn_EmployeeID, 'R');
    });
  };

  const handleImageClick = (src) => {
    setImageSrc(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageSrc("");
  };

  return (
    <Grid item xs={12}>
      <div style={{ backgroundColor: "#fff" }}>
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Grid
            item
            xs={12}
            sm={10}
            md={9}
            lg={8}
            xl={7}
            style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px" }}
          >
            <Box p={2}>
              
             
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell style={{ textAlign: "left" }}>Employee Name</TableCell>
        <TableCell>Leave Name</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Request</TableCell>
        <TableCell>Reason</TableCell>
        <TableCell>Apply Date</TableCell>
        <TableCell>Attachment</TableCell> {/* New Column */}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {leaveApply.map((row, index) => (
        <TableRow key={index}>
          <TableCell>
            <Checkbox
              checked={!!checkedRows[index]}
              onChange={(event) => handleCheckboxChange(event, index)}
            />
          </TableCell>
          <TableCell>{row.Emp_name}</TableCell>
          <TableCell>{row.pn_Leavename}</TableCell>
          <TableCell>
            <Box display="flex" justifyContent="left">
              <span
                style={{
                  backgroundColor: statusColors[row.status] || "gray",
                  color: "white",
                  width: "80px",
                  height: "20px",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                {row.status === 'P' ? 'Pending' : row.status}
              </span>
            </Box>
          </TableCell>
          <TableCell>{`${new Date(row.from_date).toLocaleDateString()} - ${new Date(row.to_date).toLocaleDateString()}`}</TableCell>
          <TableCell>{row.reason}</TableCell>
          <TableCell>{new Date(row.submitted_date).toLocaleDateString()}</TableCell>
          <TableCell>
  {row.attachfile ? (
    <IconButton onClick={() => handleImageClick(row.attachfile)}>
      <img src={row.attachfile} alt="Attachment" style={{ width: 50, height: 50 }} />
    </IconButton>
  ) : (
    "No Attachment"
  )}
</TableCell>


          <TableCell>
            <IconButton
              color="success"
              size="small"
              disabled={anyCheckboxChecked}
              onClick={() => handleApproveClick(row)}
              sx={{ marginRight: 1 }}
            >
              <DoneIcon/>
            </IconButton>
            <IconButton
              color="error"
              size="small"
              disabled={anyCheckboxChecked}
              onClick={() => handleRejectClick(row)} 
            >
              <CloseIcon/>
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

              <Grid sx={{ textAlign: "right", padding: "20px" }}>
                <Button variant="contained" color="success" size="small" disabled={!anyCheckboxChecked} onClick={handleApproveSelected}>
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  style={{ marginLeft: "10px" }}
                  size="small"
                  disabled={!anyCheckboxChecked}
                  onClick={handleRejectSelected} 
                >
                  Reject
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Box>

       {/* Modal for Viewing Attachments */}
<Modal
  open={open}
  onClose={handleClose}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{ timeout: 500 }}
>
  <Fade in={open}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        textAlign: 'center'
      }}
    >
      <img src={imageSrc} alt="Attachment" style={{ width: '100%', height: 'auto' }} />
      <IconButton
        onClick={handleClose}
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  </Fade>
</Modal>
      </div>
    </Grid>
  );
}

export default LeaveRequestHr;

