import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, LOANENTRY, LOANPOST } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function LoanPostForm() {
  const navigate = useNavigate();

const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [LoanEntry,setLoanEntry]=useState([])
const [loanAppid,setLoanAppId]=useState("")
const [loanReqno,setLoanReqno]=useState("")
const [reqDate,setReqDate]=useState("")
const [loanType,setLoanType]=useState("")  
const [loanName,setLoanName]=useState("")
const [loanAmount,setLoanAmount]=useState("")
const [monthToPosted,setMonthToPosted]=useState("")
const [monthPostedOn,setMonthPostedOn]=useState("")
const [remMonth,setRemMonth]=useState("")
const [postedamt,setPostedamt]=useState("")
const [balanceAmt,setBalanceAmt]=useState("")
const [approveBy,setApproveBy]=useState("")







useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  setEmployee(data.data);
  const LoanEntry=await getRequest(ServerConfig.url,LOANENTRY)
    setLoanEntry(LoanEntry.data)
}
getData();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  employeeid: pnEmployeeId,
  empcode: employeeCode,
  employeename: employeeName,
  loanReqno: loanReqno,
  reqDate: reqDate,
  loanAppid: loanAppid,
  loanType:   loanType,
  loanName: loanName,
  loanAmount: loanAmount,
  monthToPosted: monthToPosted,
  monthPostedOn: monthPostedOn,
  remMonth:  remMonth,
  postedamt:  postedamt,
  balanceAmt:  balanceAmt,
  approveBy: approveBy
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>Loan Post</Typography>
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
           
            <InputLabel shrink>LoanId</InputLabel>
               <select name = "loanAppid" 
               onChange={(e)=>{
                setLoanAppId(e.target.value)
                
               }}
               style={{ height: '50px' }}
              
               >
                <option value="">Select</option>
                   {

                      LoanEntry.map((e)=><option>{e.loanAppid}</option>)
                      
                   }
               </select>
            </FormControl >
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="loanReqno"
                  label="loanReqno"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setLoanReqno(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


<Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="reqDate"
              label="reqDate"
                  variant="outlined"
                  type='datetime-local'
                  fullWidth
                  required
                  onChange={(e) => setReqDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="loanType"
                 
                  label="loanType"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) =>  setLoanType(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="loanName"
                 
                  label="loanName"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) =>  setLoanName(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="loanAmount"
                 
                  label="loanAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setLoanAmount (e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="monthToPosted"
                 
                  label="monthToPosted"
                  variant="outlined"
                  type='datetime-local'
                  fullWidth
                  required
                  onChange={(e) => setMonthToPosted(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 


                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="monthPostedOn"
                 
                  label="monthPostedOn"
                  variant="outlined"
                  type='datetime-local'
                  InputLabelProps={{ shrink: true }} 

                  fullWidth
                  required
                  onChange={(e) =>setMonthPostedOn(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="remMonth"
                 
                  label="remMonth"
                  variant="outlined"
                 
                  fullWidth
                  required
                  onChange={(e) => setRemMonth(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "postedamt"
                 
                  label="postedamt"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setPostedamt(e.target.value)} 

                />
                </FormControl>
                </Grid>

                
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "balanceAmt"
                 
                  label="balanceAmt"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setBalanceAmt(e.target.value)} 

                />
                </FormControl>
                </Grid>

                
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "approveBy"
                 
                  label="approveBy"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setApproveBy(e.target.value)} 

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
  employeeid: pnEmployeeId,
  empcode: employeeCode,
  employeename: employeeName,
  loanReqno: loanReqno,
  reqDate: reqDate,
  loanAppid: loanAppid,
  loanType:   loanType,
  loanName: loanName,
  loanAmount: loanAmount,
  monthToPosted: monthToPosted,
  monthPostedOn: monthPostedOn,
  remMonth:  remMonth,
  postedamt:  postedamt,
  balanceAmt:  balanceAmt,
  approveBy: approveBy
};
console.log(formData)
postRequest(ServerConfig.url, LOANPOST, formData).then((e)=>{
console.log(e)
navigate('/LoanPostTable')
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

