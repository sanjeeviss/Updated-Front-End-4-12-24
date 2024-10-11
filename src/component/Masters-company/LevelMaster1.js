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
  Container,Box,
  CardContent,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS, SAVE } from '../../serverconfiguration/controllers';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Navbar from "../Home Page-comapny/Navbar1";
import Sidenav from "../Home Page-comapny/Sidenav1";
export default function LevelFormMaster1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(sessionStorage.getItem('user'));

  useEffect(() => {
    async function getData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          query:` SELECT * FROM paym_Company WHERE company_user_id = '${isLoggedin}'`,
        });
        setCompany(companyData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [isLoggedin]);

  useEffect(() => {
    async function getData() {
      try {
        if (company.length > 0) {
          const branchData = await postRequest(ServerConfig.url, REPORTS, {
            query:` SELECT * FROM paym_branch WHERE pn_CompanyID = '${company[0].pn_CompanyID}'`,
          });
          setBranch(branchData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [company]);

  const validationSchema = Yup.object({
    pnCompanyId: Yup.string().required('Please select a Company ID'),
    pnBranchId: Yup.string().required('Please select a Branch ID'),
    vLevelName: Yup.string()
      .matches(/^[A-Za-z0-9\s]{1,40}$/, 'Level Name must be alphanumeric and up to 40 characters')
      .required('Level Name is required'),
    status: Yup.string()
      .matches(/^[A-Za-z]{1}$/, 'Status must be a single alphabetic character')
      .required('Status is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_Level] ([pn_CompanyID], [BranchID], [v_LevelName], [status])
                VALUES ('${values.pnCompanyId}', '${values.pnBranchId}', '${values.vLevelName}', '${values.status}')`,
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        resetForm();
        navigate('/PaymLeaveMaster1'); // Adjust navigation if needed
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  const handleCancel = (resetForm) => {
    resetForm();
    navigate('/EarnDeductCompanyMasters'); // Adjust navigation if needed
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
            <Typography variant="h5" color="textPrimary" align="center" gutterBottom>
              Level 
            </Typography>
            <Formik
              initialValues={{
                pnCompanyId: company.length > 0 ? company[0].pn_CompanyID : '',
                pnBranchId: '',
                vLevelName: '',
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
                          value={company.find(c => c.pn_CompanyID === values.pnCompanyId)?.CompanyName || ''}
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
                          {branch.map(b => (
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
                      <FormControl fullWidth error={touched.vLevelName && Boolean(errors.vLevelName)}>
                        <TextField
                          name="vLevelName"
                          label={<span>Level Name<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                          variant="outlined"
                          fullWidth
                          value={values.vLevelName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.vLevelName && errors.vLevelName && (
                          <FormHelperText sx={{ color: 'error.main' }}>
                            {errors.vLevelName}
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
                          variant="contained"
                          color="secondary"
                          onClick={() => handleCancel(resetForm)}
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