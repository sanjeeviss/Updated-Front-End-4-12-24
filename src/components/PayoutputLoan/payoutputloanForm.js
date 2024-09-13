import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMPAYOUTPUTLOAN,PAYMLOAN,LOANENTRY } from '../../serverconfiguration/controllers';
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
  const [paymLoan,setPaymLoan]=useState([])
  const [pnLoanid,setLoanId]=useState("")
  const [loanEntry,setLoanEntry]=useState([])
  const [loanAppid,setLoanAppId]=useState([])
  const [dDate,setDdate]=useState("")
  const [dFromDate,setDfromDate]=useState("")
  const [dToDate,setDtoDate]=useState("")
  const [amount,setAmount]=useState("")
  const [countInstallement,setCountInstallement]=useState("")
  const [installementCount,setInstallementCount]=useState("")
  const [instalAmt,setInstalAmt]=useState("")
  const [balanceAmt,setBalanceAmt]=useState("")
  const [loanStatus,setLoanStatus]=useState("")
  
  
  
  useEffect(() => {
  async function getData() {
    const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
    setEmployee(data.data);
    const paymloan=await getRequest(ServerConfig.url,PAYMLOAN)
      setPaymLoan(paymloan.data)
    const loanEntry=await getRequest(ServerConfig.url,LOANENTRY)
    setLoanEntry(loanEntry.data)
  }
  getData();
  }, []);
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    pnCompanyId: company,
    pnEmployeeid: pnEmployeeId,
    empcode: employeeCode,
    empName: employeeName,
    pnLoanid: pnLoanid,
    dDate: dDate,
    dFromDate: dFromDate,
    dToDate: dToDate,
    amount: amount,
    countInstallement: countInstallement,
    pnBranchid: branch,
    installementCount: installementCount,
    loanAppid: loanAppid,
    instalAmt: instalAmt,
    balanceAmt: balanceAmt,
    loanStatus: loanStatus
  };
  console.log(formData)
  };
  
    const margin={margin:"0 5px"}
    return (
      <div>
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>PayoutputLoans</Typography>
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
             
              <InputLabel shrink>pnLoanid</InputLabel>
                 <select name = "pnLoanid" 
                 onChange={(e)=>{
                  setLoanId(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {
  
                        paymLoan.map((e)=><option>{e.pnLoanId}</option>)
                        
                     }
                 </select>
              </FormControl >
                  </Grid>

                  <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>loanAppid</InputLabel>
                 <select name = "loanAppid" 
                 onChange={(e)=>{
                  setLoanAppId(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {
  
  loanEntry.map((e)=><option>{e.loanAppid}</option>)
                        
                     }
                 </select>
              </FormControl >
                  </Grid>
                
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="dDate"
                   
                    label="dDate"
                    variant="outlined"
                    type= "datetime-local"
                    fullWidth
                    required
                    onChange={(e) => setDdate(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="dFromDate"
                type= "datetime-local"
                    label="dFromDate"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setDfromDate(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="dToDate"
                   
                    label=" dToDate"
                    variant="outlined"
                    type= "datetime-local"
                    fullWidth
                    required
                    onChange={(e) =>  setDtoDate(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="amount"
                   
                    label="amount"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setAmount(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="countInstallement"
                   
                    label="countInstallement"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setCountInstallement(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="installementCount"
                   
                    label="installementCount"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setInstallementCount(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="instalAmt"
                   
                    label="instalAmt"
                    variant="outlined"
                   
                    fullWidth
                    required
                    onChange={(e) => setInstalAmt(e.target.value)} 
                    
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
                name= "loanStatus"
                   
                    label="loanStatus"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setLoanStatus(e.target.value)} 
  
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
    pnEmployeeid: pnEmployeeId,
    empcode: employeeCode,
    empName: employeeName,
    pnLoanid: pnLoanid,
    dDate: dDate,
    dFromDate: dFromDate,
    dToDate: dToDate,
    amount: amount,
    countInstallement: countInstallement,
    pnBranchid: branch,
    installementCount: installementCount,
    loanAppid: loanAppid,
    instalAmt: instalAmt,
    balanceAmt: balanceAmt,
    loanStatus: loanStatus
  };
  console.log(formData)
  postRequest(ServerConfig.url,PAYMPAYOUTPUTLOAN,formData).then((e)=>{
  console.log(e)
  navigate('/PaympayoutputloanTable')
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
  
  