  import {TextField, Button, Card,  Typography, Box, Grid, CardContent,FormControl} from '@mui/material';

  import { PAYMBRANCHES, PAYMCOMPANIES, PAYMHOLIDAYS } from '../../serverconfiguration/controllers';
  
  import React, { useState, useEffect } from 'react';
  import {FormData}  from '@mui/material';
  
  // import {  Card,  Typography, Box, Grid, CardContent, FormControl} from '@mui/material';
  import {inputpaymHolidayForm} from './paymHoliday';

  import  {getRequest,postRequest} from '../../serverconfiguration/requestcomp';
  import {InputLabel} from '@mui/material';
  import { Label } from '@mui/icons-material';
  import { useNavigate } from 'react-router-dom';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  
  const HolidayForm = () => {  
  const navigate = useNavigate();
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
  const [pnCompanyId,setCompanyid]=useState("")
  const [pnBranchId,setBranchid]=useState("")
  const [pnHolidaycode,setPnholdaycode]=useState("")
  const [pnHolidayname,setPnholidayname]=useState("")
  const [fyear,setFyear]=useState("")
  const [fromDate,setFromdate]=useState("")
  const [toDate,setTodate]=useState("")
  const [days,setDays]=useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: pnCompanyId,
      pnBranchId: pnBranchId,
      pnHolidaycode:pnHolidaycode ,
      pnHolidayname: pnHolidayname, // Added employee name field to state
      fyear: fyear,
      fromDate: fromDate,
      toDate: toDate,
      days: days,
  };
  
  };
  
  
  useEffect(()=>{
    async function getData()
    {
      const data=await getRequest(ServerConfig.url,PAYMCOMPANIES)
      setCompany(data.data)
   
      const data1=await getRequest(ServerConfig.url,PAYMBRANCHES)
      setBranch(data1.data)
      console.log(data1);
  
     
  }
    getData()
  
  },[])
  
      const margin={margin:"0 5px"}
      return (
          <div>
            <Grid style={{padding: "80px 5px 0 5px"}}>
              <Card style = {{maxWidth: 600, margin: "0 auto"}}>
                <CardContent>
                  <Typography variant='h5' color='S- Light' align='center'>
                  Shift Detail
                  </Typography>
                  <Typography variant='subtitle1' color="textSecondary" paddingBottom={'20px'}>
                    Fill all the Mandatory fields 
                  </Typography>
             <form>
              <Grid container spacing ={2}>
              <Grid item xs={12} sm={6} >
                <FormControl fullWidth>
               
                <InputLabel shrink>Company</InputLabel>
                   <select name = "pnCompanyId" 
                   onChange={(e)=>{
                    setCompanyid(e.target.value)
                    
                   
  
                    
                   }}
                   style={{ height: '50px' }}
  
                   >
                    <option value="">Select</option>
                       {
  
                          company.map((e)=><option>{e.pnCompanyId}</option>)
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
                    setBranchid(e.target.value)
                 
                  
                   }}
                   style={{ height: '50px' }}
                   inputlabelprops={{ shrink: true }}
                  
                   >
                    <option value="">Select</option>
                       {
                         
                         branch.map((e)=><option>{e.pnBranchId}</option>)
                        }
                   </select>
                   </FormControl>
                    </Grid>
  
                       
                 <Grid xs={12} sm={6} item  >
                
                <FormControl fullWidth>
                <InputLabel shrink>Holidaycode</InputLabel>
               <TextField 
                 name="pnHolidaycode"
                 label= "pnHolidaycode"
                 variant="outlined"
                 fullWidth
                 required
                 onChange={(e) => setPnholdaycode(e.target.value)} 
               />
               </FormControl>
               </Grid>
                  
               <Grid xs={12} sm={6} item  >
                
                <FormControl fullWidth>
                <InputLabel shrink>Holidayname</InputLabel>
               <TextField 
                                    
                          name= "pnHolidayname"
                          label= "pnHolidayname"
                          variant= "outlined"
                          fullWidth
                          required
                          onChange={(e) => setPnholidayname(e.target.value)} 
                  /> 
               
               </FormControl>
               </Grid>
               <Grid xs={12} sm={6} item  >
                
                <FormControl fullWidth>
                <InputLabel shrink>fyear</InputLabel>
               <TextField 
                    name= "fyear"
                    label= "fyear"
                    variant="outlined"
                    fullWidth
                    required
               
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setFyear(e.target.value)} 
  
                    />
               
               </FormControl>
               </Grid>
                  
               <Grid xs={12} sm={6} item  >
                
                <FormControl fullWidth>
                <InputLabel shrink>fromDate</InputLabel>
               <TextField
                 name= "fromDate"
                 label= "fromDate" 
                 variant= "outlined" 
                 fullWidth
                 required
                 type="datetime-local"
                 InputLabelProps={{ shrink: true }}
                 onChange={(e) => setFromdate(e.target.value)} 
               />
               </FormControl>
               </Grid>
                  
               
                  
               <Grid xs={12} sm={6} item  >
                
                <FormControl fullWidth>
                <InputLabel shrink>toDate</InputLabel>
               <TextField 
                name="toDate"
                label= "toDate "
                variant= "outlined"
                fullWidth
                required
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setTodate(e.target.value)} 
  
             />
               
               </FormControl>
               </Grid>
             
               <Grid xs={12} sm={6} item  >
                
                <FormControl fullWidth>
                <InputLabel shrink>days</InputLabel>
               <TextField 
                name="days"
                label= "days "
                variant= "outlined"
                fullWidth
                required
                
                onChange={(e) => setDays(e.target.value)} 
  
             />
               
               </FormControl>
               </Grid>
                
  
                {
                  inputpaymHolidayForm.map(input=> <Grid xs={input.xs} sm={input.sm} item>
                    {/* <TextField {...input}  InputLabelProps={{shrink:true}}/>  */}
                    </Grid>)
                }
                 </Grid>
                 <Grid container spacing={1} paddingTop={'20px'}>
                
                <Grid item xs ={12} align="right" >
                  <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                  <Button onClick={()=>{
  
  const formData = {
    pnCompanyId: pnCompanyId,
    pnBranchId: pnBranchId,
    pnHolidaycode:pnHolidaycode ,
    pnHolidayname: pnHolidayname, // Added employee name field to state
    fyear: fyear,
    fromDate: fromDate,
    toDate: toDate,
    days: days,
  };
  console.log(formData)
  postRequest(ServerConfig.url,PAYMHOLIDAYS,formData).then((e)=>{
    console.log(e)
    navigate('/PaymHolidayTables')
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
  export default HolidayForm;