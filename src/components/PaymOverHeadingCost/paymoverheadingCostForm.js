import {TextField,FormControl, Button, Card,  Typography, Box, Grid, CardContent} from '@mui/material';
import { inputFormElements26} from './paymoverheadingCost'
import { useState, useEffect } from 'react';
import { PAYMCOMPANIES, PAYMLOAN, PAYMOVERHEADINGCOST } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';


export default function Sample26() {

  const navigate = useNavigate();
  const [company,setCompany]=useState([])
  const [pnCompanyId,setPnCompanyid]=useState("")
  const [branchId,setBranchid]=useState("")
  const [overHeadingName,setOverheadingname]=useState("")
  const [status,setStatus]=useState("")
 

   
useEffect(() => {
  async function getData() {
    const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
    setCompany(data.data);
  
  }
  getData();
  }, []);
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    pnCompanyId: pnCompanyId,
    branchId: branchId,
    overHeadingName: overHeadingName,
    status: status,
    pnCompany:{
      "pnCompanyId":pnCompanyId 
    }
    
  
  };
  console.log(formData)
  };
  
    const margin={margin:"0 5px"}
    return (
      <div>
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>PAYM OVERHEADING COST</Typography>
        <form>
       
        <Grid container spacing={2} inputlabelprops={{shrink:true}}>
        <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>Company</InputLabel>
                 <select name = "pnCompanyId" 
                 onChange={(e)=>{
                  setPnCompanyid(e.target.value)
                  
                 
  
                  
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
  
                  <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="branchId"
                  label="branchId"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setBranchid(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="overHeadingName"
                  label="overHeadingName"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setOverheadingname(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
  
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="status"
                  label="status"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setStatus(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid container spacing={1} paddingTop={'10px'}>
            
            <Grid item xs ={12} align="right" >
              <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
  const formData = {
    pnCompanyId: pnCompanyId,
    branchId: branchId,
    overHeadingName: overHeadingName,
    status: status,
    pnCompany:{
      "pnCompanyId":pnCompanyId 
    }
  };
  console.log(formData)
  postRequest(ServerConfig.url,PAYMOVERHEADINGCOST, formData).then((e)=>{
  console.log(e)
  navigate('/PaymOverHeadingcostTable')
  }).catch((e)=>console.log(e));
  
                
              }}  
      variant='contained' color='primary' >SAVE</Button>
            </Grid>
            </Grid>
                </Grid>
                </form>
                </CardContent>
                </Card>
                </Grid>
                </div>
    )   
    
  }
  