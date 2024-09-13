import React, { useState } from 'react';
import { postRequest,getRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Grid, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/lab'; // Import DatePicker component
//import { inputFormElements17 } from './salaryperiod';
import { YEAREND } from '../../serverconfiguration/controllers';
import {TextField} from '@mui/material';
import { useEffect } from 'react';
import { PAYMBRANCHES,PAYMCOMPANIES } from '../../serverconfiguration/controllers';

const Sample1 = () => {
  const navigate = useNavigate();
  const margin = { margin: "0 5px" };
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
  const [companyid, setCompanyid]=useState("")
  const [branchid, setBranchid]= useState("")
  const [startdate, setStartDate]= useState("")
  const [enddate, setEndDate]= useState("")
  const [processdate, setProcessDate]= useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
    pnCompanyId: companyid,
    pnBranchId: branchid,
    startDate: startdate,
    endDate:enddate ,
    processDate: processdate ,
   
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

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card style={{ padding: 20 }}>
          <CardContent>
            <Typography variant='h5' color='textPrimary' align='center' gutterBottom>
              YEAR END FORM
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>Company</InputLabel>
                 <select name = "PnCompanyid" 
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
                 name="PnBranchid"
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
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="startDate"
                   
                    label="startDate"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }} 
                    onChange={(e) => setStartDate(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="endDate"
                   
                    label="endDate"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }} 
                    onChange={(e) => setEndDate(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="processDate"
                   
                    label="processdate"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }} 
                    onChange={(e) => setProcessDate(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

              </Grid>
              <Grid container justifyContent="flex-end" style={{ marginTop: 20 }}>
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button onClick={()=>{

const formData = {
  pnCompanyId: companyid,
    pnBranchId: branchid,
    startDate: startdate,
    endDate:enddate ,
    processDate: processdate ,
};
console.log(formData)
postRequest(ServerConfig.url,YEAREND,formData).then((e)=>{
  console.log(e)
  navigate('/YearEndTable')
}).catch((e)=>console.log(e));

                  
                }}  
        variant='contained' color='primary' >SAVE</Button>

              </Grid>
              
    
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sample1;
