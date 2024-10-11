import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Grid,Box,Container,
  Stack,
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
export default function ShiftFormMaster1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('user'));

  // Fetch company data
  useEffect(() => {
    async function getData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Company WHERE company_user_id = '${isLoggedIn}'`,
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
  }, [isLoggedIn]);

  // Fetch branch data based on company selection
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
        console.error('Error fetching branch data:', error);
      }
    }
    getData();
  }, [pnCompanyId]);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    pnCompanyId: Yup.string().required('Please select a Company ID'),
    pnBranchId: Yup.string().required('Please select a Branch ID'),
    vShiftName: Yup.string()
      .matches(/^[A-Za-z0-9\s]{1,40}$/, 'Shift Name must be alphanumeric and up to 40 characters')
      .required('Shift Name is required'),
    vShiftFrom: Yup.string()
      .matches(/^[A-Za-z0-9\s]{1,5}$/, 'Shift From must be alphanumeric and up to 5 characters')
      .required('Shift From is required'),
    vShiftTo: Yup.string()
      .matches(/^[A-Za-z0-9\s]{1,5}$/, 'Shift To must be alphanumeric and up to 5 characters')
      .required('Shift To is required'),
    vShiftCategory: Yup.string()
      .matches(/^[A-Za-z0-9\s]{1,20}$/, 'Shift Category must be alphanumeric and up to 20 characters')
      .required('Shift Category is required'),
    status: Yup.string()
      .matches(/^[A-Za-z]$/, 'Status must contain only alphabetic characters')
      .required('Status is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_Shift]([pn_CompanyID],[BranchID],[v_ShiftName],[v_ShiftFrom],[v_ShiftTo],[status],[v_ShiftCategory]) VALUES ('${values.pnCompanyId}', '${values.pnBranchId}', '${values.vShiftName}', '${values.vShiftFrom}', '${values.vShiftTo}', '${values.status}', '${values.vShiftCategory}')`,
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        resetForm(); // Reset the form after successful submission
        navigate('/CategoryFormMaster1'); // Adjust navigation if needed
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
    navigate('/CategoryFormMaster'); // Adjust navigation if needed
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
    <Stack spacing={3} alignItems="center" sx={{ padding: '80px 5px 0 5px' }}>
      <Paper sx={{ width: '100%', maxWidth: 800, padding: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Shift
        </Typography>
        <Formik
          initialValues={{
            pnCompanyId: pnCompanyId || '',
            pnBranchId: '',
            vShiftName: '',
            vShiftFrom: '',
            vShiftTo: '',
            vShiftCategory: '',
            status: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
          enableReinitialize
        >
          {({ values, handleChange, handleBlur, errors, touched, resetForm }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={touched.pnBranchId && Boolean(errors.pnBranchId)}>
                    <Select
                      name="pnBranchId"
                      value={values.pnBranchId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      displayEmpty
                      renderValue={(selected) => selected ? branch.find((b) => b.pn_BranchID === selected)?.BranchName : 'Branch Name'}
                    >
                      <MenuItem value="" disabled>
                        Branch Name
                      </MenuItem>
                      {branch.map((b) => (
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
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={touched.vShiftName && Boolean(errors.vShiftName)}>
                    <TextField
                      name="vShiftName"
                      label={
                        <span>
                          Shift Name
                          <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      fullWidth
                     
                      value={values.vShiftName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {touched.vShiftName && errors.vShiftName && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.vShiftName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={touched.vShiftFrom && Boolean(errors.vShiftFrom)}>
                    <TextField
                      name="vShiftFrom"
                      label={
                        <span>
                          Shift From
                          <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      fullWidth
                     
                      value={values.vShiftFrom}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {touched.vShiftFrom && errors.vShiftFrom && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.vShiftFrom}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={touched.vShiftTo && Boolean(errors.vShiftTo)}>
                    <TextField
                      name="vShiftTo"
                      label={
                        <span>
                          Shift To
                          <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      fullWidth
                     
                      value={values.vShiftTo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {touched.vShiftTo && errors.vShiftTo && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.vShiftTo}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={touched.vShiftCategory && Boolean(errors.vShiftCategory)}>
                    <TextField
                      name="vShiftCategory"
                      label={
                        <span>
                          Shift Category
                          <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      fullWidth
                     
                      value={values.vShiftCategory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {touched.vShiftCategory && errors.vShiftCategory && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors.vShiftCategory}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                    <InputLabel shrink>Status<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></InputLabel>

                      <Select
                        name="status"
                       label="Status"
                        variant="outlined"
                        fullWidth
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        InputLabelProps={{ shrink: true }}
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
      </Paper>
    </Stack>
    </Container>
    </Grid>
    </Box>
    </div>
    </Grid>
    </Grid>
  );
}