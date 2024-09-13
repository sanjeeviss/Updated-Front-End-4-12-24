import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,
    FormControl
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import { EARNDEDUCT, PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
  import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
//   import { inputFormEarnDeduct } from './EarnDeduct';
  import {InputLabel} from '@mui/material';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import { useNavigate } from 'react-router-dom';
  
  
  
  export default function EarnDeductMasters() {
  const navigate = useNavigate();
  const [employee,setEmployee]=useState([])
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
  const [pnEmployeeId,setEmployeeId]=useState("")
  const [employeeCode,setEmployeeCode]=useState("")
  const [employeeName,setEmployeeName]=useState("")
  const [earnDeduct,setEarnDeduct]=useState([])
  const [allowance1,setAllowance1]=useState("")
  const [value1,setValue1]=useState("")
  const [allowance2,setAllowance2]=useState("")
  const [value2,setValue2]=useState("")
  const [allowance3,setAllowance3]=useState("")
  const [value3,setValue3]=useState("")
  const [allowance4,setAllowance4]=useState("")
  const [value4,setValue4]=useState("")
  const [allowance5,setAllowance5]=useState("")
  const [value5,setValue5]=useState("")
  const [allowance6,setAllowance6]=useState("")
  const [value6,setValue6]=useState("")
  const [allowance7,setAllowance7]=useState("")
  const [value7,setValue7]=useState("")
  const [allowance8,setAllowance8]=useState("")
  const [value8,setValue8]=useState("")
  const [allowance9,setAllowance9]=useState("")
  const [value9,setValue9]=useState("")
  const [allowance10,setAllowance10]=useState("")
  const [value10,setValue10]=useState("")
  const [deduction1,setDeduction1]=useState("")
  const [valueA1,setValueA1]=useState("")
  const [deduction2,setDeduction2]=useState("")
  const [valueA2,setValueA2]=useState("")
  const [deduction3,setDeduction3]=useState("")
  const [valueA3,setValueA3]=useState("")
  const [deduction4,setDeduction4]=useState("")
  const [valueA4,setValueA4]=useState("")
  const [deduction5,setDeduction5]=useState("")
  const [valueA5,setValueA5]=useState("")
  const [deduction6,setDeduction6]=useState("")
  const [valueA6,setValueA6]=useState("")
  const [deduction7,setDeduction7]=useState("")
  const [valueA7,setValueA7]=useState("")
  const [deduction8,setDeduction8]=useState("")
  const [valueA8,setValueA8]=useState("")
  const [deduction9,setDeduction9]=useState("")
  const [valueA9,setValueA9]=useState("")
  const [deduction10,setDeduction10]=useState("")
  const [valueA10,setValueA10]=useState("")
  const [dDate,setDdate]=useState("")
  const [dFromDate,setDFromDate]=useState("")
  const [dToDate,setDToDate]=useState("")
  
  
  
  
  
  useEffect(() => {
  async function getData() {
    const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
    setEmployee(data.data);
    const earnDeduct=await getRequest(ServerConfig.url,EARNDEDUCT)
      setEarnDeduct(earnDeduct.data)
  }
  getData();
  }, []);
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    pnCompanyId: company,
    pnBranchId: branch,
    pnEmployeeId: pnEmployeeId,
    empCode: employeeCode,
    empName: employeeName,
    allowance1:  allowance1,
          value1: value1,
          allowance2: allowance2,
          value2: value2,
          allowance3:  allowance3,
          value3:value3,
          allowance4:  allowance4,
          value4:  value4,
          allowance5:  allowance5,
          value5:  value5,
          allowance6:allowance6,
          value6:value6,
          allowance7: allowance7,
          value7:value7,
          allowance8: allowance8,
          value8:  value8,
          allowance9:  allowance9,
          value9:  value9,
          allowance10: allowance10,
          value10: value10,
          deduction1:  deduction1,
          valueA1:   valueA1,
          deduction2: deduction2,
          valueA2: valueA2,
          deduction3:  deduction3,
          valueA3:  valueA3,
          deduction4:  deduction4,
          valueA4:  valueA4,
          deduction5:  deduction5,
          valueA5: valueA5,
          deduction6: deduction6,
          valueA6:  valueA6,
          deduction7: deduction7,
          valueA7: valueA7,
          deduction8:   deduction8,
          valueA8:  valueA8,
          deduction9: deduction9,
          valueA9: valueA9,
          deduction10:  deduction10,
          valueA10: valueA10,
          dDate: dDate,
        dFromDate: dFromDate,
          dToDate:  dToDate
  };
  console.log(formData)
  };
  
    const margin={margin:"0 5px"}
    return (
      <div>
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>Earn Deduct</Typography>
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
                    <FormControl fullWidth >
                    <InputLabel shrink>EmployeeId</InputLabel>
                 <select 
                 name="pnEmployeeId"
                 onChange={(e)=>{
                  setEmployeeId(e.target.value)
                
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                       
                          employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=><option>{e.pnEmployeeId}</option>)
                     }
                 </select>
                 </FormControl>
                  </Grid>
  
  
                  <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>empCode</InputLabel>
                 <select 
                 name = "empCode"
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
                  name= "empName"
                  value={employeeName}
                  label="employeename"
                  variant="outlined"
                  fullWidth
                  required  /> 
                  </FormControl>
                  </Grid>
           
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance1"
                    label="Allowance1"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance1(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value1"
                   
                    label="Value1"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue1(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                 
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance2"
                    label="Allowance2"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance2(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value2"
                   
                    label="Value2"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue2(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance3"
                    label="Allowance3"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance3(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value3"
                   
                    label="Value3"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue3(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance4"
                    label="Allowance4"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance4(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value4"
                   
                    label="Value4"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue4(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance5"
                    label="Allowance5"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance5(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value5"
                   
                    label="Value5"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue5(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance6"
                    label="Allowance6"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance6(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value6"
                   
                    label="Value6"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue6(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance7"
                    label="Allowance7"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance7(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value7"
                   
                    label="Value7"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue7(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance8"
                    label="Allowance8"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance8(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value8"
                   
                    label="Value8"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue8(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance9"
                    label="Allowance9"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance9(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value9"
                   
                    label="Value9"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue9(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="allowance10"
                    label="Allowance10"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setAllowance10(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="value10"
                   
                    label="Value10"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValue10(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction1"
                    label="deduction1"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction1(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA1"
                   
                    label="valueA1"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA1(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction2"
                    label="deduction2"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction2(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA2"
                   
                    label="valueA2"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA2(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction3"
                    label="deduction3"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction3(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA3"
                   
                    label="valueA3"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA3(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction4"
                    label="deduction4"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction4(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA4"
                   
                    label="valueA4"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA4(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction5"
                    label="deduction5"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction5(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA5"
                   
                    label="valueA5"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA5(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction6"
                    label="deduction6"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction6(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA6"
                   
                    label="valueA6"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA6(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction7"
                    label="deduction7"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction7(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA7"
                   
                    label="valueA7"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA7(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction8"
                    label="deduction8"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction8(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA8"
                   
                    label="valueA8"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA8(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction9"
                    label="deduction9"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction9(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA9"
                   
                    label="valueA9"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA9(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="deduction10"
                    label="deduction10"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setDeduction10(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
               <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="valueA10"
                   
                    label="valueA10"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setValueA10(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="dDate"
                    label="dDate"
                    variant="outlined"
                    fullWidth
                    required
                    type='datetime-local'
                    onChange={(e) => setDdate(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="dFromDate"
                    label="dFromDate"
                    variant="outlined"
                    fullWidth
                    required
                    type='datetime-local'
                    onChange={(e) => setDFromDate(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="dToDate"
                    label="dToDate"
                    variant="outlined"
                    fullWidth
                    required
                    type='datetime-local'
                    onChange={(e) => setDToDate(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
  
  
  
  
  
  
                
          </Grid>
          <Grid container spacing={1} paddingTop={'10px'}>
              
              <Grid item xs ={12} align="right" >
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button onClick={()=>{
  const formData = {
    pnCompanyId: company,
    pnBranchId: branch,
    pnEmployeeId: pnEmployeeId,
    empCode: employeeCode,
    empName: employeeName,
    allowance1:  allowance1,
          value1: value1,
          allowance2: allowance2,
          value2: value2,
          allowance3:  allowance3,
          value3:value3,
          allowance4:  allowance4,
          value4:  value4,
          allowance5:  allowance5,
          value5:  value5,
          allowance6:allowance6,
          value6:value6,
          allowance7: allowance7,
          value7:value7,
          allowance8: allowance8,
          value8:  value8,
          allowance9:  allowance9,
          value9:  value9,
          allowance10: allowance10,
          value10: value10,
          deduction1:  deduction1,
          valueA1:   valueA1,
          deduction2: deduction2,
          valueA2: valueA2,
          deduction3:  deduction3,
          valueA3:  valueA3,
          deduction4:  deduction4,
          valueA4:  valueA4,
          deduction5:  deduction5,
          valueA5: valueA5,
          deduction6: deduction6,
          valueA6:  valueA6,
          deduction7: deduction7,
          valueA7: valueA7,
          deduction8:   deduction8,
          valueA8:  valueA8,
          deduction9: deduction9,
          valueA9: valueA9,
          deduction10:  deduction10,
          valueA10: valueA10,
          dDate: dDate,
        dFromDate: dFromDate,
          dToDate:  dToDate
  };
  console.log(formData)
  postRequest(ServerConfig.url,EARNDEDUCT,formData).then((e)=>{
  console.log(e)
  navigate('/EarnDeductTable')
  }).catch((e)=>console.log(e));
  
                  
                }}  
        variant='contained' color='primary' >SAVE</Button>
              </Grid>
              </Grid>
  
        </form>
        </CardContent>
        </Card>
        </Grid>
      </div>
    );
  }
  