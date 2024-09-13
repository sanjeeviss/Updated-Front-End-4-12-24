import React, { useState, useEffect } from 'react';
import { postRequest, getRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Grid, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import {TextField} from '@mui/material';

import { PAYMEMPLOYEE, SHIFTBALANCE, SHIFTMONTH, SHIFTPATTERN } from '../../serverconfiguration/controllers';
import { inputFormElements15 } from './shiftbalance';

export default function Sample15() {
  const navigate = useNavigate();
  const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [monthyear,setMonthYear]=useState("")
const [slot,setSlot]=useState("")
const [balanceDays,setBalanceDays]=useState("")
const[patternCode,setPatternCode]=useState("")
const[shiftpatterns,setShiftPatterns]=useState([])
const[shiftmonths,setShiftMonths]=useState([])

  const [formData, setFormData] = useState({
    pnCompanyid: company,
    pnBranchid: branch,
    pnEmployeecode: employeeCode,
    pnEmployeename: employeeName, // Added employee name field to state
    monthyear: monthyear,
    patternCode: patternCode,
    slot: slot,
    balanceDays: balanceDays,
  });

  useEffect(()=>{
    async function getData()
    {
      const data=await getRequest(ServerConfig.url,PAYMEMPLOYEE)
      setEmployee(data.data)

      const patdata=await getRequest(ServerConfig.url,SHIFTPATTERN)
      setShiftPatterns(patdata.data)

      const mondata=await getRequest(ServerConfig.url,SHIFTMONTH)
      setShiftMonths(mondata.data)
     
}
    getData()
  
  },[])

  // const handleChange = (name, value) => {
  //   let updatedValue = value;
  //   if (value instanceof Date) {
  //     updatedValue = value.toISOString();
  //   }
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     [name]: updatedValue,
  //   }));
  // };

  // const handleCompanyChange = (e) => {
  //   const companyId = e.target.value;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     pnCompanyid: companyId,
  //   }));
  // };

  // const handleBranchChange = (e) => {
  //   const branchId = e.target.value;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     pnBranchid: branchId,
  //   }));
  // };

  // const handleEmployeeCodeChange = (e) => {
  //   const employeeCode = e.target.value;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     pnEmployeecode: employeeCode,
  //   }));
  // };

  // const handlePatternCodeChange = (e) => {
  //   const patternCode = e.target.value;
  //   setFormData(prevFormData => ({
  //     ...prevFormData,
  //     patternCode: patternCode,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log('Form data:', formData);
  //     const response = await postRequest(ServerConfig.url, SHIFTBALANCE, formData);
  //     if (response.status === 200 || response.status === 201) {
  //       console.log('Data saved successfully!');
  //       navigate('/SalaryStructureTable');
  //     } else {
  //       console.error('Error saving data:', response.statusText);
  //       console.error('Server validation errors:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //   }
  // };

  const margin={margin:"0 5px"}
  return (
      <div>
        <Grid style={{padding: "80px 5px 0 5px"}}>
          <Card style = {{maxWidth: 600, margin: "0 auto"}}>
            <CardContent>
              <Typography variant='h5' color='S- Light' align='center'>
                Shift Balance
              </Typography>
              <Typography variant='subtitle1' color="textSecondary" paddingBottom={'20px'}>
                Fill all the Mandatory fields 
              </Typography>
          <form> 
          <Grid container spacing={2} inputlabelprops={{shrink:true}}>
          <Grid item xs={12} sm={6} >
            <FormControl fullWidth>
           
            <InputLabel shrink>Company</InputLabel>
               <select name = "pnCompanyId" 
               onChange={(e)=>{
                setCompany(e.target.value)
                

                
               }}
               style={{ height: '50px' }}
              
               >
                <option value="">Select</option>
                   {

                      employee.map((e)=><option>{e.pnCompanyId}</option>)
                      
                   }
               </select>
            </FormControl >
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth >
                  <InputLabel shrink>BranchId</InputLabel>
               <select 
               name="pnBranchId"
               onChange={(e)=>{
                setBranch(e.target.value)
               setShiftPatterns(shiftpatterns.filter((e)=>(e.pnBranchid==1 && e.pnCompanyid==1)))
               console.log(shiftpatterns)
             
              
               }}
               style={{ height: '50px' }}
               inputlabelprops={{ shrink: true }}
               >
                <option value="">Select</option>
                   {
                     
                        employee.filter((e)=>(e.pnCompanyId==company)).map((e)=><option>{e.pnBranchId}</option>)
                   }
               </select>
               </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
               
                  <FormControl fullWidth>
                  <InputLabel shrink>empCode</InputLabel>
               <select 
               name = "pnEmployeecode"
               onChange={(e)=>{
                  
                   var v=e.currentTarget.value
                var empname=employee.filter((e)=>e.employeeCode==v)
                setEmployeeCode(v)
                setEmployeeName(empname[0].employeeFullName)
              
             
               }}
               style={{ height: '50px' }}
               >
                      <option value="">Select</option>
               
                   {
                      
                      employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=><option>{e.employeeCode}</option>)
                    
                   }
               </select>
               </FormControl>
                </Grid>

          
                 <Grid xs={12} sm={6} item  >
                
                 <FormControl fullWidth>
                <TextField 
                name= "pnEmployeename"
                value={employeeName}
                label="employeename"
                variant="outlined"
                fullWidth
                required  /> 
                </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                 
                 <FormControl fullWidth>
                 <InputLabel shrink>patternCode</InputLabel>
                 <select 
                 name = "patternCode"
                 onChange={(e)=>{
                 
                 var s=e.currentTarget.value
               var patncode=shiftpatterns.filter((e)=>e.patternCode==s)
               setPatternCode(patncode[0].patternCode)
              

             }}
             style={{height:'50px'}}>
              <option value="">Select</option>
                  {
                     
                      shiftpatterns.map((e)=><option>{e.patternCode}</option>)
                   

                  }
                
                 </select>
              </FormControl>
               </Grid>
               
          
               
               <Grid xs={12} sm={6} item  >
              
                <FormControl fullWidth>
                <InputLabel shrink>patternCode</InputLabel>
               <TextField value={patternCode}
                 label="patterncode"
                 variant="outlined"
                 fullWidth
                 required /> 
               
               </FormControl>
               </Grid>

               <Grid xs={12} sm={6} item>
                 
                 <FormControl fullWidth>
                 <InputLabel shrink>MonthYear</InputLabel>
                 
                 <select 
                 name = "monthyear"
                 onChange={(e)=>{
                 
                 var s=e.currentTarget.value
               var monyr=shiftmonths.filter((e)=>e.monthyear==s)
               setMonthYear(monyr[0].monthyear)
               setShiftMonths(shiftmonths.filter((e)=>(e.pnBranchid==branch && e.pnCompanyid==company)))

             }}
             style={{height:'50px'}}>
              <option value="">Select</option>
                  {
                     
                     shiftmonths.map((e)=><option>{e.monthyear}</option>)
                  }
                
                 </select>
              </FormControl>
               </Grid>
               
          
               
               <Grid xs={12} sm={6} item  >
              
                <FormControl fullWidth>
               
               <TextField value={monthyear} 
                   label="monthyear"
                   variant="outlined"
                   fullWidth
                   required   /> 
               </FormControl>
               </Grid>

               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="slot"
                   
                    label="slot"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setSlot(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="balanceDays"
                   
                    label="balanceDays"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setBalanceDays(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

                {inputFormElements15.map(input => (
                  <Grid item xs={12} key={input.name}>
                   {/* <TextField
                      fullWidth
                      {...input}
                      value={formData[input.name]}
                      onChange={(e) => handleChange(input.name, e.target.value)} // Pass name and value
                      InputLabelProps={{ shrink: true }}
                    /> */}
                  </Grid>
                ))}
              </Grid>
              <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
                <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                <Button onClick={()=>{

const formData = {
  pnCompanyid: company,
  pnBranchid: branch,
  pnEmployeecode: employeeCode,
  pnEmployeename: employeeName, // Added employee name field to state
  monthyear: monthyear,
  patternCode: patternCode,
  slot: slot,
  balanceDays: balanceDays,
};
console.log(formData)
postRequest(ServerConfig.url,SHIFTBALANCE,formData).then((e)=>{
  console.log(e)
  navigate('/ShiftBalanceTable')
}).catch((e)=>console.log(e));

                  
                }}  
        variant='contained' color='primary' >SAVE</Button>

                  
                  
                  
                  
                  </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
     
    </div>
   

  );
};
