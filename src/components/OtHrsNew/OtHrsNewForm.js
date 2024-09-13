import { Typography, Grid, FormControl, InputLabel, Card, CardContent, Checkbox, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getRequest, postRequest, putRequest } from '../../serverconfiguration/requestcomp';
import {  OTSLAB, TIMECARD, PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import React from 'react';



export default function OtHrsNewForm() {
  const [employee, setEmployee] = useState([]);
  const [otsLabs, setOtsLabs] = useState([]);
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [employeeCode,setEmployeeCode]=useState("")
  const [employeeName,setEmployeeName]=useState("")
  const [timeCard, setTimeCard] = useState([]);
  const[dates,setDates] = useState("")
  const [otHrs, setOtHrs] = useState("");
  const [att,setAtt]=useState([])
  const[attb, setAttb]= useState([])

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, OTSLAB);
      setOtsLabs(data.data);
      const timecard=  await getRequest(ServerConfig.url,TIMECARD);
      setTimeCard(timecard.data);
      const employee = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(employee.data);


    }
    getData();
    }, []);


const hours = Math.floor(otHrs);
const minutes = Math.round((otHrs - hours) * 60);
const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
const finalDatetimeString = `1900-01-01T${formattedTime}`;
    

  const handleSave = () => {
    const formdata = {
      pnCompanyid: company,
      pnBranchid: branch,
      empCode: employeeCode,
      dates:dates,
      otHrs: finalDatetimeString
      
    };
    console.log(formdata)
    putRequest(ServerConfig.url, TIMECARD + "/UpdateOvertime",formdata).then((e)=>{
    console.log(e)
    }).catch((e)=>console.log(e));
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 500, margin: "0 auto" }}>
          <CardContent>
            <Typography variant='h5' color='S- Light' align='center'>OtHrs</Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select name="pnCompanyId"
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                      style={{ height: '50px' }}>
                      <option value="">Select</option>
                      {otsLabs.map((e) => <option key={e.Id}>{e.pnCompanyid}</option>)}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={12} item>
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
                           
                          otsLabs.filter((e)=>(e.pnCompanyid==company)).map((e)=> 
                            
                          (<option key={e.Id}>{e.pnBranchid}</option>)
                     )}
                 </select>
                 </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} item>
               
                  <FormControl fullWidth>
                  <InputLabel shrink>empCode</InputLabel>
               <select 
               name = "employeeCode"
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
                      
                      employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=>
                     
                      
                      (<option>{e.employeeCode}</option>)
                    
  )}
               </select>
               </FormControl>
                </Grid>

                <Grid xs={12} sm={12} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>Dates</InputLabel>
                 <select 
                 name="dates"
                 onChange={(e)=>{
                  setDates(e.target.value)
                
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                           
                          timeCard.filter((e)=>(e.empCode== employeeCode)).map((e)=> 
                            
                          (<option key={e.Id}>{e.dates}</option>)
                     )}
                 </select>
                 </FormControl>
                  </Grid>

          
                 <Grid xs={12} sm={12} item  >
                
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




                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>OtHrs</InputLabel>
                 <select 
                 name="OtHrs"
                 onChange={(e)=>{
                 
                  setOtHrs(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                          
                          otsLabs.filter((e)=>(e.pnBranchid==branch)).map((e)=>
                            
                          <option key={e.Id}>{e.otHrs}</option>)
                          
                    
                    }
                 </select>
                 </FormControl>
                  </Grid>

                  
                 
                <Grid container spacing={1} paddingTop={'10px'}>
                  <Grid item xs={12} align="right">
                    <Button style={margin} type="button" variant='outlined' color='primary' onClick={() => window.location.reload()}>RESET</Button>
                    <Button onClick={handleSave} variant='contained' color='primary'>SAVE</Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  ); 
}
