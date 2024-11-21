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

export default function ShiftFormMaster1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [isloggedin, setIsloggedin] = useState(sessionStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBranchIds, setSelectedBranchIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [error, setError] = useState(null);
  const [shiftData, setShiftData] = useState([{ 
    vShiftName: '', 
    vShiftFrom: '', 
    vShiftTo: '', 
    vShiftCategory: '', 
    status: '' 
  }]);

  useEffect(() => {
    async function getData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          query:` SELECT * FROM paym_Company WHERE company_user_id = '${isloggedin}'`,
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
            query:` SELECT * FROM paym_branch WHERE pn_CompanyID = '${pnCompanyId}'`,
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
    shiftData: Yup.array().of(
      Yup.object().shape({
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
          .matches(/^[A-Za-z]{1,10}$/, 'Status must be a  alphabetic character')
          .required('Status is required'),
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
          values.shiftData.forEach((shift) => {
            const query = `
              INSERT INTO [dbo].[paym_Shift] 
              ([pn_CompanyID], [BranchID], [v_ShiftName], [v_ShiftFrom], [v_ShiftTo], [v_ShiftCategory], [status]) 
              VALUES 
              ('${values.pnCompanyId}', '${branchId}', '${shift.vShiftName}', '${shift.vShiftFrom}', '${shift.vShiftTo}', '${shift.vShiftCategory}', 
              CASE 
                WHEN '${shift.status}' = 'Active' THEN 'A' 
                ELSE '${shift.status}' 
              END)
            `;
            console.log("Generated Query for Branch:", query);
            queries.push(postRequest(ServerConfig.url, SAVE, { query }));
          });
        });
      } 
      // If no branches are selected and the branch list is empty
      else if (branch.length === 0) {
        values.shiftData.forEach((shift) => {
          const query = `
            INSERT INTO [dbo].[paym_Shift] 
            ([pn_CompanyID], [BranchID], [v_ShiftName], [v_ShiftFrom], [v_ShiftTo], [v_ShiftCategory], [status]) 
            VALUES 
            ('${values.pnCompanyId}', NULL, '${shift.vShiftName}', '${shift.vShiftFrom}', '${shift.vShiftTo}', '${shift.vShiftCategory}', 
            CASE 
              WHEN '${shift.status}' = 'Active' THEN 'A' 
              ELSE '${shift.status}' 
            END)
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
          throw new Error(`Failed to save for query ${index + 1}: ${response.statusText}`);
        }
      });

      alert('Data saved successfully');
      resetForm();
      navigate('/CategoryFormMaster1');

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

  const handleAddShift = (shiftData, setFieldValue) => {
    const updatedShiftData = [
      ...shiftData, 
      { vShiftName: '', vShiftFrom: '', vShiftTo: '', vShiftCategory: '', status: 'Active' } // Default status 'A' for new rows
    ];
    setFieldValue('shiftData', updatedShiftData);
  };

  const handleRemoveShift = (index, values, setFieldValue) => {
    // Create a copy of the current designationData array
    const updatedShiftData = [...values.shiftData];

    // Remove the specific row by filtering out the index
    updatedShiftData.splice(index, 1);

    // Update the form values using setFieldValue
    setFieldValue('shiftData', updatedShiftData);
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
                        Shift Form
                      </Typography>
                      {error && (
                        <Typography variant="body1" color="error.main" align="center">
                          {error}
                        </Typography>
                      )}
                      <Formik
                        initialValues={{
                          pnCompanyId: pnCompanyId || '',
                          shiftData: shiftData.length > 0
                            ? shiftData.map((shift) => ({
                                vShiftName: shift.vShiftName || '',
                                vShiftFrom: shift.vShiftFrom || '',
                                vShiftTo: shift.vShiftTo || '',
                                vShiftCategory: shift.vShiftCategory || '',
                                status: shift.status || 'Active'
                              }))
                            : [{ vShiftName: '', vShiftFrom: '', vShiftTo: '', vShiftCategory: '', status: 'Active' }]
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
                                {values.shiftData.map((shift, index) => (
                                  <Grid item xs={12} key={index}>
                                    <Grid container spacing={2} alignItems="center">
                                      <Grid item xs={4}>
                                        <FormControl fullWidth error={touched.shiftData && touched.shiftData[index] && Boolean(errors.shiftData && errors.shiftData[index] && errors.shiftData[index].vShiftName)}>
                                          <TextField
                                            name={`shiftData.${index}.vShiftName`}
                                            label={<span>Shift Name <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                            variant="outlined"
                                            fullWidth
                                            value={shift.vShiftName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          {(touched.shiftData && touched.shiftData[index] && errors.shiftData && errors.shiftData[index] && errors.shiftData[index].vShiftName) && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                              {errors.shiftData[index].vShiftName}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <FormControl fullWidth error={touched.shiftData && touched.shiftData[index] && Boolean(errors.shiftData && errors.shiftData[index] && errors.shiftData[index].vShiftFrom)}>
                                          <TextField
                                            name={`shiftData.${index}.vShiftFrom`}
                                            label={<span>Shift From <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                            variant="outlined"
                                            fullWidth
                                            value={shift.vShiftFrom}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          {(touched.shiftData && touched.shiftData[index] && errors.shiftData && errors.shiftData[index] && errors.shiftData[index].vShiftFrom) && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                              {errors.shiftData[index].vShiftFrom}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <FormControl fullWidth error={touched.shiftData && touched.shiftData[index] && Boolean(errors.shiftData && errors.shiftData[index] && errors.shiftData[index].vShiftTo)}>
                                          <TextField
                                            name={`shiftData.${index}.vShiftTo`}
                                            label={<span>Shift To <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                            variant="outlined"
                                            fullWidth
                                            value={shift.vShiftTo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          {(touched.shiftData && touched.shiftData[index] && errors.shiftData && errors.shiftData[index] && errors.shiftData[index].vShiftTo) && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                              {errors.shiftData[index].vShiftTo}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <FormControl fullWidth error={touched.shiftData && touched.shiftData[index] && Boolean(errors.shiftData && errors.shiftData[index] && errors.shiftData[index].vShiftCategory)}>
                                          <TextField
                                            name={`shiftData.${index}.vShiftCategory`}
                                            label={<span>Shift Category <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                            variant="outlined"
                                            fullWidth
                                            value={shift.vShiftCategory}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          {(touched.shiftData && touched.shiftData[index] && errors.shiftData && errors.shiftData[index] && errors.shiftData[index].vShiftCategory) && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                              {errors.shiftData[index].vShiftCategory}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <FormControl fullWidth error={touched.shiftData && touched.shiftData[index] && Boolean(errors.shiftData && errors.shiftData[index] && errors.shiftData[index].status)}>
                                          <TextField
                                            name={`shiftData.${index}.status`}
                                            label={<span>Status <span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                            variant="outlined"
                                            fullWidth
                                            value={shift.status}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                          />
                                          {(touched.shiftData && touched.shiftData[index] && errors.shiftData && errors.shiftData[index] && errors.shiftData[index].status) && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                              {errors.shiftData[index].status}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        {values.shiftData.length > 1 && (
                                          <Button
                                            type="button"
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleRemoveShift(index, values, setFieldValue)}  // Pass the form values and setFieldValue
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
                                        onClick={() => handleAddShift(values.shiftData, setFieldValue)}  // Updated function
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
                                        style={{ minWidth: '70px' }} // Adjust the width if necessary
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
                                        style={{minWidth: '70px' }} // Adjust the width if necessary
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