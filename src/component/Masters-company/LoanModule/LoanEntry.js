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
  CardContent,
  Divider,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS, SAVE } from '../../../serverconfiguration/controllers';
import { Box } from '@mui/system';

export default function LoanEntry() {
  const [employee, setEmployee] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [loanTypes, setLoanTypes] = useState([]);
  const [loanDetails, setLoanDetails] = useState({});
  const [maxLoanAmount, setMaxLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [requestedAmount, setRequestedAmount] = useState('');
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoanSummary, setShowLoanSummary] = React.useState(false);
  const isloggedin = sessionStorage.getItem('user');
  const companyID = sessionStorage.getItem('companyID');
  const branchID = sessionStorage.getItem('branchID');
 const [isRequestingHigherAmount, setIsRequestingHigherAmount] = useState(false);
 useEffect(() => {
  async function fetchEmployeeData() {
    try {
      const employeeData = await postRequest(ServerConfig.url, REPORTS, {
        query: `
          SELECT pn_EmployeeID, Employee_Full_Name, pn_BranchID, pn_CompanyID
          FROM paym_Employee 
          WHERE EmployeeCode = '${isloggedin}'
        `,
      });

      if (employeeData.data?.length) {
        const { Employee_Full_Name, pn_EmployeeID, pn_BranchID, pn_CompanyID } = employeeData.data[0];

        // Store values in state and session storage
        setEmployee(Employee_Full_Name);
        setEmployeeID(pn_EmployeeID);
        sessionStorage.setItem('branchID', pn_BranchID);
        sessionStorage.setItem('companyID', pn_CompanyID);

        console.log('Employee details fetched successfully:', {
          pn_EmployeeID,
          pn_BranchID,
          pn_CompanyID,
        });
      } else {
        console.error('No employee data found for the logged-in user.');
        alert('Failed to fetch employee details. Please log in again.');
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      alert('Failed to fetch employee data.');
    }
  }

  fetchEmployeeData();
}, [isloggedin]);

  useEffect(() => {
    async function fetchLoanDetails() {
      if (employeeID) {
        try {
          const loanData = await postRequest(ServerConfig.url, REPORTS, {
            query: `EXEC GetCTCSlabForEmployees @EmployeeID = ${employeeID}`,
          });

          if (loanData.data?.length) {
            const mappedLoanDetails = loanData.data.reduce((acc, { LoanType, MaxLoanAmount, InterestRate }) => {
              acc[LoanType] = { MaxLoanAmount, InterestRate };
              return acc;
            }, {});

            setLoanDetails(mappedLoanDetails);
            setLoanTypes(Object.keys(mappedLoanDetails));
          }
        } catch (error) {
          console.error('Error fetching loan details:', error);
        }
      }
    }

    fetchLoanDetails();
  }, [employeeID]);

  const handleLoanTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedLoanType(selectedType);

    if (loanDetails[selectedType]) {
      setMaxLoanAmount(loanDetails[selectedType].MaxLoanAmount);
      setInterestRate(loanDetails[selectedType].InterestRate);
    } else {
      setMaxLoanAmount('');
      setInterestRate('');
    }
  };

  const handleRequestedAmountChange = (event) => {
    const enteredAmount = event.target.value ? Number(event.target.value) : '';
    setRequestedAmount(enteredAmount);

    if (enteredAmount > maxLoanAmount) {
      setErrorMessage(`Requested amount cannot exceed ${maxLoanAmount}.`);
    } else {
      setErrorMessage('');
    }
  };

  const  validationSchema=Yup.object({
     loantype: Yup.string().required('Please select a Loan Type'),
 
     RepaymentPeriod: Yup.number()
      .required('Please enter repayment period')
      .positive('Repayment period must be positive'),
     ApplicationDate: Yup.date().required('Please select an application date'),
  
  })

 
  const handleSubmit = async (values, { resetForm }) => {
    const requestedAmount = 
    isRequestingHigherAmount && values.RequestedAmount
      ? values.RequestedAmount
      : maxLoanAmount;
    const employeeComments = isRequestingHigherAmount ? values.EmployeeComments : null;
  
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `
          INSERT INTO [dbo].[paym_LoanApply_employee]
          ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [loantype],
          [RequestedAmount], [RepaymentPeriod], [MaxLoanAmount], 
          [ApplicationDate], [InterestRate], [EmployeeComments], [ApplicationStatus])
          VALUES
          ('${companyID}', '${branchID}', '${employeeID}', '${values.loantype}', 
            '${requestedAmount}', '${values.RepaymentPeriod}', 
          '${maxLoanAmount}', '${values.ApplicationDate}', 
          '${interestRate}', ${employeeComments !== null ? `'${employeeComments}'` : 'NULL'}, 'Pending')
        `,
      });
  
      if (response.status === 200) {
        alert('Data saved successfully');
        resetForm();
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data.');
    }
  };
  
  const calculateLoanDetails = (principal, rate, months) => {
    if (principal > 0 && rate > 0 && months > 0) {
      const monthlyRate = rate / 100 / 12; // Monthly interest rate
      const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = emi * months;
      const totalInterest = totalPayment - principal;

      setMonthlyEMI(emi.toFixed(2));
      setPrincipalAmount(principal.toFixed(2));
      setTotalInterest(totalInterest.toFixed(2));
      setTotalAmount(totalPayment.toFixed(2));
    } else {
      setMonthlyEMI(0);
      setPrincipalAmount(0);
      setTotalInterest(0);
      setTotalAmount(0);
    }
  };

  const handleRepaymentPeriodChange = (event) => {
    const period = Number(event.target.value) || 0;
    setRepaymentPeriod(period);

    if (maxLoanAmount > 0 && interestRate > 0) {
      calculateLoanDetails(maxLoanAmount, interestRate, period);
    }
  };

 const handleYesClick = (setFieldValue) => {
    setIsRequestingHigherAmount(true);
    setFieldValue('isRequestingHigherAmount', true);
    setShowLoanSummary(true); // Show Loan Summary
  };
  
  const handleNoClick = (setFieldValue) => {
    setIsRequestingHigherAmount(false);
    setFieldValue('isRequestingHigherAmount', false);
    setShowLoanSummary(false); // Hide Loan Summary
    // Optionally, reset RequestedAmount and EmployeeComments
    setFieldValue('RequestedAmount', maxLoanAmount);
    setFieldValue('EmployeeComments', null);
  };
  // const handleYesClick = (setFieldValue) => {
  //   setIsRequestingHigherAmount(true);
  //   setFieldValue('isRequestingHigherAmount', true);
  //   setShowLoanSummary(true); // Show Loan Summary
  // };
  
  // const handleNoClick = (setFieldValue) => {
  //   setIsRequestingHigherAmount(false);
  //   setFieldValue('isRequestingHigherAmount', false);
  //   setShowLoanSummary(false); // Hide Loan Summary
  // };
  

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Card style={{ padding: '20px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Loan Entry
            </Typography>
            <Formik
              initialValues={{
                loantype: '',
                RequestedAmount: 'null',
                RepaymentPeriod: '',
                ApplicationDate: '',
                EmployeeComments: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, errors, touched ,setFieldValue}) => (
                <Form>
                  
                <Grid display={'flex'} justifyContent={'space-between'}>
                
                <Grid item xs={8} padding={'10px'}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Employee Name" value={employee} fullWidth InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Select
                      name="loantype"
                      value={values.loantype}
                      onChange={(e) => {
                        handleChange(e);
                        handleLoanTypeChange(e);
                      }}
                      displayEmpty
                      error={touched.loantype && Boolean(errors.loantype)}
                    >
                      <MenuItem value="">
                        <em>Select Loan Type</em>
                      </MenuItem>
                      {loanTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.loantype && errors.loantype && <Typography color="error">{errors.loantype}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Max Loan Amount (₹)"
                    value={maxLoanAmount}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Interest Rate (%)"
                    value={interestRate}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              
                <Grid item xs={12} sm={6}>
        <TextField
          label="Repayment Period (Months)"
          name="RepaymentPeriod"
          type="number"
          value={repaymentPeriod}
          onChange={(e) => {
            handleChange(e);
            handleRepaymentPeriodChange(e);
          }}
          fullWidth
        />
      </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Application Date"
                    name="ApplicationDate"
                    type="date"
                    value={values.ApplicationDate}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={touched.ApplicationDate && Boolean(errors.ApplicationDate)}
                    helperText={touched.ApplicationDate && errors.ApplicationDate}
                  />
                </Grid>

                <Grid item xs={12} sx={{ display: 'inline-flex', alignItems: 'center' }}>
  <p style={{ margin: 0, paddingRight: '10px' }}>Do you want to request a loan amount?</p>
  <Button onClick={() => handleYesClick(setFieldValue)} variant="contained">Yes</Button>
  <Button onClick={() => handleNoClick(setFieldValue)} variant="outlined">No</Button>
</Grid>

{isRequestingHigherAmount && (
  <>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Requested Amount"
        type="number"
        name="RequestedAmount"
        value={values.RequestedAmount}
        onChange={(e) => {
          handleChange(e);
          handleRequestedAmountChange(e);
        }}
        fullWidth
        error={touched.RequestedAmount && Boolean(errors.RequestedAmount)}
        helperText={touched.RequestedAmount && errors.RequestedAmount}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </Grid>
    <Grid item xs={12} sm={6}>
                  <TextField
                    label="Interest Rate (%)"
                    value={interestRate}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
    <Grid item xs={12}>
      <TextField
        label="Employee Comments"
        name="EmployeeComments"
        value={values.EmployeeComments}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
      />
    </Grid>
  </>
)}
              <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Grid>
              </Grid>
            </Grid>
            
            <Grid item xs={12} sm={4}>
            <Grid item xs={12} sm={12} sx={{ padding: '10px',alignContent:'right'}}>
              <Card     sx={{
            
              borderLeft: '10px solid transparent', // Set transparent to enable the gradient effect
              borderImage: 'linear-gradient(to bottom, pink, orange) 1', // Apply gradient with pink and orange
              boxShadow: 3, // Optional: Adds a subtle shadow around the card
              padding: '20px', // Padding inside the card
              display: 'flex', // To align content properly within the card
              flexDirection: 'column', // Ensures the content is stacked vertically
              alignItems: 'flex-start', // Aligns content to the left
              }}>
  <CardContent>
            <Typography variant="h6" gutterBottom>
              Loan Details
            </Typography>
            <Typography align='left'>Max Loan Amount: ₹{maxLoanAmount}</Typography>
            <Typography align='left'>Interest Rate: {interestRate}%</Typography>
            <Typography align='left'>Repayment Period: {repaymentPeriod} months</Typography>
            <Divider sx={{ borderColor: 'black', borderStyle: 'dot', borderWidth: '1px', marginY: 1 }} />
            <Typography align='left'>Monthly EMI: ₹{monthlyEMI}</Typography>
            <Typography  align='left'>Principal Amount: ₹{principalAmount}</Typography>
            <Typography  align='left'>Total Interest Amount: ₹{totalInterest}</Typography>
            <Typography  align='left'>Total Amount: ₹{totalAmount}</Typography>
          </CardContent>
</Card>
</Grid>

{showLoanSummary && (
      <Grid item xs={12} sm={12} sx={{ padding: '10px', alignContent: 'right' }}>
        <Card
          style={{
            borderLeft: '5px solid blue',
            borderRight: '5px solid blue',
            borderRadius: '10px',
            padding: '15px',
          }}
        >
          <Typography gutterBottom variant="h6">
            Loan Summary
          </Typography>
          <Typography  align='left'>Requested Amount: ₹{requestedAmount || 'N/A'}</Typography>       
             <Typography  align='left'>Eligible Loan Amount: ₹{maxLoanAmount}</Typography>
          <Typography  align='left'>Interest Rate: {interestRate}%</Typography>
          <Typography  align='left'>Repayment Period: {repaymentPeriod} months</Typography>
        </Card>
      </Grid>
    )}

</Grid>

            </Grid>
            </Form>

              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
