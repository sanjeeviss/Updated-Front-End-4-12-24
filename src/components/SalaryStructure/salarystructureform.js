import React, { useState, useEffect } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Grid, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/lab'; 
import { inputFormElements16 } from './salarystructure';
import { PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { SALARYSTRUCTURE } from '../../serverconfiguration/controllers';
import { TextField } from '@mui/material';

const SalaryStructureForm = () => {
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [pnEmployeeId,setEmpoyeeID]=useState('');
  const [basicSalary,setBasicSalary] = useState('');
  const [salary,setSalary]=useState('');
  const [effectiveDate,setEffectiveDate]=useState('');
  const [remarks,setRemarks]=useState('');

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
    pnCompanyid: company,
    pnBranchid: branch,
    salary: salary,
    pnEmployeeId: pnEmployeeId,
    effectiveDate: effectiveDate,
    remarks: remarks,
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    // if (name === 'salary') {
    //   setBasicSalary(value); // Update basicSalary directly
    // }
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const response = await postRequest(ServerConfig.url, SALARYSTRUCTURE, formData);
      if (response.status === 200 || response.status === 201) {
        console.log('Data saved successfully!');
        navigate('/SalaryStructureTable');
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
              Salary Structure Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>COMPANYID</InputLabel>
                    <Select
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        setFormData(prevFormData => ({
                          ...prevFormData,
                          pnCompanyid: e.target.value,
                        }));
                      }}
                    >
                                    <option value="">Select</option>

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
                          pnBranchid: e.target.value,
                        }));
                      }}
                      
                    >
                                   <option value="">Select</option>

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
                <Grid xs={12} sm={6} item>
                 
                 <FormControl fullWidth>
                 <InputLabel shrink>EMPID</InputLabel>
                 
                 <select 
                 name = "pnEmployeeId"
                 onChange={(e)=>{
                 
                 var s=e.currentTarget.value
               var empid=employee.filter((e)=>e.pnEmployeeId==s)
               setEmpoyeeID(s)
               setBasicSalary(parseFloat(empid[0].basicSalary))
              //  setEmployee(employee.filter((e)=>(e.pnBranchid==branch && e.pnCompanyid==company)))
                     handleChange(e)
             }}
             style={{height:'50px'}}>
              <option value="">Select</option>
                  {
                     
                     employee.map((e)=><option>{e.pnEmployeeId}</option>)
                  }
                
                 </select>
              </FormControl>
               </Grid>
               
          
               
                        <Grid xs={12} sm={6} item  >
                        <FormControl fullWidth>
                        <InputLabel shrink>SALARY</InputLabel>
                <select name="salary" onChange={handleChange}
                
                 style={{height:'50px'}}>
                  
                  <option>
                    select...
                    
                  </option>
                  
                  <option>
                    {basicSalary}
                  </option>
                  </select>              
               
               </FormControl>
               </Grid>
 
               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "effectiveDate"
                         label= "EffectiveDate" 
                         variant= "outlined"
                         fullWidth
                         required 
                       
                         type="datetime-local" 
                         onChange={handleChange}
                         InputLabelProps={{ shrink: true }}

                          /> 
               
               </FormControl>
               </Grid>
               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "remarks"
                         label="Remarks" 
                         variant= "outlined" 
                         fullWidth
                         required
                         onChange={handleChange}

                          /> 
               
               </FormControl>
               </Grid>

                {inputFormElements16 && inputFormElements16.map(input => (
                  <Grid item xs={12} key={input.name}>
                    {input.name === 'effectiveDate'  ? (
                      <DatePicker
                        label={input.label}
                        value={formData[input.name]}
                        onChange={(newValue) => handleChange({ target: { name: input.name, value: newValue } })}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                        format="yyyy-MM-ddTh:m:s.000"
                        InputLabelProps={{ shrink: true }}
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

export default SalaryStructureForm;