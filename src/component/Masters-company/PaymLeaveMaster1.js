import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Checkbox,
  ListItemText,
  Menu,
  Container,
  Box,
  CardContent,
  IconButton,
  FormHelperText,
  ListItem,
  ListItemIcon
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS, SAVE } from '../../serverconfiguration/controllers';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Navbar from "../Home Page-comapny/Navbar1";
import Sidenav from "../Home Page-comapny/Sidenav1";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete Icon

export default function PaymLeaveMaster1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [isloggedin, setIsloggedin] = useState(sessionStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranchIds, setSelectedBranchIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState(null);
  const [leaveData, setLeaveData] = useState([
    {
      vLeaveName: '',
      pnLeaveCode: '',
      pnCount: '',
      status: '',
      annualLeave: '',
      maxDays: '',
      el: '',
      type: ''
    }
  ]);

  useEffect(() => {
    async function getData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Company WHERE company_user_id = '${isloggedin}'`,
        });
        console.log('Company Data:', companyData.data); // Log the company data
        setCompany(companyData.data);
        if (companyData.data.length > 0) {
          setPnCompanyId(companyData.data[0].pn_CompanyID);
        }
      } catch (error) {
        setError('Error fetching company data');
      }
    }
    getData();
  }, [isloggedin]);

  useEffect(() => {
    async function getData() {
      try {
        if (pnCompanyId) {
          const branchData = await postRequest(ServerConfig.url, REPORTS, {
            query: `SELECT * FROM paym_branch WHERE pn_CompanyID = '${pnCompanyId}'`,
          });
          setBranch(branchData.data);
        }
      } catch (error) {
        setError('Error fetching branch data');
      }
    }
    getData();
  }, [pnCompanyId]);

  useEffect(() => {
    setSelectAll(selectedBranchIds.length === branch.length);
  }, [selectedBranchIds, branch]);

  const validationSchema = Yup.object().shape({
    pnCompanyId: Yup.string().required('Please select a Company ID'),
    pnBranchId: Yup.array(),
    leaveData: Yup.array().of(
      Yup.object().shape({
        vLeaveName: Yup.string()
          .matches(/^[A-Za-z\s]{1,40}$/, 'Leave Name must be alphabetic and up to 40 characters')
          .required('Leave Name is required'),
        pnLeaveCode: Yup.string()
          .matches(/^[A-Za-z0-9]{1,10}$/, 'Leave Code must be alphanumeric and up to 10 characters')
          .required('Leave Code is required'),
        pnCount: Yup.number()
          .positive('Count must be a positive number')
          .integer('Count must be an integer')
          .required('Count is required'),
        status: Yup.string()
          .matches(/^[A-Za-z]{1,10}$/, 'Status must be a  alphabetic character')
          .required('Status is required'),
        annualLeave: Yup.string()
          .matches(/^[A-Za-z\s]{1,2}$/, 'Annual Leave must be alphabetic and up to 30 characters')
          .required('Annual Leave is required'),
        maxDays: Yup.number()
          .positive('Max Days must be a positive number')
          .integer('Max Days must be an integer')
          .required('Max Days is required'),
        el: Yup.string()
          .matches(/^[A-Za-z0-9]{1,6}$/, 'EL must be alphanumeric and up to 6 characters')
          .required('EL is required'),
        type: Yup.string()
          .matches(/^[A-Za-z0-9]{1,10}$/, 'Type must be alphanumeric and up to 10 characters')
          .required('Type is required')
        })
      ),
    });
  
    const handleSubmit = async (values, { resetForm }) => {
      try {
        const queries = [];
  
        // Check if branches are selected
        if (selectedBranchIds.length > 0) {
          // Create a query for each selected branch
          selectedBranchIds.forEach((branchId) => {
            values.leaveData.forEach((leave) => {
              const query = `
                INSERT INTO [dbo].[paym_leave] 
                ([pn_CompanyID], [pn_BranchID], [v_leaveName], [pn_leaveCode], [pn_Count], [status], [annual_leave], [max_days], [EL], [Type]) 
                VALUES 
                ('${values.pnCompanyId}', '${branchId}', '${leave.vLeaveName}', '${leave.pnLeaveCode}', ${leave.pnCount}, 
                CASE 
                  WHEN '${leave.status}' = 'Active' THEN 'A' 
                  ELSE '${leave.status}' 
                END, '${leave.annualLeave}', ${leave.maxDays}, '${leave.el}', '${leave.type}')
              `;
              console.log("Generated Query for Branch:", query);
              queries.push(postRequest(ServerConfig.url, SAVE, { query }));
            });
          });
        } 
        // If no branches are selected and the branch list is empty
        else if (branch.length === 0) {
          values.leaveData.forEach((leave) => {
            const query = `
              INSERT INTO [dbo].[paym_leave] 
              ([pn_CompanyID], [pn_BranchID], [v_leaveName], [pn_leaveCode], [pn_Count], [status], [annual_leave], [max_days], [EL], [Type]) 
              VALUES 
              ('${values.pnCompanyId}', NULL, '${leave.vLeaveName}', '${leave.pnLeaveCode}', ${leave.pnCount}, 
              CASE 
                WHEN '${leave.status}' = 'Active' THEN 'A' 
                ELSE '${leave.status}' 
              END, '${leave.annualLeave}', ${leave.maxDays}, '${leave.el}', '${leave.type}')
            `;
            console.log("Generated Query with NULL BranchID:", query);
            queries.push(postRequest(ServerConfig.url, SAVE, { query }));
          });
        } else {
          setError('Please select at least one branch or ensure branches exist for the company.');
          return;
        }
  
        // Execute all queries
        const responses = await Promise.all(queries);
  
        // Log responses for each query
        responses.forEach((response, index) => {
          console.log`(Response for query ${index + 1}:, response)`;
          if (response.status !== 200) {
            throw new Error`(Failed to save for query ${index + 1}: ${response.statusText})`;
          }
        });
  
        alert('Data saved successfully');
        resetForm();
        navigate('/EarnDeductCompanyMasters');
  
      } catch (error) {
        console.error("Error saving data:", error);
        setError('Error saving data: ' + error.message);
      }
    };
  
    const handleCancel = (resetForm) => {
      resetForm();
    };
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const handleBranchChange = (branchId) => {
      setSelectedBranchIds((prev) =>
        prev.includes(branchId)
          ? prev.filter((id) => id !== branchId)
          : [...prev, branchId]
      );
    };
  
    const handleSelectAll = () => {
      if (selectAll) {
        setSelectedBranchIds([]);
      } else {
        setSelectedBranchIds(branch.map(b => b.pn_BranchID));
      }
    };
  
    const handleAddLeave = (leaveData, setFieldValue) => {
      const updatedLeaveData = [
        ...leaveData, 
        { 
          vLeaveName: '', 
          pnLeaveCode: '', 
          pnCount: '', 
          status: 'Active', 
          annualLeave: '', 
          maxDays: '', 
          el: '', 
          type: '' 
        } 
      ];
      setFieldValue('leaveData', updatedLeaveData);
    };
  
    const handleRemoveLeave = (index, values, setFieldValue) => {
      const updatedLeaveData = [...values.leaveData];
      updatedLeaveData.splice(index, 1);
      setFieldValue('leaveData', updatedLeaveData);
    };
  
    return (
      <Grid container>
        <Grid item xs={12}>
          <div style={{ backgroundColor: "#fff" }}>
            <Navbar />
            <Box height={30} />
            <Box sx={{ display: "flex" }}>
              <Sidenav />
              <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "            auto" }}>
              <Container maxWidth="md" sx={{ p: 2 }}>
                <Grid style={{ padding: '80px 5px 0 5px' }}>
                  <Card style={{ maxWidth: 600, margin: '0 auto' }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom color="textPrimary" align="center">
                        Leave 
                      </Typography>
                      {error && (
                        <Typography variant="body1" color="error.main" align="center">
                          {error}
                        </Typography>
                      )}
                      <Formik
                        initialValues={{
                          pnCompanyId: pnCompanyId || '',
                          pnBranchId: selectedBranchIds,
                          leaveData: leaveData.length > 0
                            ? leaveData.map((leave) => ({
                                vLeaveName: leave.vLeaveName || '',
                                pnLeaveCode: leave.pnLeaveCode || '',
                                pnCount: leave.pnCount || '',
                                status: leave.status || 'Active',
                                annualLeave: leave.annualLeave || '',
                                maxDays: leave.maxDays || '',
                                el: leave.el || '',
                                type: leave.type || ''
                              }))
                            : [{ 
                                vLeaveName: '', 
                                pnLeaveCode: '', 
                                pnCount: '', 
                                status: 'Active', 
                                annualLeave: '', 
                                maxDays: '', 
                                el: '', 
                                type: '' 
                              }]
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize // Add this line to reinitialize Formik values

                      >
                        {({ values, handleChange, handleBlur, errors, touched, resetForm, setFieldValue }) => (
                          <Form>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                  <TextField
                                    value={company.find((c) => c.pn_CompanyID === values.pnCompanyId)?.CompanyName || ''}
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={(touched.pnBranchId && Boolean(errors.pnBranchId))}>
                                  <div>
                                    <TextField
                                      value={branch.length > 0 ? branch.filter(b => selectedBranchIds.includes(b.pn_BranchID)).map(b => b.BranchName).join(', ') : 'No branches'}
                                      variant="outlined"
                                      fullWidth
                                      onClick={handleMenuClick}
                                      InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                          <IconButton size="small" aria-label="select branches">
                                            <ArrowDropDownIcon />
                                          </IconButton>
                                        ),
                                      }}
                                      label="Branch List"
                                    />
                                    {Boolean(errors.pnBranchId) && (
                                      <FormHelperText>{errors.pnBranchId}</FormHelperText>
                                    )}
                                  </div>
                                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                    <ListItem 
                                      button 
                                      onClick={handleSelectAll} 
                                      sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontWeight: 'bold' }}
                                    >
                                      <ListItemText primary="Select All" />
                                      <Checkbox 
                                        checked={selectAll} 
                                        sx={{ ml: 'auto' }} // Move checkbox to the right
                                      />
                                    </ListItem>
                                    {branch.map((b) => (
                                      <MenuItem 
                                        key={b.pn_BranchID} 
                                        onClick={() => handleBranchChange(b.pn_BranchID)} 
                                        sx={{ display: 'flex', justifyContent: 'space-between', width: '280px', alignItems: 'center' }}
                                      >
                                        <ListItemText primary={b.BranchName} />
                                        <Checkbox 
                                          checked={selectedBranchIds.includes(b.pn_BranchID)} 
                                          sx={{ ml: 'auto' }} // Move checkbox to the right
                                        />
                                      </MenuItem>
                                    ))}
                                  </Menu>
                                </FormControl>
                              </Grid>
                              {values.leaveData.map((leave, index) => (
                                <Grid item xs={12} key={index}>
                                  <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4}>
                                      <FormControl fullWidth error={touched.leaveData && touched.leaveData[index] && Boolean(errors.leaveData && errors.leaveData[index] && errors.leaveData[index].vLeaveName)}>
                                        <TextField
                                          name={`leaveData.${index}.vLeaveName`}
                                          label={<span>Leave Name <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                          variant="outlined"
                                          fullWidth
                                          value={leave.vLeaveName}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          InputLabelProps={{ shrink: true }}
                                        />
                                        {(touched.leaveData && touched.leaveData[index] && errors.leaveData && errors.leaveData[index] && errors.leaveData[index].vLeaveName) && (
                                          <FormHelperText sx={{ color: 'error.main' }}>
                                            {errors.leaveData[index].vLeaveName}
                                          </FormHelperText>
                                        )}
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <FormControl fullWidth error={touched.leaveData && touched.leaveData[index] && Boolean(errors.leaveData && errors.leaveData[index] && errors.leaveData[index].pnLeaveCode)}>
                                        <TextField
                                          name={`leaveData.${index}.pnLeaveCode`}
                                          label={<span>Leave Code <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                          variant="outlined"
                                          fullWidth
                                          value={leave.pnLeaveCode}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          InputLabelProps={{ shrink: true }}
                                        />
                                        {(touched.leaveData
                                          && touched.leaveData[index] && errors.leaveData && errors.leaveData[index] && errors.leaveData[index].pnLeaveCode) && (
                                          <FormHelperText sx={{ color: 'error.main' }}>
                                            {errors.leaveData[index].pnLeaveCode}
                                          </FormHelperText>
                                        )}
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <FormControl fullWidth error={touched.leaveData && touched.leaveData[index] && Boolean(errors.leaveData && errors.leaveData[index] && errors.leaveData[index].pnCount)}>
                                        <TextField
                                          name={`leaveData.${index}.pnCount`}
                                          label={<span>Count <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                          variant="outlined"
                                          fullWidth
                                          value={leave.pnCount}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          InputLabelProps={{ shrink: true }}
                                        />
                                        {(touched.leaveData
                                          && touched.leaveData[index] && errors.leaveData && errors.leaveData[index] && errors.leaveData[index].pnCount) && (
                                          <FormHelperText sx={{ color: 'error.main' }}>
                                            {errors.leaveData[index].pnCount}
                                          </FormHelperText>
                                        )}
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <FormControl fullWidth error={touched.leaveData && touched.leaveData[index] && Boolean(errors.leaveData && errors.leaveData[index] && errors.leaveData[index].status)}>
                                        <TextField
                                          name={`leaveData.${index}.status`}
                                          label={<span>Status <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                          variant="outlined"
                                          fullWidth
                                          value={leave.status}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          InputLabelProps={{ shrink: true }}
                                        />
                                        {(touched.leaveData
                                          && touched.leaveData[index] && errors.leaveData && errors.leaveData[index] && errors.leaveData[index].status) && (
                                          <FormHelperText sx={{ color: 'error.main' }}>
                                            {errors.leaveData[index].status}
                                          </FormHelperText>
                                        )}
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <FormControl fullWidth error={touched.leaveData && touched.leaveData[index] && Boolean(errors.leaveData && errors.leaveData[index] && errors.leaveData[index].annualLeave)}>
                                        <TextField
                                          name={`leaveData.${index}.annualLeave`}
                                          label={<span>Annual Leave <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                          variant="outlined"
                                          fullWidth
                                          value={leave.annualLeave}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          InputLabelProps={{ shrink: true }}
                                        />
                                        {(touched.leaveData
                                          && touched.leaveData[index] && errors.leaveData && errors.leaveData[index] && errors.leaveData[index].annualLeave) && (
                                          <FormHelperText sx={{ color: 'error.main' }}>
                                            {errors.leaveData[index].annualLeave}
                                          </FormHelperText>
                                        )}
                                      </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <FormControl fullWidth error={touched.leaveData && touched.leaveData[index] && Boolean(errors.leaveData && errors.leaveData[index] && errors.leaveData[index].maxDays)}>
                                        <TextField
                                          name={`leaveData.${index}.maxDays`}
                                          label={<span>Max Days <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                          variant="outlined"
                                          fullWidth
                                          value={leave.maxDays}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          InputLabelProps={{ shrink: true }}
                                        />
                                        {(touched.leaveData
                                          && touched.leaveData[index] && errors.leaveData && errors.leave                                         && errors.leaveData[index] && errors.leaveData[index].maxDays) && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                              {errors.leaveData[index].maxDays}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <FormControl fullWidth error={touched.leaveData && touched.leaveData[index] && Boolean(errors.leaveData && errors.leaveData[index] && errors.leaveData[index].el)}>
                                          <TextField
                                            name={`leaveData.${index}.el`}
                                            label={<span>EL <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                            variant="outlined"
                                            fullWidth
                                            value={leave.el}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          {(touched.leaveData
                                            && touched.leaveData[index] && errors.leaveData && errors.leaveData[index] && errors.leaveData[index].el) && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                              {errors.leaveData[index].el}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <FormControl fullWidth error={touched.leaveData && touched.leaveData[index] && Boolean(errors.leaveData && errors.leaveData[index] && errors.leaveData[index].type)}>
                                          <TextField
                                            name={`leaveData.${index}.type`}
                                            label={<span>Type <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                            variant="outlined"
                                            fullWidth
                                            value={leave.type}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          {(touched.leaveData
                                            && touched.leaveData[index] && errors.leaveData && errors.leaveData[index] && errors.leaveData[index].type) && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                              {errors.leaveData[index].type}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        {values.leaveData.length > 1 && (
                                          <Button
                                            type="button"
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleRemoveLeave(index, values, setFieldValue)}  // Pass the form values and setFieldValue
                                            style={{ marginRight: '10px' }} 
                                          >
                                            Remove
                                          </Button>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ))}
                                <Grid item xs={12}>
                                  <Grid container spacing={2} justifyContent="flex-end">
                                    <Grid item>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleAddLeave(values.leaveData, setFieldValue)}  // Updated function
                                        style={{ minWidth: '70px' }} // Adjust the width if necessary
                                      >
                                        Add Row
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        onClick={() => handleCancel(resetForm)}
                                        style={{ minWidth: '70px' }} 
                                      >
                                        Cancel
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{ minWidth: '70px' }} 
                                      >
                                        Save
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Form>
                          )}
                        </Formik>
                      </CardContent>
                    </Card>
                  </Grid>
                </Container>
              </Grid>
            </Box>
          </div>
        </Grid>
      </Grid>
    );
  }