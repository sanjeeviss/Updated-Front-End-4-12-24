import {
    Grid,
    Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,
    FormControl,
    MenuItem,
    Select,
    FormHelperText,
    InputLabel
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { postRequest } from "../../serverconfiguration/requestcomp";
  import { ServerConfig } from "../../serverconfiguration/serverconfig";
  import { REPORTS, SAVE } from "../../serverconfiguration/controllers";
  import { Formik, Field, Form, ErrorMessage } from "formik";
  import * as Yup from "yup";
  
  export default function PaymLeaveMaster1() {
    const navigate = useNavigate();
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [pnCompanyId, setPnCompanyId] = useState("");
    const isloggedin = sessionStorage.getItem("user");
  
    const validationSchema = Yup.object({
        pnCompanyId: Yup.string()
          .required('Please select a Company ID'),
        
        pnBranchId: Yup.string()
          .required('Please select a Branch ID'),
        
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
          .matches(/^[A-Za-z]{1}$/, 'Status must be a single alphabetic character')
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
      });
      
      const handleSubmit = async (values, { resetForm }) => {
        try {
          const response = await postRequest(ServerConfig.url, SAVE, {
            query: `INSERT INTO [dbo].[paym_leave] ([pn_CompanyID],[v_leaveName],[pn_leaveCode],[pn_Count],[status],[pn_BranchID],[annual_leave],[max_days],[EL],[Type]) 
            VALUES (${values.pnCompanyId},'${values.vLeaveName}','${values.pnLeaveCode}',${values.pnCount},'${values.status}',${values.pnBranchId},'${values.annualLeave}',${values.maxDays},'${values.el}','${values.type}')`
  });
    
          if (response.status === 200) {
            alert('Data saved successfully');
            resetForm(); // Reset the form after successful submission
            navigate('/EarnDeductCompanyMasters'); // Adjust navigation if needed
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
  
    useEffect(() => {
        async function getData() {
          try {
            const companyData = await postRequest(ServerConfig.url, REPORTS, {
              query:` select * from paym_Company where company_user_id = '${isloggedin}'`,
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
              query:` select * from paym_branch where pn_CompanyID = '${pnCompanyId}'`,
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
  
    return (
      <Box sx={{ padding: "40px 10px", maxWidth: 600, margin: "0 auto" }}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
              Leave
            </Typography>
            <Formik
              initialValues={{
                pnCompanyId: pnCompanyId,
                pnBranchId: "",
                vLeaveName: "",
                pnLeaveCode: "",
                pnCount: "",
                status: "",
                annualLeave: "",
                maxDays: "",
                el: "",
                type: ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
              enableReinitialize
            >
              {({ values, handleChange, handleBlur, errors, touched,resetForm }) => (
                <Form>
                  <Grid container spacing={3}>
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
                          sx={{ height: "50px" }}
                        >
                          <MenuItem value="" disabled>
                            Branch Name
                          </MenuItem>
                          {branch.map(e => (
                            <MenuItem key={e.pn_BranchID} value={e.pn_BranchID}>
                              {e.BranchName}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.pnBranchId && errors.pnBranchId && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.pnBranchId}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
  
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.vLeaveName && Boolean(errors.vLeaveName)}>
                        <TextField
                          name="vLeaveName"
                          label={<span>Leave Name<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                          variant="outlined"
                          fullWidth
                          value={values.vLeaveName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.vLeaveName && errors.vLeaveName && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.vLeaveName}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
  
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.pnLeaveCode && Boolean(errors.pnLeaveCode)}>
                        <TextField
                          name="pnLeaveCode"
                          label={<span>Leave Code<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                          variant="outlined"
                          fullWidth
                          value={values.pnLeaveCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.pnLeaveCode && errors.pnLeaveCode && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.pnLeaveCode}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
  
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.pnCount && Boolean(errors.pnCount)}>
                        <TextField
                          name="pnCount"
                          label={<span>Count<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                          variant="outlined"
                          fullWidth
                          value={values.pnCount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.pnCount && errors.pnCount && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.pnCount}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
  
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
                      <InputLabel shrink>Status<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></InputLabel>

                        <Select
                          name="status"
                          label={<span>Status<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
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
  
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.annualLeave && Boolean(errors.annualLeave)}>
                        <TextField
                          name="annualLeave"
                          label={<span>Annual Leave<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                          variant="outlined"
                          fullWidth
                          value={values.annualLeave}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.annualLeave && errors.annualLeave && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.annualLeave}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
  
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.maxDays && Boolean(errors.maxDays)}>
                        <TextField
                          name="maxDays"
                          label={<span>Max Days<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                          variant="outlined"
                          fullWidth
                          value={values.maxDays}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.maxDays && errors.maxDays && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.maxDays}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
  
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.el && Boolean(errors.el)}>
                        <TextField
                          name="el"
                          label={<span>EL<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                          variant="outlined"
                          fullWidth
                          value={values.el}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.el && errors.el && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.el}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
  
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.type && Boolean(errors.type)}>
                        <TextField
                          name="type"
                          label={<span>Type<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></span>}
                          variant="outlined"
                          fullWidth
                          value={values.type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{ shrink: true }}
                        />
                        {touched.type && errors.type && (
                          <FormHelperText sx={{ color: 'error.main' }}>{errors.type}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
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
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    );
  }