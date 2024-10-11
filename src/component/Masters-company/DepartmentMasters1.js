import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Box,
  Container,
  CardContent,
  InputLabel,
} from '@mui/material';
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { REPORTS, SAVE } from '../../serverconfiguration/controllers';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Navbar from "../Home Page-comapny/Navbar1";
import Sidenav from "../Home Page-comapny/Sidenav1";

export default function DepartmentFormMaster1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [isloggedin, setIsloggedin] = useState(sessionStorage.getItem('user'));

  // Fetch company data
  useEffect(() => {
    async function getData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          query: `select * from paym_Company where company_user_id = '${isloggedin}'`,
        });
        setCompany(companyData.data);
        if (companyData.data.length > 0) {
          setPnCompanyId(companyData.data[0].pn_CompanyID); // Set default company ID
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    }
    getData();
  }, [isloggedin]);

  // Fetch branch data based on company selection
  useEffect(() => {
    async function getData() {
      try {
        const branchData = await postRequest(ServerConfig.url, REPORTS, {
          query: `select * from paym_branch where pn_CompanyID = '${pnCompanyId}'`,
        });
        setBranch(branchData.data);
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    }
    if (pnCompanyId) {
      getData();
    }
  }, [pnCompanyId]);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    pnCompanyId: Yup.string().required('Please select a Company ID'),
    pnBranchId: Yup.string().required('Please select a Branch ID'),
    vDepartmentName: Yup.string()
      .matches(/^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,40}$/, 'Department Name must be alphanumeric and up to 40 characters')
      .required('Department Name is required'),
    status: Yup.string()
      .matches(/^[A-Za-z]$/, 'Status must contain only alphabetic characters')
      .required('Status is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query:` INSERT INTO [dbo].[paym_Department]([pn_CompanyID],[pn_BranchID],[v_DepartmentName],[status]) VALUES ('${values.pnCompanyId}', '${values.pnBranchId}', '${values.vDepartmentName}', '${values.status}')`,
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        resetForm(); // Reset the form after successful submission
        navigate('/DesignationMasterForm1'); // Adjust navigation if needed
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  // Handle form cancellation
  const handleCancel = (resetForm) => {
    resetForm(); // Reset the form on cancel
  };

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
                <Grid style={{ padding: '80px 5px 0 5px' }}>
                  <Card style={{ maxWidth: 600, margin: '0 auto' }}>
                    <CardContent>
                      <Typography variant="h5" gutterBottom color="textPrimary" align="center">
                        Department Form
                      </Typography>
                      <Formik
                        initialValues={{
                          pnCompanyId: pnCompanyId || '',
                          pnBranchId: '',
                          vDepartmentName: '',
                          status: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                        enableReinitialize
                      >
                        {({ values, handleChange, handleBlur, errors, touched, resetForm }) => (
                          <Form>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                              <FormControl fullWidth error={touched.pnCompanyId && Boolean(errors.pnCompanyId)}>
                      <TextField
                        value={company.find((c) => c.pn_CompanyID === values.pnCompanyId)?.CompanyName || ''}
                        variant="outlined"
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                      {touched.pnCompanyId && errors.pnCompanyId && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.pnCompanyId}</FormHelperText>
                      )}
                    </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={touched.pnBranchId && Boolean(errors.pnBranchId)}>
                                  <Select
                                    name="pnBranchId"
                                    value={values.pnBranchId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    displayEmpty
                                  >
                                    <MenuItem value="" disabled>
                                      Select a Branch
                                    </MenuItem>
                                    {branch.map(b => (
                                      <MenuItem key={b.pn_BranchID} value={b.pn_BranchID}>
                                        {b.BranchName}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {touched.pnBranchId && errors.pnBranchId && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.pnBranchId}</FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={touched.vDepartmentName && Boolean(errors.vDepartmentName)}>
                                  <TextField
                                    name="vDepartmentName"
                                    label={<span>Department Name<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                    variant="outlined"
                                    fullWidth
                                    value={values.vDepartmentName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                  {touched.vDepartmentName && errors.vDepartmentName && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vDepartmentName}</FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
  <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
    <InputLabel shrink>Status<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></InputLabel>
    <Select
      name="status"
      label="Status"
      value={values.status}
      onChange={handleChange}
      onBlur={handleBlur}
      variant="outlined"
      fullWidth
    >
      <MenuItem value="A">Active</MenuItem>
      <MenuItem value="I">Inactive</MenuItem>
    </Select>
    {touched.status && errors.status && (
      <FormHelperText sx={{ color: 'error.main' }}>{errors.status}</FormHelperText>
    )}
  </FormControl>
</Grid>
                              <Grid container spacing={1} paddingTop="20px">
                  <Grid item xs={12} align="right">
                    <Button
                      style={{ margin: '0 5px' }}
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCancel(resetForm)} // Call handleCancel on click
                    >
                      CANCEL
                    </Button>
                    <Button
                      style={{ margin: '0 5px' }}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      SAVE
                    </Button>
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