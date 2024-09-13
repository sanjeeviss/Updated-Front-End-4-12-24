import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,  FormControl
  } from '@mui/material';

  import {inputpaymleaveForm} from './paymleave';
import { PAYMBRANCHES, PAYMLEAVE } from '../../serverconfiguration/controllers';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE,PAYMCOMPANIES } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';


  export default function LeaveForm() {
    

    const navigate = useNavigate();

    const[company,setCompany]=useState([])
    const [branch,setBranch]=useState([])
    const[leave,setLeave]=useState([])
    const[pnCompanyId,setPnCompanyId]=useState("")
    const[vLeaveName,setVLeaveName]=useState("")
    const[pnLeaveCode,setPnLeaveCode]=useState("")
    const[pnCount,setpnCount]=useState("")
    const[status,setStatus]=useState("")
    const[pnBranchId,setPnBranchId]=useState("")
    const[annualLeave,setAnnualLeave]=useState("")
    const[maxDays,setMaxDays]=useState("")
    const[el,setEl]=useState("")
    const[type,setType]=useState("")
  

    useEffect(()=>{
      async function getData(){
        const data = await getRequest(ServerConfig.url,PAYMCOMPANIES);
        setCompany(data.data);
        const data1 = await getRequest(ServerConfig.url,PAYMBRANCHES);
        setBranch(data1.data);
      }
      getData();
    },[]);



    const margin={margin:"0 5px"}
    return (
      <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>PAYM LEAVE</Typography>
        <form>
       
        <Grid container spacing={2} inputlabelprops={{shrink:true}}>
        <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
           <InputLabel shrink>Company</InputLabel>
                 <select name = "pnCompanyId" 
                 onChange={(e)=>{
                  setPnCompanyId(e.target.value)
                  
                 

                  
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
              name="vLeaveName"
                  label="vLeaveName"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setVLeaveName(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="pnLeaveCode"
                  label="pnLeaveCode"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setPnLeaveCode(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

              
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="pnCount"
                  label="pnCount"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setpnCount(e.target.value)} 
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
                <Grid xs={12} sm={6} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>BranchId</InputLabel>
                 <select 
                 name="branchId"
                 onChange={(e)=>{
                  setPnBranchId(e.target.value)
               
                
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
              name="annualLeave"
                  label="annualLeave"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setAnnualLeave(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="maxDays"
                  label="maxDays"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setMaxDays(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

               

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="el"
                  label="el"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEl(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="type"
                  label="type"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setType(e.target.value)} 
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
  vLeaveName:vLeaveName,
  pnLeaveCode:pnLeaveCode,
  pnCount:pnCount,
  status:status,
  pnBranchId:pnBranchId,
  annualLeave:annualLeave,
  maxDays:maxDays,
  el:el,
  type:type,
  pnCompany:{
    "pnCompanyId":pnCompanyId 
   
  
    
  }
};
console.log(formData)
postRequest(ServerConfig.url,PAYMLEAVE, formData).then((e)=>{
console.log(e)
navigate('/PaymleaveTables')
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