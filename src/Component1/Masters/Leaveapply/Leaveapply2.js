import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, IconButton, Box, Paper, TextField, FormControl } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { getRequest, postRequest } from "../../../serverconfiguration/requestcomp";
import { PAYMLEAVE, REPORTS, SAVE } from "../../../serverconfiguration/controllers";
import Sidenav from "../../Home Page3/Sidenav2";
import Navbar from "../../Home Page3/Navbar2";
const LeaveapplyHr2 = () => {
  const [type, setType] = useState("");
  const [paymLeave, setPaymLeave] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
    attachedFile: '',
    days: 0,
  });
  const[isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
  const [errors, setErrors] = useState({});
  const [showText, setShowText] = useState(false);
  const [employee, setemployee] = useState([])

  const calculateDays = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      const timeDiff = endDate - startDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff + 1; // Including both start and end dates
    }
    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };

      if (name === 'fromDate' || name === 'toDate') {
        updatedFormData.days = calculateDays(updatedFormData.fromDate, updatedFormData.toDate);
      }

      return updatedFormData;
    });
  };

  useEffect(() => {
    async function getData() {
      try {
        const paymleave = await getRequest(ServerConfig.url, PAYMLEAVE);
        setPaymLeave(paymleave.data);
        const employeedata = await postRequest(ServerConfig.url, REPORTS, {
          "query" :` select * from paym_Employee where EmployeeCode = '${isloggedin}'`
        })
        console.log("Employeedata", employeedata) 
        setemployee(employeedata.data)
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
    console.log("Employeedata", employee) 
  }, [isloggedin]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachedFile: e.target.files[0] });
  };

  const handleFileRemove = () => {
    setFormData({ ...formData, attachedFile: null });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.leaveType = formData.leaveType ? "" : "This field is required.";
    tempErrors.fromDate = formData.fromDate ? "" : "This field is required.";
    tempErrors.toDate = formData.toDate ? "" : "This field is required.";
    tempErrors.reason = formData.reason ? "" : "This field is required.";
    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };

  const uniqueTypes = Array.from(new Set(paymLeave.map((e) => e.type)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        let fileData = null;
        if (formData.attachedFile) {
          const reader = new FileReader();
          reader.onload = async () => {
            const arrayBuffer = reader.result;
            const binary = new Uint8Array(arrayBuffer);
  
            // Convert the Uint8Array to a hex string for SQL insertion
            const hexString = Array.from(binary, byte => byte.toString(16).padStart(2, '0')).join('');
  
            const response = await postRequest(ServerConfig.url, SAVE, {
              query: `INSERT INTO [dbo].[leave_apply] ([pn_CompanyID],[pn_BranchID],[pn_EmployeeID],[Emp_code],[Emp_name],[pn_LeaveID],[pn_Leavename],[pn_leavecode],[from_date],[from_status],[to_date],[status],[days],[reason],[submitted_date],[approve],[reminder],[priority],[comments],[record],[flag],[yearend],[attachfile]) VALUES (${employee[0].pn_CompanyID},${employee[0].pn_BranchID},${employee[0].pn_EmployeeID},'${employee[0].EmployeeCode}','${employee[0].Employee_Full_Name}',5,'${formData.leaveType}','SL','${formData.fromDate}','P','${formData.toDate}','P',${formData.days},'${formData.reason}','${new Date().toISOString()}','Pending','${new Date().toISOString()}','High','None','REC001','N',2024,CONVERT(varbinary(max), '0x${hexString}', 1))`
            });
  
            if (response.status === 200) {
              alert('Data saved successfully');
            } else {
              alert('Failed to save data');
            }
          };
          reader.readAsArrayBuffer(formData.attachedFile); // Convert file to ArrayBuffer
        } else {
          const response = await postRequest(ServerConfig.url, SAVE, {
            query: `INSERT INTO [dbo].[leave_apply] ([pn_CompanyID],[pn_BranchID],[pn_EmployeeID],[Emp_code],[Emp_name],[pn_LeaveID],[pn_Leavename],[pn_leavecode],[from_date],[from_status],[to_date],[status],[days],[reason],[submitted_date],[approve],[reminder],[priority],[comments],[record],[flag],[yearend],[attachfile]) VALUES (${employee[0].pn_CompanyID},${employee[0].pn_BranchID},${employee[0].pn_EmployeeID},'${employee[0].EmployeeCode}','${employee[0].Employee_Full_Name}',5,'${formData.leaveType}','SL','${formData.fromDate}','P','${formData.toDate}','P',${formData.days},'${formData.reason}','${new Date().toISOString()}','Pending','${new Date().toISOString()}','High','None','REC001','N',2024,NULL)`
          });
  
          if (response.status === 200) {
            alert('Data saved successfully');
          } else {
            alert('Failed to save data');
          }
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        alert('An error occurred while saving data');
      }
    } 
  };
  
  
  const toggleTextVisibility = () => {
    setShowText(!showText);
  };

  return (
    <Grid container>
    <Grid item xs={12}>
      <div style={{ backgroundColor: "#fff" }}>
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          {/* Main Content */}
          <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px" ,textAlign: 'left' }}>
           
    <Paper elevation={3} style={{ padding: '30px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', fontWeight: 'bold', color: '#3f51b5' }}>
        Leave Apply
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginRight: '10px', cursor: 'pointer' }}
          onClick={toggleTextVisibility}
        >
          {showText ? 'Hide Leave Policy' : 'Show Leave Policy'}
        </Typography>
        {showText && (
          <Typography variant="body2" color="textSecondary">
            Leave is earned by an employee and granted by the employer to take time off work. The employee is free to avail this leave in accordance with the company policy.
          </Typography>
        )}
        {showText ? (
          <ExpandLessIcon onClick={toggleTextVisibility} />
        ) : (
          <ExpandMoreIcon onClick={toggleTextVisibility} />
        )}
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Leave Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                style={{ height: "50px" }}
              >
                <option value="">Select Type</option>
                {uniqueTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </FormControl>
          </Grid>

          {/* From Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="From date"
              name="fromDate"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.fromDate}
              onChange={handleChange}
              error={Boolean(errors.fromDate)}
              helperText={errors.fromDate}
              required
            />
          </Grid>

          {/* To Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="To date"
              name="toDate"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.toDate}
              onChange={handleChange}
              error={Boolean(errors.toDate)}
              helperText={errors.toDate}
              required
            />
          </Grid>

          {/* Reason */}
          <Grid item xs={12}>
            <TextField
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              error={Boolean(errors.reason)}
              helperText={errors.reason}
              required
            />
          </Grid>

          {/* Attach File Icon and Text */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <input
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <AttachFileIcon color="primary" />
                <Typography variant="body2" color="primary" style={{ marginLeft: '5px' }}>
                  {formData.attachedFile ? formData.attachedFile.name : 'Attach File'}
                </Typography>
              </label>
              {formData.attachedFile && (
                <IconButton color="secondary" onClick={handleFileRemove} style={{ marginLeft: '10px' }}>
                  <DeleteIcon />
                </IconButton>
              )}
              <Typography variant="caption" color="textSecondary" style={{ marginTop: '5px', marginLeft: '10px' }}>
                File Types: pdf, doc, docx, jpg, jpeg, png
              </Typography>
            </Box>
          </Grid>

          {/* Submit and Cancel Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => console.log('Cancel button clicked')}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
    </Grid>
    </Box>
    </div>
    </Grid>
    </Grid>

  );
};

export default LeaveapplyHr2;