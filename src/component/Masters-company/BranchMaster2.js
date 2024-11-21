import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Container, Typography, FormHelperText,Tabs, Tab, Grid, Card, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import Navbar from "../Home Page-comapny/Navbar1";
import Sidenav from "../Home Page-comapny/Sidenav1";
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS } from '../../serverconfiguration/controllers';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Popover from '@mui/material/Popover';
import { useNavigate } from "react-router-dom";

export default function BranchMasters2 ()  {
  const [tabValue, setTabValue] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [popoverMessage, setPopoverMessage] = useState('');
const[companies,setCompanies]= useState([]);
const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
const [checked, setChecked] = useState(false); // Define the state here

const [pnCompanyId, setPnCompanyId] = useState('');
const navigate = useNavigate();

  const validationSchema = yup.object({
    pnCompanyId: yup.string().required('Company ID is required'),

    branchName: yup
      .string()
      .max(50, 'Branch Name should be at most 50 characters')
      .required('Branch Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Branch Name should contain only letters, numbers, and spaces'),
    branchCode: yup
      .string()
      .max(20, 'Branch Code should be at most 20 characters')
      .required('Branch Code is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Branch Code should contain only letters and numbers'),
    addressLine1: yup
      .string()
      .max(100, 'Address Line 1 should be at most 100 characters')
      .required('Address Line 1 is required')
      .matches(/^[a-zA-Z0-9\s,/-]+$/, 'Address Line 1 should contain only letters, numbers, commas and hyphens'),
    addressLine2: yup
      .string()
      .max(100, 'Address Line 2 should be at most 100 characters')
      .required('Address Line 2 is required')
      .matches(/^[a-zA-Z0-9\s,/-]+$/, 'Address Line 2 should contain only letters, numbers,commas and hyphens'),
    city: yup
      .string()
      .max(50, 'City should be at most 50 characters')
      .required('City is required')
      .matches(/^[a-zA-Z\s]+$/, 'City should contain only letters and spaces'),
    state: yup
      .string()
      .max(50, 'State should be at most 50 characters')
      .required('State is required')
      .matches(/^[a-zA-Z\s]+$/, 'State should contain only letters and spaces'),
    country: yup
      .string()
      .max(100, 'Country should be at most 100 characters')
      .required('Country is required')
      .matches(/^[a-zA-Z\s]+$/, 'Country should contain only letters and spaces'),
    zipCode: yup
      .string()
      .max(6, 'Zip Code should be at most 6 characters')
      .required('Zip Code is required')
      .matches(/^\d{6}$/, 'Zip Code should be 6 digits'),
    phoneNo: yup
      .string()
      .max(50, 'Phone Number should be at most 50 characters')
      .required('Phone Number is required')
      .matches(/^\d{10}$/, 'Phone Number should be 10 digits'),
    faxNo: yup
      .string()
      .max(50, 'Fax Number should be at most 50 characters')
      .required('Fax Number is required')
      .matches(/^\d{10}$/, 'Fax Number should be 10 digits'),
    emailId: yup
      .string()
      .email('Enter a valid email')
      .max(100, 'Email Address should be at most 100 characters')
      .required('Email Address is required'),

    alternateEmailId: yup
      .string()
      .email('Enter a valid email')
            .max(100, 'Alternate Email Address should be at most 100 characters'),
      
    branchUserId: yup
      .string()
      .matches(/^[a-zA-Z0-9_]+$/, 'Branch User ID can only contain letters, numbers, and underscores')
      .max(10, 'Branch User ID should be at most 10 characters')
      .required('Branch User ID is required'),

      branchPassword: yup
      .string()
      .required('Branch Password is required')
      .matches(/^[a-zA-Z0-9]{1,10}$/, 'Password Number should be alphanumeric and at most 20 characters'),
 
    pfno: yup
      .string()
      .max(20, 'PF Number should be at most 20 characters')
      .required('PF Number is required')
      .matches(/^[a-zA-Z0-9]{1,20}$/, 'PF Number should be alphanumeric and at most 20 characters'),
    esino: yup
      .string()
      .max(20, 'ESI Number should be at most 20 characters')
      .required('ESI Number is required')
      .matches(/^\d{10}$/, 'ESI Number should be 10 digits'),
    status: yup
      .string()
      .max(1, 'status Number should be at most 1 characters')
      .required('status Number is required'),
    startDate: yup
      .date()
      .required('Start Date is required'),
    endDate: yup
      .date()
      .required('End Date is required')
      .min(yup.ref('startDate'), 'End Date cannot be before Start Date'),
  });

  const formik = useFormik({
    initialValues: {
      pnCompanyId: '',
      branchCode: '',
      branchName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phoneNo: '',
      faxNo: '',
      emailId: '',
      alternateEmailId: '',
      branchUserId: '',
      branchPassword: '',
      status: '',
      pfno: '',
      esino: '',
      startDate: '',
      endDate: '',
      branchType: 'Sub Branch', // Default value
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      postData(values);
    },
  });
  const handleChange1 = (event) => {
    setChecked(event.target.checked);
    formik.setFieldValue('branchType', event.target.checked ? 'Main Branch' : 'Sub Branch');
    console.log(event.target.checked ? 'Main Branch' : 'Sub Branch');
  };

  const handleTabChange = (event, newValue) => {
    if (newValue > tabValue) {
      if (!isValid()) {
        const errorMessage = 'Please fill all required fields before moving to the next step.';
        const anchorEl = event.target;
        setPopoverOpen(true);
        setPopoverAnchorEl(anchorEl);
        setPopoverMessage(errorMessage);
        return;
      }
    }
    setTabValue(newValue);
  };
  const fetchLocationDetails = async (zipcode) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${zipcode}`);
      const data = response.data;
      if (data.length > 0 && data[0].Status === 'Success') {
        const locationData = data[0];
        formik.setFieldValue('city', locationData.PostOffice[0].District);
        formik.setFieldValue('state', locationData.PostOffice[0].State);
        formik.setFieldValue('country', 'India'); // Assuming the country is always India
      } else {
        alert('Invalid Zip Code');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.handleChange(e);
  
    if (name === 'ZipCode') {
      if (value.length === 6) {
        fetchLocationDetails(value);
      } else {
        formik.setFieldValue('city', '');
        formik.setFieldValue('state', '');
        formik.setFieldValue('country', '');
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && formik.values.ZipCode && formik.values.ZipCode.length === 6) {
      fetchLocationDetails(formik.values.ZipCode);
    }
  };
  
  const isValid = () => {
    const errors = formik.errors;
    if (tabValue === 0) {
      return !errors.companyName && !errors.companyCode && !errors.companyUserId && !errors.companyPassword;;
    } else if (tabValue === 1) {
      return !errors.addressLine1 && !errors.city && !errors.state && !errors.country && !errors.ZipCode;
    } else if (tabValue === 2) {
      return !errors.phoneNumber && !errors.emailAddress;
    } else if (tabValue === 3) {
      return !errors.pfNo && !errors.startDate && !errors.endDate;
    }
    return true;
  };




    const handleNext = async () => {
      if (!isValid()) return;
      if (tabValue === 3) {
        formik.handleSubmit();
      } else {
        setTabValue(tabValue + 1);
      }
    };

    const handleCancel = () => {
      setTabValue(0);
      formik.resetForm();
    };
    useEffect(() => {
      async function getData() {
        try {
          const companyData = await postRequest(ServerConfig.url, REPORTS, {
            "query" :` select * from paym_Company where company_user_id = '${isloggedin}'`
          });
          console.log(companyData.data);
          setCompanies(companyData.data);
          if (companyData.data.length > 0) {
            setPnCompanyId(companyData.data[0].pn_CompanyID); // Set default company ID
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      getData();
    }, []);

 


    const postData = async () => {
      try {
        const query = `
          INSERT INTO [dbo].[paym_Branch] 
          ([pn_CompanyID], [BranchCode], [BranchName], [Address_Line1], [Address_Line2], [City], [State], [Country], [ZipCode], [Phone_No], [Fax_No], [Email_Id], [AlternateEmail_Id], [Branch_User_Id], [Branch_Password], [status], [PFno], [Esino], [start_date], [end_date], [BranchType])
          VALUES  
          ('${formik.values.pnCompanyId}', '${formik.values.branchCode}', '${formik.values.branchName}', '${formik.values.addressLine1}', '${formik.values.addressLine2}', '${formik.values.city}', '${formik.values.state}', '${formik.values.country}', '${formik.values.zipCode}', '${formik.values.phoneNo}', '${formik.values.faxNo}', '${formik.values.emailId}', '${formik.values.alternateEmailId}', '${formik.values.branchUserId}', '${formik.values.branchPassword}', '${formik.values.status || ''}', '${formik.values.pfno || ''}', '${formik.values.esino || ''}', '${formik.values.startDate}', '${formik.values.endDate}', '${formik.values.branchType}')`;
    
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        if (response.status === 200) {
          alert('Data saved successfully!');
        
        } else {
          alert(`Unexpected response status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error in postData:', error);
        alert(`Error: ${error.message || 'An unknown error occurred'}`);
      }
    };

  const fetchCompanies = async () => {
    try {
      const query = `
        SELECT [pn_CompanyID] AS pnCompanyId, [companyName]
      FROM [dbo].[paym_Company]
    `;

      const response = await postRequest(ServerConfig.url, REPORTS, { query });
      if (response.status === 200) {
        return response.data || [];
      } else {
        console.error`(Unexpected response status: ${response.status})`;
        return [];
      }
    } catch (error) {
      console.error('Error fetching companies data:', error);
      return [];
    }
  };

  useEffect(() => {
    async function getCompaniesData() {
      try {
        const response = await fetchCompanies();
        if (Array.isArray(response)) {
          setCompanies(response);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    }

    getCompaniesData();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto" }}>
              <Container maxWidth="md" sx={{ p: 2 }}>
              
                <Card sx={{ width: "750px", padding: "15px" }}>
                <div style={{justifyContent:'space-between',display:'flex'}}>
               <div>
                <Typography variant="h5" fontWeight={'425'} gutterBottom textAlign={'left'}>
                Sub Branch Details
                </Typography>
                </div>
                <div>
                <FormControlLabel
      control={<Checkbox checked={true} disabled />} // Checked and disabled to freeze as "Main Branch"
      label="Sub Branch" // Label set to "Main Branch"
    />
    </div>
    </div>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="paym-branch-details-tabs">
                    <Tab label="General Information" />
                    <Tab label="Address Details" />
                    <Tab label="Contact Details" />
                    <Tab label="Additional Info" />
                  </Tabs>
                  <form onSubmit={formik.handleSubmit}>
                    {tabValue === 0 && (

                      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                 <Grid item xs={4}>
                  <FormControl fullWidth error={formik.touched.pnCompanyId && Boolean(formik.errors.pnCompanyId)}>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      name="pnCompanyId"
                      label="Company"
                      value={formik.values.pnCompanyId}
                      onChange={formik.handleChange}
                      displayEmpty
                     
                    >
                      <MenuItem value="">Select</MenuItem>
                      {companies.map((e) => (
                        <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>
                          {e.companyName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.pnCompanyId && formik.errors.pnCompanyId && (
                      <FormHelperText style={{ color: 'red' }}>
                        {formik.errors.pnCompanyId}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                        
                            label={
                              <span>
                                Branch Code
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="branchCode"
                            value={formik.values.branchCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.branchCode && Boolean(formik.errors.branchCode)}
                            helperText={formik.touched.branchCode && formik.errors.branchCode}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                         
                            label={
                              <span>
                                Branch Name
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="branchName"
                          
                            value={formik.values.branchName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.branchName && Boolean(formik.errors.branchName)}
                            helperText={formik.touched.branchName && formik.errors.branchName}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                          
                            label={
                              <span>
                                Branch User Id
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="branchUserId"
                            autoComplete="off"
                            value={formik.values.branchUserId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.branchUserId && Boolean(formik.errors.branchUserId)}
                            helperText={formik.touched.branchUserId && formik.errors.branchUserId}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
    fullWidth
   
    label={
      <span>
        Branch Password
        <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
      </span>
    }
    name="branchPassword"
    type="password"
    autoComplete="new-password"
    value={formik.values.branchPassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.branchPassword && Boolean(formik.errors.branchPassword)}
    helperText={formik.touched.branchPassword && formik.errors.branchPassword}
    InputLabelProps={{ shrink: true }}
  />
                        </Grid>

                      </Grid>

                    )}

                    {tabValue === 1 && (

                      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                         
                            label={
                              <span>
                               Address Line1
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="addressLine1"
                            value={formik.values.addressLine1}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                            helperText={formik.touched.addressLine1 && formik.errors.addressLine1}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                           
                            label={
                              <span>
                              Address Line2
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="addressLine2"
                            value={formik.values.addressLine2}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
                            helperText={formik.touched.addressLine2 && formik.errors.addressLine2}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            
                            label={
                              <span>
                               ZipCode
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="zipCode"
                            value={formik.values.zipCode}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onBlur={formik.handleBlur}
                            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                            helperText={formik.touched.zipCode && formik.errors.zipCode}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                          
                            label={
                              <span>
                               City
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                          
                            label={
                              <span>
                               State
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            
                            label={
                              <span>
                               Country
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}


                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>

                      </Grid>

                    )}

                    {tabValue === 2 && (

                      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                          
                            label={
                              <span>
                                 Phone Number
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="phoneNo"  // Add this line
                            value={formik.values.phoneNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                            helperText={formik.touched.phoneNo && formik.errors.phoneNo}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                      
                            label={
                              <span>
                              FaxNo
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="faxNo"
                            value={formik.values.faxNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.faxNo && Boolean(formik.errors.faxNo)}
                            helperText={formik.touched.faxNo && formik.errors.faxNo}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                           
                            label={
                              <span>
                                PfNo
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="pfno"
                            value={formik.values.pfno}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pfno && Boolean(formik.errors.pfno)}
                            helperText={formik.touched.pfno && formik.errors.pfno}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                     
                            label={
                              <span>
                                EsiNo
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="esino"
                            value={formik.values.esino}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.esino && Boolean(formik.errors.esino)}
                            helperText={formik.touched.esino && formik.errors.esino}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                          
                            label={
                              <span>
                                 Email Address
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="emailId"
                            value={formik.values.emailId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                            helperText={formik.touched.emailId && formik.errors.emailId}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                        
                           label="Alternate Email Address"
                            name="alternateEmailId"
                            value={formik.values.alternateEmailId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.alternateEmailId && Boolean(formik.errors.alternateEmailId)}
                            helperText={formik.touched.alternateEmailId && formik.errors.alternateEmailId}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                    )}

                    {tabValue === 3 && (

                      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                          
                            label={
                              <span>
                               Status
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                       
                            label={
                              <span>
                              Start Date
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="startDate"
                            type="date"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                            helperText={formik.touched.startDate && formik.errors.startDate}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            
                            label={
                              <span>
                               End Date
                                <span style={{color:'red' , marginLeft:'0.2rem'}}>*</span>
                              </span>
                            }
                            name="endDate"
                            type="date"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                            helperText={formik.touched.endDate && formik.errors.endDate}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                    )}

                    <Box mt={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} style={{ textAlign: 'right' }}>
                          <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginRight: '8px' }}>
                              Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                              {tabValue === 3 ? 'Submit' : 'Next'}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                  <Popover
                    open={popoverOpen}
                    anchorEl={popoverAnchorEl}
                    onClose={() => setPopoverOpen(false)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Typography sx={{ p: 2 }}>{popoverMessage}</Typography>
                  </Popover>
                </Card>
              </Container>
            </Grid>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};
