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
} from '@mui/material';
import { postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { REPORTS, SAVE } from '../../../serverconfiguration/controllers';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Navbar from "../../Home Page-comapny/Navbar1";
import Sidenav from "../../Home Page-comapny/Sidenav1";
import { DataGrid } from '@mui/x-data-grid';
export default function LoanMaster() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [isloggedin, setIsloggedin] = useState(sessionStorage.getItem('user'));
  const [loanData, setLoanData] = useState([]);
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

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT pn_Companyid, v_LoanName, v_LoanCode, status, Pn_BranchID FROM [dbo].[paym_Loan]`,
        });
  
        // Add CompanyName and BranchName based on pn_Companyid and Pn_BranchID
        const modifiedData = response.data.map((loan) => ({
          ...loan,
          CompanyName: company.find((c) => c.pn_CompanyID === loan.pn_Companyid)?.CompanyName || 'Unknown Company',
          BranchName: branch.find((b) => b.pn_BranchID === loan.Pn_BranchID)?.BranchName || 'Unknown Branch',
          id: `${loan.pn_Companyid}-${loan.v_LoanCode}`, // Ensure uniqueness
        }));
  
        setLoanData(modifiedData);  // Set the modified loan data with names
      } catch (error) {
        console.error('Error fetching loan data:', error);
      }
    };
    fetchLoanData();
  }, [company, branch]);  // Re-run the effect when company or branch data changes
  
  const columns = [
    { field: 'CompanyName', headerName: 'Company Name', width: 200 },
    { field: 'v_LoanName', headerName: 'Loan Name', width: 200 },
    { field: 'v_LoanCode', headerName: 'Loan Code', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'BranchName', headerName: 'Branch Name', width: 150 }, // Show Branch Name here
  ];

  // Form validation schema using Yup
// Update Yup Validation Schema with proper regex for multiple characters
const validationSchema = Yup.object({
  pnCompanyId: Yup.string().required('Please select a Company ID'),
  pnBranchId: Yup.string().required('Please select a Branch ID'),
  vLoanName: Yup.string()
    .matches(/^[A-Za-z0-9\s]{1,50}$/, 'Loan Name must be alphanumeric and up to 50 characters')
    .required('Loan Name is required'),
  vLoanCode: Yup.string()
    .matches(/^[A-Za-z0-9\s]{1,50}$/, 'Loan Code must be alphanumeric and up to 50 characters')
    .required('Loan Code is required'),
  status: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Status must contain only alphabetic characters')
    .required('Status is required'),
});

// Handle form submission with console log for debugging
const handleSubmit = async (values, { resetForm }) => {
  console.log('Submitting values:', values); // Debugging log
  try {
    const response = await postRequest(ServerConfig.url, REPORTS, {
      query: `INSERT INTO [dbo].[paym_Loan] 
                ([pn_Companyid], [v_LoanName], [v_LoanCode], [status], [Pn_BranchID]) 
              VALUES 
                ('${values.pnCompanyId}', '${values.vLoanName}', '${values.vLoanCode}', '${values.status}', '${values.pnBranchId}')`,
    });

    if (response.status === 200) {
      alert('Data saved successfully');
      resetForm(); // Reset the form after successful submission
      // navigate('/LoanList'); // Adjust navigation if needed
    } else {
      alert('Failed to save data');
    }
  } catch (error) {
    console.error('Error saving data:', error);
    alert('Failed to save data');
  }
};


  // Handle form cancellation
  // const handleCancel = (resetForm) => {
  //   resetForm(); // Reset the form on cancel
  // };

  return (
    <div className="background1">

    <Grid >
      {/* Navbar */}
      <Grid item xs={12}>
        <Navbar />
      </Grid>

      {/* Sidebar and Main Content */}
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
        {/* Sidebar */}
        <Grid item xs={2}>
          <Sidenav />
        </Grid>

        {/* Main Content */}
     
        <Grid item xs={10} sx={{ padding: "60px 0 0 0", overflowY: "auto",margin:'0 auto' }}>

       
        <div className="background1">

          <Card style={{ maxWidth: 1100, width: "100%", padding:"50px"    
          }}>
            <CardContent>
            <Grid elevation={3} style={{ padding: 2, width: '970px'}}>
            <CardContent>
                      <Typography variant="h5" gutterBottom color="textPrimary" align="left" fontWeight={'500'} paddingBottom={'10px'}>
                        loan Master
                      </Typography>
                      <Formik
                        initialValues={{
                          pnCompanyId: pnCompanyId || '',
                          pnBranchId: '',
                          vLoanName: '',
                          vLoanCode:'',
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
                        label="Company Name"
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
                                    {/* {branch.map(b => (
                                      <MenuItem key={b.pn_BranchID} value={b.pn_BranchID}>
                                        {b.BranchName}
                                      </MenuItem>
                                    ))} */}

{branch.map((b) => (
      <MenuItem
        key={b.pn_BranchID}
        value={b.pn_BranchID}
        disabled={b.BranchType !== 'Main Branch'} // Disable non-main branches
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: b.BranchType === 'Main Branch' ? '#e0f7fa' : 'transparent', // Highlight main branch
          padding: '8px', // Add padding for better spacing
        }}
      >
        <span style={{ fontWeight: b.BranchType === 'Main Branch' ? 'normal' : 'normal' }}>
          {b.BranchName}
        </span>
        {b.BranchType === 'Main Branch' && (
          <span style={{ fontSize: '0.8em', color: 'gray', marginLeft: '10px' }}>
           - Main Branch
          </span>
        )}
         {b.BranchType !== 'Main Branch' && (
          <span style={{ fontSize: '0.8em', color: 'gray' }}>- Sub Branch</span> // Sub branch label
        )}
        
      </MenuItem>
    ))}
                                  </Select>
                                  {touched.pnBranchId && errors.pnBranchId && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.pnBranchId}</FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={touched.vLoanCode && Boolean(errors.vLoanCode)}>
                                  <TextField
                                    name="vLoanCode"
                                    label={<span>Loan Code<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                    variant="outlined"
                                    fullWidth
                                    value={values.vLoanCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                  {touched.vLoanCode && errors.vLoanCode && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vLoanCode}</FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={touched.vLoanName && Boolean(errors.vLoanName)}>
                                  <TextField
                                    name="vLoanName"
                                    label={<span>Loan Name<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                    variant="outlined"
                                    fullWidth
                                    value={values.vLoanName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                  {touched.vLoanName && errors.vLoanName && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.vLoanName}</FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                                  <TextField
                                    name="status"
                                    label={<span>Status<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                                    variant="outlined"
                                    fullWidth
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{ shrink: true }}
                                  />
                                  {touched.status && errors.status && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.status}</FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid container spacing={1} paddingTop="20px">
                  <Grid item xs={12} align="right">
                    {/* <Button
                      style={{ margin: '0 5px' }}
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleCancel(resetForm)} // Call handleCancel on click
                    >
                      CANCEL
                    </Button> */}
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
                  {/* </Card> */}

                  <DataGrid
  rows={loanData}  // The data without id field
  columns={columns}  // Use the defined columns
  // pageSize={5}
  // rowsPerPageOptions={[5, 10, 20]}
  // checkboxSelection
  getRowId={(row) => `${row.pn_Companyid}-${row.v_LoanCode}`}  // Use a unique combination of fields for id
/>


      </Grid>
      </CardContent>
      </Card>
      </div>
      </Grid>
      </Grid>
      </Grid>
      </div>    
  );
}