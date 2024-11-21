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
  ListItemIcon,
  InputLabel,
  Select
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

export default function DivisionMaster1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [isloggedin, setIsloggedin] = useState(sessionStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranchIds, setSelectedBranchIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // State for Select All checkbox

  useEffect(() => {
    async function getData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Company WHERE company_user_id = '${isloggedin}'`,
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

  useEffect(() => {
    setSelectAll(selectedBranchIds.length === branch.length);
  }, [selectedBranchIds, branch]);

  const validationSchema = Yup.object({
    pnCompanyId: Yup.string().required('Please select a Company ID'),
    pnBranchId: Yup.array().min(1, 'Please select at least one branch'),
    vDivisionName: Yup.string()
      .matches(/^[A-Za-z0-9\s]{1,40}$/, 'Division Name must be alphanumeric and up to 40 characters')
      .required('Division Name is required'),
    status: Yup.string()
      .matches(/^[A-Za-z]{1}$/, 'Status must be a single alphabetic character')
      .required('Status is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Construct the insert queries for all selected branches
      const queries = values.pnBranchId.map(branchId => (
        `INSERT INTO [dbo].[paym_Division]([pn_CompanyID],[BranchID],[v_DivisionName],[status]) VALUES ('${values.pnCompanyId}','${branchId}','${values.vDivisionName}','${values.status}')`
      ));
  
      // Execute all queries in parallel
      const responses = await Promise.all(queries.map(query =>
        postRequest(ServerConfig.url, SAVE, { query })
      ));
  
      // Check if all responses are successful
      if (responses.every(response => response.status === 200)) {
        alert('Data saved successfully');
        resetForm(); // Reset the form after successful submission
        navigate('/DepartmentFormMaster1');
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
      setSelectedBranchIds([]); // Deselect all
    } else {
      setSelectedBranchIds(branch.map(b => b.pn_BranchID)); // Select all
    }
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
                        Division
                      </Typography>
                      <Formik
                        initialValues={{
                          pnCompanyId: pnCompanyId || '',
                          pnBranchId: selectedBranchIds,
                          vDivisionName: '',
                          status: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                      >
                        {({ values, handleChange, handleBlur, errors, touched, resetForm }) => (
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
                                <FormControl fullWidth error={touched.pnBranchId && Boolean(errors.pnBranchId)}>
                                  
                                  <div>
                                    <TextField
                                      value={branch
                                        .filter(b => selectedBranchIds.includes(b.pn_BranchID))
                                        .map(b => b.BranchName)
                                        .join(', ') || 'Branch List'}
                                      variant="outlined"
                                      fullWidth
                                      onClick={handleMenuClick}
                                      InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                          <IconButton
                                            size="small"
                                            onClick={handleMenuClick}
                                          >
                                            <ArrowDropDownIcon />
                                          </IconButton>
                                        ),
                                      }}
                                    />
                                    <Menu
                                      anchorEl={anchorEl}
                                      open={Boolean(anchorEl)}
                                      onClose={handleMenuClose}
                                      sx={{ width: 400 }} // Adjust the width here
                                    >
                                      <MenuItem
                                        onClick={handleSelectAll}
                                        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontWeight: 'bold' }} // Align items to the left and right
                                      >
                                        Select All
                                        <Checkbox
                                          checked={selectAll}
                                        />
                                      </MenuItem>
                                      {branch.map((b) => (
                                        <MenuItem
                                          key={b.pn_BranchID}
                                          onClick={() => handleBranchChange(b.pn_BranchID)}
                                          sx={{ display: 'flex', justifyContent: 'space-between', width: '280px' }} // Align items to the left and right
                                        >
                                          <ListItemText primary={b.BranchName} />
                                          <ListItemIcon>
                                            <Checkbox
                                              checked={selectedBranchIds.includes(b.pn_BranchID)}
                                            />
                                          </ListItemIcon>
                                        </MenuItem>
                                      ))}
                                    </Menu>
                                  </div>
                                  {touched.pnBranchId && errors.pnBranchId && (
                                    <FormHelperText sx={{ color: 'error.main' }}>
                                      {errors.pnBranchId}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={touched.vDivisionName && Boolean(errors.vDivisionName)}>
                                  <TextField
                                    name="vDivisionName"
                                    label={<span>Division Name <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                    variant="outlined"
                                    fullWidth
                                    value={values.vDivisionName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                  {touched.vDivisionName && errors.vDivisionName && (
                                    <FormHelperText sx={{ color: 'error.main' }}>
                                      {errors.vDivisionName}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                                <InputLabel shrink>Status<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></InputLabel>

                                  <Select
                                    name="status"
                                    // label={<span>Status <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
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
