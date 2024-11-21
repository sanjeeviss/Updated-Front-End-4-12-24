
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
  CardContent,
  Divider,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS, SAVE } from '../../../serverconfiguration/controllers';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
export default function LoanEntry() {
  const [employee, setEmployee] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [loanTypes, setLoanTypes] = useState([]);
  const [maxLoanAmount, setMaxLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');

  const isloggedin = sessionStorage.getItem('user');
  const companyID = sessionStorage.getItem('companyID');
  const branchID = sessionStorage.getItem('branchID');

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [principalAmount, setPrincipalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [isRequestingHigherAmount, setIsRequestingHigherAmount] = useState(false);
  const [values, setValues] = useState({
    RequestedAmount: '',
  });

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const employeeData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT pn_EmployeeID, Employee_Full_Name, pn_BranchID, pn_CompanyID 
                  FROM paym_Employee 
                  WHERE EmployeeCode = '${isloggedin}'`,
        });

        if (employeeData.data?.length) {
          const { Employee_Full_Name, pn_EmployeeID, pn_BranchID, pn_CompanyID } = employeeData.data[0];
          setEmployee(Employee_Full_Name);
          setEmployeeID(pn_EmployeeID);
          sessionStorage.setItem('branchID', pn_BranchID);
          sessionStorage.setItem('companyID', pn_CompanyID);
        }

        const loanTypeData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT [v_LoanName] AS loantype FROM [dbo].[paym_Loan]`,
        });
        setLoanTypes(loanTypeData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data.');
      }
    }

    fetchEmployeeData();
  }, [isloggedin]);

  useEffect(() => {
    async function fetchLoanDetails() {
      if (employeeID) {
        try {
          // Use employeeID in the stored procedure execution
          const loanData = await postRequest(ServerConfig.url, REPORTS, {
            query: `EXEC GetEmployeeLoanDetails @EmployeeID = '${employeeID}'`,
          });
  console.log(loanData);
  
          if (loanData.data?.length) {
            const { MaxLoanAmount, InterestRate } = loanData.data[0];
            setMaxLoanAmount(MaxLoanAmount);
            setInterestRate(InterestRate);
          } else {
            setMaxLoanAmount('');
            setInterestRate('');
          }
        } catch (error) {
          console.error('Error fetching loan details:', error);
        }
      }
    }
  
    fetchLoanDetails();
  }, [employeeID]);
  

  const calculateLoanDetails = (repaymentPeriod) => {
    if (repaymentPeriod > 0) {
      const principal = parseFloat(maxLoanAmount);
      const interest = parseFloat(interestRate) / 100 / 12;
      const months = parseInt(repaymentPeriod);
      
      const emi = (principal * interest * Math.pow(1 + interest, months)) / (Math.pow(1 + interest, months) - 1);
      const totalPayment = emi * months;
      const totalInterestAmount = totalPayment - principal;
      
      setMonthlyEMI(emi.toFixed(2));
      setPrincipalAmount(principal.toFixed(2));
      setTotalInterest(totalInterestAmount.toFixed(2));
      setTotalAmount(totalPayment.toFixed(2));
    } else {
      setMonthlyEMI(0);
      setPrincipalAmount(0);
      setTotalInterest(0);
      setTotalAmount(0);
    }
  };

  const validationSchema = Yup.object({
    loantype: Yup.string().required('Please select a Loan Type'),
    RequestedAmount: Yup.number().required('Please enter the requested amount'),
    RepaymentPeriod: Yup.number().required('Please enter the repayment period'),
    ApplicationDate: Yup.date().required('Please select the application date'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_LoanApply_employee]
           ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [loantype],
           [RequestedAmount], [RepaymentPeriod], [MaxLoanAmount], 
           [ApplicationDate], [InterestRate], [EmployeeComments], [ApplicationStatus])
           VALUES ('${companyID}', '${branchID}', '${employeeID}', '${values.loantype}', 
           '${values.RequestedAmount}', '${values.RepaymentPeriod}', 
           '${maxLoanAmount}', '${values.ApplicationDate}', 
           '${interestRate}', '${values.EmployeeComments}', 'Pending')`,
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

  const handleYesClick = () => {
    setIsRequestingHigherAmount(true);
  };

  const handleNoClick = () => {
    setIsRequestingHigherAmount(false);
  };

  return (
    
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <Card style={{ padding: '20px' }}>
          <CardContent>
          <Typography variant="h6" gutterBottom align='left'>
                      Loan Entry
                  </Typography>
            <Formik
              initialValues={{
                loantype: '',
                RequestedAmount: '',
                RepaymentPeriod: '',
                ApplicationDate: '',
                EmployeeComments: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form>
                  <Grid display={'flex'} justifyContent={'space-between'}>
                  <Grid item xs={8} padding={'10px'}>
                  <Grid container spacing={2}>
                 
                    <Grid item xs={12} sm={6}>    
                      <TextField label="Employee Name" value={employee} fullWidth InputProps={{ readOnly: true }} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.loantype && Boolean(errors.loantype)}>
                        <Select name="loantype" value={values.loantype} onChange={handleChange} displayEmpty>
                          <MenuItem value="" disabled>Select Loan Type</MenuItem>
                          {loanTypes.map((type) => (
                            <MenuItem key={type.loantype} value={type.loantype}>
                              {type.loantype}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.loantype && errors.loantype && <FormHelperText>{errors.loantype}</FormHelperText>}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField label="Max Loan Amount (₹)" value={maxLoanAmount} fullWidth InputProps={{ readOnly: true }} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField label="Interest Rate(%)" value={interestRate} fullWidth InputProps={{ readOnly: true }} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Repayment Period (Month)"
                        name="RepaymentPeriod"
                        type="number"
                        value={values.RepaymentPeriod}
                        onChange={(e) => {
                          handleChange(e);
                          calculateLoanDetails(e.target.value);
                        }}
                        fullWidth
                        error={touched.RepaymentPeriod && Boolean(errors.RepaymentPeriod)}
                        helperText={touched.RepaymentPeriod && errors.RepaymentPeriod}
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
                  
                    <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary" paragraph>
        <ReportProblemIcon style={{ verticalAlign: 'middle', marginRight: '8px', color: '#f44336' }} />
        By submitting this loan application, I acknowledge that the information provided is accurate to the best of my knowledge and agree to the terms and conditions outlined by the company. I understand that any false or incomplete information may result in the rejection of the loan request.
      </Typography>
                    </Grid>
                    <Divider sx={{ marginY: 2 }} />
                    <Grid item xs={12} sx={{ display: 'inline-flex', alignItems: 'center', }}>
  <p style={{ margin: 0,paddingRight:'10px' }}>Do you want to request a higher loan amount?</p>
  <Button  onClick={handleYesClick} variant="contained">Yes</Button>
  <Button onClick={handleNoClick} variant="outlined">No</Button>
</Grid>

{isRequestingHigherAmount && (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Requested Amount"
          name="RequestedAmount"
          type="number"
          value={values.RequestedAmount}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Request amount Interest Rate(%)"
          value={interestRate}
          fullWidth
          InputProps={{ readOnly: true }} // read-only field
          name="interestRate"
        />
      </Grid>
      <Grid item xs={12} sm={12}>
                      <TextField label="Employee Comments" name="EmployeeComments" value={values.EmployeeComments} onChange={handleChange} fullWidth />
                    </Grid>
    </>
  )}
         
      
                 
                   
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Request 
                      </Button>
                    </Grid>
                  </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ padding: '10px' }}>
  <Card     sx={{
    maxWidth: 345,
    borderLeft: '10px solid transparent', // Set transparent to enable the gradient effect
    borderImage: 'linear-gradient(to bottom, pink, orange) 1', // Apply gradient with pink and orange
    boxShadow: 3, // Optional: Adds a subtle shadow around the card
    padding: '20px', // Padding inside the card
    display: 'flex', // To align content properly within the card
    flexDirection: 'column', // Ensures the content is stacked vertically
    alignItems: 'flex-start', // Aligns content to the left
  }}>
    <CardContent>
      <Typography variant="h6" gutterBottom align="left">
        Loan Details
      </Typography>
      <Typography align="left" sx={{ paddingLeft: '15px' }}>
        Max Loan Amount: ₹{maxLoanAmount}
      </Typography>
      <Typography align="left" sx={{ paddingLeft: '15px' }}>
        Interest Rate: {interestRate}%
      </Typography>
      <Typography align="left" sx={{ paddingLeft: '15px' }}>
        Repayment Period: {values.RepaymentPeriod} months
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography align="left" sx={{ paddingLeft: '15px' }}>
        Monthly EMI: ₹{monthlyEMI}
      </Typography>
      <Typography align="left" sx={{ paddingLeft: '15px' }}>
        Principal Amount: ₹{principalAmount}
      </Typography>
      <Typography align="left" sx={{ paddingLeft: '15px' }}>
        Total Interest Amount: ₹{totalInterest}
      </Typography>
      <Typography align="left" sx={{ paddingLeft: '15px' }}>
        Total Amount: ₹{totalAmount}
      </Typography>
    </CardContent>
  
  </Card>
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
