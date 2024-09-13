import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, ONDUTY } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function OndutyForm() {
const navigate= useNavigate();
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [refNo,setRefNo]=useState("")
const [ondutyDat,setOnDutyDat]=useState([])
const [fstatus,setFstatus]=useState("")
const [todat,setToDat]=useState("")
const [tstatus,setTstatus]=useState("")
const [totDays,setTotDays]=useState("")
const [subDat,setSubDat]=useState("")
const [reason,setReason]=useState("")
const [priority,setPriority]=useState("")
const [approval,setApproval]=useState("")
const [message1,setMessage1]=useState("")
const [message2,setMessage2]=useState("")
const [message3,setMessage3]=useState("")
const [message4,setMessage4]=useState("")


useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  setEmployee(data.data);
  
}
getData();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  empId: pnEmployeeId,
  empName: employeeName,
  refNo:refNo,
  ondutyDat: ondutyDat,
  fstatus: fstatus,
  todat: todat,
  tstatus: tstatus,
  totDays: totDays,
  subDat:  subDat,
  reason: reason,
  priority: priority,
  approval: approval,
  message1: message1,
  message2:message2,
  message3: message3,
  message4: message4
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>OnDuty</Typography>
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
               
                  <FormControl fullWidth>
                  <InputLabel shrink>Employeeid</InputLabel>
               <select 
               name = "empId"
               onChange={(e)=>{
                  
                   var v=e.currentTarget.value
                var empname=employee.filter((e)=>e.pnEmployeeId==v)
                setEmployeeId(v)
                setEmployeeName(empname[0].employeeFullName)
             
               }}
               style={{ height: '50px' }}
               >
                      <option value="">Select</option>
               
                   {
                      
                      employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=><option>{e.pnEmployeeId}</option>)
                    
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
              name="refNo"
                 
                  label="refNo"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setRefNo(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>


<Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="ondutyDat"
              type= "datetime-local"
                  label="ondutyDat"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setOnDutyDat(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="fstatus"
                 
                  label=" fstatus"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>  setFstatus(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="todat"
                 
                  label="todat"
                  variant="outlined"
                  type= "datetime-local"
                  fullWidth
                  required
                  onChange={(e) => setToDat(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="tstatus"
                 
                  label="tstatus"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setTstatus(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="totDays"
                 
                  label="totDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setTotDays(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="subDat"
                 
                  label="subDat"
                  variant="outlined"
                  type= "datetime-local"
                  fullWidth
                  required
                  onChange={(e) => setSubDat(e.target.value)} 
                  InputLabelProps={{shrink:true}}
                  
                />
                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "reason"
                 
                  label="reason"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setReason(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="priority"
                 
                  label="priority"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setPriority(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "approval"
                 
                  label="approval"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setApproval(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="message1"
                 
                  label="message1"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setMessage1(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "message2"
                 
                  label="message2"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setMessage2(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="message3"
                 
                  label="message3"
                  variant="outlined"
                 
                  fullWidth
                  required
                  onChange={(e) => setMessage3(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "message4"
                 
                  label="message4"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setMessage4(e.target.value)} 

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
  empId: pnEmployeeId,
  empName: employeeName,
  refNo:refNo,
  ondutyDat: ondutyDat,
  fstatus: fstatus,
  todat: todat,
  tstatus: tstatus,
  totDays: totDays,
  subDat:  subDat,
  reason: reason,
  priority: priority,
  approval: approval,
  message1: message1,
  message2:message2,
  message3: message3,
  message4: message4
};
console.log(formData)
postRequest(ServerConfig.url,ONDUTY,formData).then((e)=>{
console.log(e)
navigate('/OnDutyTable')
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

