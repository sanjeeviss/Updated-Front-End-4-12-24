import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Grid, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/lab'; 
import { inputFormElements17 } from './salaryperiod';
import { PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { SALARYPERIOD } from '../../serverconfiguration/controllers';
import { TextField } from '@mui/material';

const SalaryPeriodForm = () => {
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const navigate = useNavigate();
  const margin = { margin: "0 5px" };

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
    }
    getData();
  }, []);

  const [formData, setFormData] = useState({
    pnCompanyId: '',
    pnBranchId: '',
    periodCode: '',
    selection: '',
    pYear: '',
    pMonth: '',
    fromDate: '',
    toDate: '',
    totalDays: '',
    payDate: '',
    otInclude: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const response = await postRequest(ServerConfig.url, SALARYPERIOD, formData);
      if (response.status === 200 || response.status === 201) {
        console.log('Data saved successfully!');
        navigate('/SalaryPeriodTable');
      } else {
        console.error('Error saving data:', response.statusText);
        console.error('Server validation errors:', response);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card style={{ padding: 20 }}>
          <CardContent>
            <Typography variant='h5' color='textPrimary' align='center' gutterBottom>
              Salary Period Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        setFormData(prevFormData => ({
                          ...prevFormData,
                          pnCompanyId: e.target.value,
                        }));
                      }}
                    >
                      {employee.map(e => (
                        <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>
                          {e.pnCompanyId}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <Select
                      value={branch}
                      onChange={(e) => {
                        setBranch(e.target.value);
                        setFormData(prevFormData => ({
                          ...prevFormData,
                          pnBranchId: e.target.value,
                        }));
                      }}
                    >
                      {employee
                        .filter(e => e.pnCompanyId === company)
                        .map(e => (
                          <MenuItem key={e.pnBranchId} value={e.pnBranchId}>
                            {e.pnBranchId}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                {inputFormElements17 && inputFormElements17.map(input => (
                  <Grid item xs={12} key={input.name}>
                    {input.name === 'fromdate' || input.name === 'todate' || input.name === 'pay_date' ? (
                      <DatePicker
                        label={input.label}
                        value={formData[input.name]}
                        onChange={(newValue) => handleChange({ target: { name: input.name, value: newValue } })}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                        format="yyyy-MM-ddTh:m:s.000"
                      />
                    ) : (
                      <TextField
                        fullWidth
                        {...input}
                        value={formData[input.name]}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
              <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
                <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                <Button type="submit" variant='contained' color='primary'>Save</Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SalaryPeriodForm;
