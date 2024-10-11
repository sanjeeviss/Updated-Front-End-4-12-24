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
  FormHelperText,Box,Container,
  CardContent,
  InputLabel,
} from '@mui/material';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { PAYMCOMPANIES, PAYMBRANCHES, SAVE, REPORTS } from '../../serverconfiguration/controllers';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Navbar from "../Home Page-comapny/Navbar1";
import Sidenav from "../Home Page-comapny/Sidenav1";
export default function CategoryFormMaster1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');
  const [isloggedin, setIsloggedin] = useState(sessionStorage.getItem('user'));

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
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [isloggedin]);

  useEffect(() => {
    async function getData() {
      try {
        const branchData = await postRequest(ServerConfig.url, REPORTS, {
          query:` select * from paym_branch where pn_CompanyID = '${pnCompanyId}'`,
        });
        setBranch(branchData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (pnCompanyId) {
      getData();
    }
  }, [pnCompanyId]);

  const validationSchema = Yup.object({
    pnCompanyId: Yup.string().required('Please select a Company ID'),
    pnBranchId: Yup.string().required('Please select a Branch ID'),
    vCategoryName: Yup.string()
      .matches(/^[A-Za-z0-9\s]{1,40}$/, 'Category Name must be alphanumeric and up to 40 characters')
      .required('Category Name is required'),
    status: Yup.string()
      .matches(/^[A-Za-z0-9]$/, 'Status must be a single alphanumeric character')
      .required('Status is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query:` INSERT INTO [dbo].[paym_Category]([pn_CompanyID],[BranchID],[v_CategoryName],[status]) VALUES ('${values.pnCompanyId}', '${values.pnBranchId}', '${values.vCategoryName}', '${values.status}')`,
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        resetForm(); // Reset the form after successful submission
        navigate('/JobStatusFormMaster1');
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

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
    <div>
      <Grid style={{ padding: '80px 5px 0 5px' }}>
    <Card style={{ maxWidth: 600, margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="textPrimary" align="center">
              Category
            </Typography>
            <Formik
              initialValues={{
                pnCompanyId: pnCompanyId || '',
                pnBranchId: pnBranchId || '',
                vCategoryName: '',
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
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.pnCompanyId}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.pnBranchId && Boolean(errors.pnBranchId)}>
                        <Select
                          value={values.pnBranchId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="pnBranchId"
                          displayEmpty
                         
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
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.pnBranchId}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.vCategoryName && Boolean(errors.vCategoryName)}>
                        <TextField
                          name="vCategoryName"
                          label={
                            <span>
                              Category Name
                              <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span>
                            </span>
                          }
                          variant="outlined"
                          fullWidth
                          value={values.vCategoryName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.vCategoryName && errors.vCategoryName && (
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.vCategoryName}
                          </FormHelperText>
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
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.status}
                          </FormHelperText>
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
    </div>
    </Container>
    </Grid>
    </Box>
    </div>
    </Grid>
    </Grid>

  );
}