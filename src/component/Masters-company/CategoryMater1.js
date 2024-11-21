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
  Checkbox,
  ListItemText,
} from '@mui/material';
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { REPORTS, SAVE } from '../../serverconfiguration/controllers';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Navbar from "../Home Page-comapny/Navbar1";
import Sidenav from "../Home Page-comapny/Sidenav1";

export default function CategoryFormMaster1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState([]);
  const [isloggedin] = useState(sessionStorage.getItem('user'));

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

  const validationSchema = Yup.object({
    pnCompanyId: Yup.string().required('Please select a Company ID'),
    pnBranchId: Yup.array().min(1, 'Please select at least one Branch').required('Branch selection is required'),
    vCategoryName: Yup.string()
      .matches(/^[A-Za-z0-9\s]{1,40}$/, 'Category Name must be alphanumeric and up to 40 characters')
      .required('Category Name is required'),
    status: Yup.string().required('Status is required'),
  });

  const handleSelectAllBranches = () => {
    if (pnBranchId.length === branch.length) {
      setPnBranchId([]); // Deselect all branches
    } else {
      setPnBranchId(branch.map((b) => b.pn_BranchID)); // Select all branches
    }
  };
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Iterate over selected branches and save each one
      for (const branchId of values.pnBranchId) {
        const response = await postRequest(ServerConfig.url, SAVE, {
          query: `INSERT INTO [dbo].[paym_Category] ([pn_CompanyID], [BranchID], [v_CategoryName], [status]) VALUES ('${values.pnCompanyId}', '${branchId}', '${values.vCategoryName}', '${values.status}')`,
        });
  
        if (response.status !== 200) {
          throw new Error('Failed to save data for one or more branches');
        }
      }
  
      alert('Data saved successfully for all selected branches');
      resetForm();
      navigate('/JobStatusFormMaster1');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data for all branches');
    }
  };
  const handleCancel = (resetForm) => {
    resetForm();
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
                        Category
                      </Typography>
                      <Formik
                        initialValues={{
                          pnCompanyId: pnCompanyId || '',
                          pnBranchId: pnBranchId || [],
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
                                <InputLabel shrink>Company <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></InputLabel>

                                  <TextField
                                  label="Company"
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
                                <InputLabel shrink>Branches <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></InputLabel>
                                  <Select
                                  label="Branches"
                                    multiple
                                    value={pnBranchId}
                                    onChange={(e) => setPnBranchId(e.target.value)}
                                    onBlur={handleBlur}
                                    name="pnBranchId"
                                    renderValue={(selected) => {
                                      if (selected.length === branch.length) {
                                        return 'All Branches Selected';
                                      }
                                      const selectedBranchNames = branch
                                        .filter((b) => selected.includes(b.pn_BranchID))
                                        .map((b) => b.BranchName)
                                        .join(', ');
                                      return selectedBranchNames;
                                    }}
                                  >
                                    <MenuItem>
                                      <Checkbox
                                        checked={pnBranchId.length === branch.length}
                                        onChange={handleSelectAllBranches}
                                      />
                                      <ListItemText primary="Select All" />
                                    </MenuItem>
                                    {branch.map((b) => (
                                      <MenuItem key={b.pn_BranchID} value={b.pn_BranchID}>
                                        <Checkbox checked={pnBranchId.includes(b.pn_BranchID)} />
                                        <ListItemText primary={b.BranchName} />
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
                                  <InputLabel shrink>
                                    Status<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span>
                                  </InputLabel>
                                  <Select
                                    name="status"
                                    label="Status"
                                    variant="outlined"
                                    fullWidth
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
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
                                    onClick={() => handleCancel(resetForm)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    style={{ margin: '0 5px' }}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                  >
                                    Save
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
