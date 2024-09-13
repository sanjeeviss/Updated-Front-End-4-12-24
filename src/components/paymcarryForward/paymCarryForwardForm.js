import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMLEAVE, PAYMCARRYFORWARD} from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function PaymCarrForwardForm() {
const navigate= useNavigate();
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [paymLeave,setPaymLeave]=useState([])
const [pnLeaveId,setLeaveId]=useState("")
const [allowDays,setAllowDays]=useState("")
const [takenDays,setTakenDays]=useState("")
const [maxDays,setMaxDays]=useState([])
const [balDays,setBalDays]=useState("")
const [date,setDate]=useState("")
const [yearEnd,setYearEnd]=useState("")

useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  setEmployee(data.data);
  const paymleave=await getRequest(ServerConfig.url,PAYMLEAVE)
    setPaymLeave(paymleave.data)
}
getData();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  pnEmployeeid: pnEmployeeId,
  pnLeaveId: pnLeaveId,
  allowDays:  allowDays,
  takenDays: takenDays,
 maxDays: maxDays,
 balDays: balDays,
  date:date,
  yearEnd: yearEnd
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>paymcarryForward</Typography>
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
         
                <Grid item xs={12} sm={6} >
            <FormControl fullWidth>
           
            <InputLabel shrink>LeaveId</InputLabel>
               <select name = "pnLeaveid" 
               onChange={(e)=>{
                setLeaveId(e.target.value)
                
               }}
               style={{ height: '50px' }}
              
               >
                <option value="">Select</option>
                   {

                      paymLeave.map((e)=><option>{e.pnLeaveId}</option>)
                      
                   }
               </select>
            </FormControl >
                </Grid>
              

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="allowDays"
                 
                  label="allowDays"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setAllowDays(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


<Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="takenDays"
                  label="takenDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setTakenDays(e.target.value)} 
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
                  onChange={(e) =>  setMaxDays(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="balDays"
                 
                  label="balDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setBalDays(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="date"
                 
                  label="date"
                  variant="outlined"
                  type='datetime-local'
                  fullWidth
                  required
                  onChange={(e) => setDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="yearEnd"
                 
                  label="yearEnd"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setYearEnd(e.target.value)} 

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
  pnEmployeeid: pnEmployeeId,
  pnLeaveId: pnLeaveId,
  allowDays:  allowDays,
  takenDays: takenDays,
 maxDays: maxDays,
 balDays: balDays,
  date:date,
  yearEnd: yearEnd
};
console.log(formData)
postRequest(ServerConfig.url,PAYMCARRYFORWARD,formData).then((e)=>{
console.log(e)
navigate('/PaymcarryForwardTable')
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

