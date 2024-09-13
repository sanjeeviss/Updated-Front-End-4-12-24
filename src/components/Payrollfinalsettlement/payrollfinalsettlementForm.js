import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYROLLFINALSETTLEMENT,PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function Sample21() {
const navigate= useNavigate();
const [payrollfinalsettlement,setPayRollFinalSettlement]=useState([])
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [referenceNo,setReferenceNo]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [joiningDate,setJoiningDate]=useState("")
const [lastWorkingDate,setLastWorkingDate]=useState([])
const [serviceYear,setServiceYear]=useState("")
const [grauityAmount,setGrauityAmount]=useState("")
const [pfAmount,setPfAmount]=useState("")
const [encashmentAmount,setEncashmentAmount]=useState([])
const [loanAmount,setLoanAmount]=useState("")
const [deductSalaryAmount,setDeductSalaryAmount]=useState("")
const [finalAmount,setFinalAmount]=useState("")
const [status,setStatus]=useState("")


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
        pnCompanyId: company ,
        pnBranchId: branch,
        referenceNo: referenceNo,
        pnEmployeeId: pnEmployeeId,
        joiningDate: joiningDate,
        serviceYear:  serviceYear,
        lastWorkingDate:  lastWorkingDate,
        grauityAmount: grauityAmount,
        pfAmount: pfAmount,
        encashmentAmount: encashmentAmount,
        loanAmount: loanAmount,
        deductSalaryAmount: deductSalaryAmount,
        finalAmount: finalAmount,
        status: status
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>PayrollFinalSettlements</Typography>
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
                



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="referenceNo"
                 
                  label="referenceNo"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setReferenceNo(e.target.value)} 

                />
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



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="joiningDate"
                 
                  label="joiningDate"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setJoiningDate(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "serviceYear"
                 
                  label="serviceYear"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setServiceYear(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name=" lastWorkingDate"
                 
                  label=" lastWorkingDate"
                  variant="outlined"
                 
                  fullWidth
                  required
                  onChange={(e) => setLastWorkingDate(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>

                


                 <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "encashmentAmount"
                 
                  label="encashmentAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setEncashmentAmount(e.target.value)} 

                />
                </FormControl>
                </Grid>

               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "grauityAmount"
                 
                  label="grauityAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setGrauityAmount(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "pfAmount"
                 
                  label="pfAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setPfAmount(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "encashmentAmount"
                 
                  label="encashmentAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setEncashmentAmount(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "loanAmount"
                 
                  label="loanAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setLoanAmount(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "deductSalaryAmount"
                 
                  label="deductSalaryAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setDeductSalaryAmount(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "finalAmount"
                 
                  label="finalAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setFinalAmount(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "status"
                 
                  label="status"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setStatus(e.target.value)} 

                />
                </FormControl>
                </Grid>


              
        </Grid>
        <Grid container spacing={1} paddingTop={'10px'}>
            
            <Grid item xs ={12} align="right" >
              <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
const formData = {
        pnCompanyId: company ,
        pnBranchId: branch,
        referenceNo: referenceNo,
        pnEmployeeId: pnEmployeeId,
        joiningDate: joiningDate,
        serviceYear:  serviceYear,
        lastWorkingDate:  lastWorkingDate,
        grauityAmount: grauityAmount,
        pfAmount: pfAmount,
        encashmentAmount: encashmentAmount,
        loanAmount: loanAmount,
        deductSalaryAmount: deductSalaryAmount,
        finalAmount: finalAmount,
        status: status
};
console.log(formData)
postRequest(ServerConfig.url,PAYROLLFINALSETTLEMENT,formData).then((e)=>{
console.log(e)
navigate('/PayrollFinalSettlemetTable')
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

