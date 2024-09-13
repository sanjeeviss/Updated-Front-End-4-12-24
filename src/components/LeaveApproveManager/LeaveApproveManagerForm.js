import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMLEAVE, PAYMDESIGNATION, LEAVEAPPROVEMANAGER } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function ApproveManagerForm() {
const navigate= useNavigate();
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [paymLeave,setPaymLeave]=useState([])
const [pnLeaveId,setLeaveId]=useState("")
const [vLeaveName,setLeaveName]=useState("")
const [pnLeaveCode,setLeaveCode]=useState("")
const [paymDesignation,setPaymDesignation]=useState([])
const [pnDesignationId,setPnDesignationId]=useState("")
const [fromDate,setFromDate]=useState("")
const [toDate,setToDate]=useState("")
const [submittedDate,setSubmittedDate]=useState("")
const [fromStatus,setFromStatus]=useState("")
const [toStatus,setToStatus]=useState("")
const [approve,setApprove]=useState("")
const [yearEnd,setYearEnd]=useState("")
const [dayss,setDayss]=useState("")



useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  setEmployee(data.data);
  const paymleave=await getRequest(ServerConfig.url,PAYMLEAVE)
    setPaymLeave(paymleave.data)
  const paymDesignation=await getRequest(ServerConfig.url,PAYMDESIGNATION)
  setPaymDesignation(paymDesignation.data)
}
getData();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  empId: pnEmployeeId,
  empcode: employeeCode,
  empName: employeeName,
  pnLeaveId: pnLeaveId,
  pnLeaveName: vLeaveName,
  pnLeavecode: pnLeaveCode,
  pnDesignationId:pnDesignationId,
  fromDate: fromDate,
  toDate: toDate,
  submittedDate: submittedDate,
  fromStatus: fromStatus,
  toStatus:  toStatus,
  approve:  approve,
  yearEnd: yearEnd,
  dayss: dayss,
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>Leave Approve Manager</Typography>
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
         
                <Grid item xs={12} sm={6} >
            <FormControl fullWidth>
           
            <InputLabel shrink>LeaveId</InputLabel>
               <select name = "pnLeaveId" 
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
               <Grid xs={12} sm={6} item>
               
                  <FormControl fullWidth>
                  <InputLabel shrink>pnLeaveCode</InputLabel>
               <select 
               name = "pnLeaveCode"
               onChange={(e)=>{
                  
                   var v=e.currentTarget.value
                var leavename=paymLeave.filter((e)=>e.pnLeaveCode==v)
                setLeaveCode(v)
                setLeaveName(leavename[0].vLeaveName)
             
               }}
               style={{ height: '50px' }}
               >
                      <option value="">Select</option>
               
                   {
                      
                      paymLeave.filter((e)=>(e.pnLeaveId == pnLeaveId)).map((e)=><option>{e.pnLeaveCode}</option>)
                    
                   }
               </select>
               </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item  >
                
                 <FormControl fullWidth>
                <TextField 
                name= "vLeaveName"
                value={vLeaveName}
                label="LeaveName"
                variant="outlined"
                fullWidth
                required  /> 
                </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} >
            <FormControl fullWidth>
           
            <InputLabel shrink>pnDesignationId</InputLabel>
               <select name = "pnDesignationId" 
               onChange={(e)=>{
                setPnDesignationId(e.target.value)
                
               }}
               style={{ height: '50px' }}
              
               >
                <option value="">Select</option>
                   {

                      paymDesignation.map((e)=><option>{e.pnDesignationId}</option>)
                      
                   }
               </select>
            </FormControl >
                </Grid>


               

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="fromDate"
                 
                  label="fromDate"
                  variant="outlined"
                  type= "datetime-local"
                  fullWidth
                  required
                  onChange={(e) => setFromDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


<Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="toDate"
              type= "datetime-local"
                  label="toDate"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setToDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="submittedDate"
                 
                  label=" submittedDate"
                  variant="outlined"
                  type= "datetime-local"
                  fullWidth
                  required
                  onChange={(e) =>  setSubmittedDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="fromStatus"
                 
                  label="fromStatus"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setFromStatus(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="toStatus"
                 
                  label="toStatus"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setToStatus(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="approve"
                 
                  label="approve"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setApprove(e.target.value)} 

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
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "dayss"
                 
                  label="dayss"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setDayss(e.target.value)} 

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
  empcode: employeeCode,
  empName: employeeName,
  pnLeaveId: pnLeaveId,
  pnLeaveName: vLeaveName,
  pnLeavecode: pnLeaveCode,
  pnDesignationId:pnDesignationId,
  fromDate: fromDate,
  toDate: toDate,
  submittedDate: submittedDate,
  fromStatus: fromStatus,
  toStatus:  toStatus,
  approve:  approve,
  yearEnd: yearEnd,
  dayss: dayss,
};
console.log(formData)
postRequest(ServerConfig.url,LEAVEAPPROVEMANAGER,formData).then((e)=>{
console.log(e)
navigate('/LeaveApproveManagerTable')
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

