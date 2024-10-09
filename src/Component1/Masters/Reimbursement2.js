import React, { useState } from 'react';
import {
  Box, Button, TextField, Grid, MenuItem, Typography, Paper, FormControl, InputLabel, Select, IconButton, Divider,
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { HelpOutline, CheckCircle } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { REPORTS } from '../../serverconfiguration/controllers';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import axios from 'axios';
import { postRequest } from '../../serverconfiguration/requestcomp';

const ReimbursementForm2 = () => {
  const [rows, setRows] = useState([{
    category: '',
    amount: '',
    startdate: null,
    enddate: null,
    description: '',
    attachments: null
  }]);
  const [payableMonth, setPayableMonth] = useState('');
  const [job, setJob] = useState('');
  const [employee, setEmployee] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState({ payableMonth: false, job: false, employee: false, rows: [] });

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleFileChange = (index, event) => {
    const newRows = [...rows];
    newRows[index].attachments = event.target.files[0];
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { category: '', amount: '', startdate: null, enddate: null, description: '', attachments: null }]);
    setErrors(prev => ({ ...prev, rows: [...prev.rows, {}] }));
  };

  const deleteRow = (index) => {
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    const newErrors = errors.rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
    setErrors(prev => ({ ...prev, rows: newErrors }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = { payableMonth: false, job: false, employee: false, rows: [] };

    // Validate Payable Month
    if (!payableMonth) {
      newErrors.payableMonth = true;
      formIsValid = false;
    }

    // Validate Job and Employee
    if (!job) {
        newErrors.job = true;
        formIsValid = false;
      }
    
      // Validate Employee
      if (!employee) {
        newErrors.employee = true;
        formIsValid = false;
      }
    // Validate Rows
    const rowErrors = rows.map((row) => {
        let rowError = {};
        if (!row.category) rowError.category = true;
        if (!row.amount) rowError.amount = true;
        if (!row.startdate) rowError.startdate = true;
        if (!row.enddate) rowError.enddate = true;
        if (!row.description) rowError.description = true;
        return rowError;
      });
    
      rowErrors.forEach(rowError => {
        if (Object.keys(rowError).length > 0) formIsValid = false;
      });
      newErrors.rows = rowErrors;
      setErrors(newErrors);
      return formIsValid;
    };
  
 

    const handleSubmit = async () => {
      if (validateForm()) {
        try {
          const formData = new FormData();
    
          formData.append('PayableMonth', payableMonth);
          formData.append('Job', job);
          formData.append('Employee', employee);
    
          rows.forEach((row, index) => {
            formData.append`(Rows[${index}].category, row.category)`;
            formData.append`(Rows[${index}].amount, row.amount)`;
            formData.append`(Rows[${index}].startdate, row.startdate)`;
            formData.append`(Rows[${index}].enddate, row.enddate)`;
            formData.append`(Rows[${index}].description, row.description)`;
            if (row.attachments) {
              formData.append`(Rows[${index}].attachments, row.attachments)`;
            }
          });
    
          console.log('FormData:', formData); // Debugging
    
          const response = await axios.post('${ServerConfig.url}${REPORTS}', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.status === 200) {
            alert('Data saved successfully');
            // Handle success
          } else {
            alert('Failed to save data');
          }
        } catch (error) {
          console.error('Error saving data:', error);
          alert('Failed to save data');
        }
      } else {
        console.log('Form validation failed.');
      }
    };
    
      

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box p={3}>
          <Paper elevation={3}>
            <Box p={2} position="relative">
              {/* Help Button */}
              <Box position="absolute" top={16} right={16}>
                <Button startIcon={<HelpOutline />} color="error">Help</Button>
              </Box>

              <Typography variant="h6">EMPLOYEE REIMBURSEMENT</Typography>
              <Divider sx={{ my: 1, width: '100%' }} />

              <Typography
                variant="body2"
                sx={{
                  paddingTop: '20px',
                  fontSize: '1.25rem',
                  color: 'blue', // Text color
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  sx={{
                    color: 'blue', // Icon color
                    '&:hover': {
                      color: 'blue', // Darker green on hover
                    },
                  }}
                >
                  <CreateIcon />
                </IconButton>
                Add Reimbursement
              </Typography>

              <Divider sx={{ my: 1, width: '100%' }} />


              {/* Payable Month */}
             {/* Payable Month */}
<Grid container spacing={2} mb={2}>
  <Grid item xs={12}>
    <Grid container spacing={1} alignItems="center" mt={2}>
      <Grid item xs={12} md={3}>
        <Typography variant="h6" gutterBottom style={{ paddingLeft: '30px' }}>
          Select Payable Month:
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Payable Month"
          type="date"
          variant="outlined"
          fullWidth
          value={payableMonth}
          onChange={(e) => setPayableMonth(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginLeft: 1, width: '200px' }}
          error={errors.payableMonth}
          helperText={errors.payableMonth && 'Payable month is required.'}
        />
      </Grid>
    </Grid>
  </Grid>
</Grid>


              {/* Table with Header and Rows */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Attachments</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <FormControl fullWidth variant="outlined" error={errors.rows[index]?.category}>
                            <InputLabel>Select Category</InputLabel>
                            <Select
                              value={row.category}
                              onChange={(e) => handleRowChange(index, 'category', e.target.value)}
                              label="Select Category"
                            >
                              <MenuItem value="category1">Category 1</MenuItem>
                              <MenuItem value="category2">Category 2</MenuItem>
                            </Select>
                            {errors.rows[index]?.category && <Typography color="error">Category is required.</Typography>}
                          </FormControl>
                        </TableCell>

                        {/* Amount */}
                        <TableCell>
                          <TextField
                            label="Amount"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={row.amount}
                            onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                            error={errors.rows[index]?.amount}
                            helperText={errors.rows[index]?.amount && 'Amount is required.'}
                          />
                        </TableCell>

                        {/* Start Date */}
                        <TableCell>
                          <TextField
                            label="Start Date"
                            variant="outlined"
                            fullWidth
                            type="date"
                            value={row.startdate}
                            onChange={(e) => handleRowChange(index, 'startdate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            error={errors.rows[index]?.startdate}
                            helperText={errors.rows[index]?.startdate && 'Start Date is required.'}
                          />
                        </TableCell>

                        {/* End Date */}
                        <TableCell>
                          <TextField
                            label="End Date"
                            variant="outlined"
                            fullWidth
                            type="date"
                            value={row.enddate}
                            onChange={(e) => handleRowChange(index, 'enddate', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            error={errors.rows[index]?.enddate}
                            helperText={errors.rows[index]?.enddate && 'End Date is required.'}
                          />
                        </TableCell>

                        {/* Description */}
                        <TableCell>
                          <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            value={row.description}
                            onChange={(e) => handleRowChange(index, 'description', e.target.value)}
                            error={errors.rows[index]?.description}
                            helperText={errors.rows[index]?.description && 'Description is required.'}
                          />
                        </TableCell>

                        {/* Attachments */}
                        <TableCell>
                          <Button variant="outlined" component="label" fullWidth style={{ width: '140px' }}>
                            Choose Files
                            <input type="file" hidden onChange={(e) => handleFileChange(index, e)} />
                          </Button>
                          {row.attachments && <Typography>{row.attachments.name}</Typography>}
                        </TableCell>

                        <TableCell>
                        <Button variant="contained" color="primary" onClick={addRow} style={{width:'100px'}}>
                          Add Row
                        </Button>
                      </TableCell>
                        {/* Action (Delete) */}
                        <TableCell>
                          {index > 0 && (
                            <IconButton color="secondary" onClick={() => deleteRow(index)}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* Add Row Button in Action column */}
                    {/* <TableRow>
                      <TableCell colSpan={5}></TableCell>
                   
                    </TableRow> */}
                  </TableBody>
                </Table>
              </TableContainer>

              <Grid container spacing={2} mt={2}>
                {/* Select Job */}
                <Grid item xs={12}>
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} md={3}>
      <Typography variant="h6" gutterBottom style={{ paddingLeft: '120px' }}>Select Job :</Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <FormControl fullWidth variant="outlined" error={errors.job}>
        <InputLabel>Select Job</InputLabel>
        <Select
          value={job}
          onChange={(e) => setJob(e.target.value)}
          label="Select Job"
        >
          <MenuItem value="job1">Job 1</MenuItem>
          <MenuItem value="job2">Job 2</MenuItem>
        </Select>
        {errors.job && <Typography color="error">Job is required.</Typography>}
      </FormControl>
    </Grid>
  </Grid>
</Grid>

{/* Select Employee */}
<Grid item xs={12}>
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={12} md={3}>
      <Typography variant="h6" gutterBottom style={{ paddingLeft: '70px' }}>Select Employee :</Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <FormControl fullWidth variant="outlined" error={errors.employee}>
        <InputLabel>Select Employee</InputLabel>
        <Select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          label="Select Employee"
        >
          <MenuItem value="employee1">Employee 1</MenuItem>
          <MenuItem value="employee2">Employee 2</MenuItem>
        </Select>
        {errors.employee && <Typography color="error">Employee is required.</Typography>}
      </FormControl>
    </Grid>
  </Grid>
</Grid>
              </Grid>

              {/* Save and Cancel Buttons */}
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="success" onClick={handleSubmit} startIcon={<CheckCircle />}>
                  Save Reimbursement
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </LocalizationProvider>
    </Container>
  );
};

export default ReimbursementForm2;