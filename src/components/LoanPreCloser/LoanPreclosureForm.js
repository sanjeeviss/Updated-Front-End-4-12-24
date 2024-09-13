import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,
    FormControl
  } from '@mui/material';

  import { useState, useEffect } from 'react';
  import { PAYMEMPLOYEE, LOANENTRY, LOANPOST, LOANPRECLOSERS, PAYMBRANCHES } from '../../serverconfiguration/controllers';
  import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
  import {InputLabel} from '@mui/material';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import { useNavigate } from 'react-router-dom';
  
  

  export default function LoanPreclosForm() {
  const navigate = useNavigate();
  const [employee,setEmployee]=useState([])
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
  const [pnCompanyId,setPnCompanyId]=useState("")
  const [pnBranchId,setPnBranchId]=useState("")
  const [pnEmployeeId,setPnEmployeeId]=useState("")
  const [loanAppid,setLoanAppid]=useState([])
  const [dDate,setDDate]=useState("")
  const [nLoanamount,setNLoanamount]=useState("")
  const [nBalanceamount,setNBalanceamount]=useState("")
  const [nPaidamount,setNPaidamount]=useState("")  
  const [nClosureamount,setNClosureamount]=useState("")
  const [nCheckno,setNCheckno]=useState("")
  const [dCheckdate,setDCheckdate]=useState("")
  const [nCheckamount,setNCheckamount]=useState("")
  const [vBankname,setVBankname]=useState("")
  const [vRemarks,setVRemarks]=useState("")
  const [cStatus,setCStatus]=useState("")
  const [intAmt,setIntAmt]=useState("")
  const [paymentMode,setPaymentMode]=useState("")
  const [loanProcess,setLoanProcess]=useState("")
  const [loanInterest,setLoanInterest]=useState("")
  const [loanName,setLoanName]=useState("")
  
  
  
  
  
  
  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data.data);
    }
    getData();
  }, []);
  
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    pnCompanyId: pnCompanyId,
    pnBranchId: pnBranchId,
    pnEmployeeId: pnEmployeeId,
    loanAppid: loanAppid,
    dDate: dDate,
    nLoanamount: nLoanamount,
    nBalanceamount: nBalanceamount,
    nPaidamount: nPaidamount,
    nClosureamount:   nClosureamount,
    nCheckno: nCheckno,
    dCheckdate: dCheckdate,
    nCheckamount: nCheckamount,
    vBankname: vBankname,
    vRemarks:  vRemarks,
    cStatus:  cStatus,
    intAmt:  intAmt,
    paymentMode: paymentMode,
    loanProcess: loanProcess,
    loanInterest:  loanInterest,
    loanName:  loanName,
    paymBranch:{
      "pnbranchId":pnBranchId 
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
        <Typography variant='h5' color='S- Light' align='center'>LOAN PRECLOSER</Typography>
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
  
                        branch.map((e)=><option>{e.pnCompanyId}</option>)
                        
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
                  setPnBranchId(e.target.value)
                
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                {
                  branch.map((e)=><option>{e.pnBranchId}</option>)
                }

                 </select>
                 </FormControl>
                  </Grid>
  
                  
  
  
                  <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>pnEmployeeId</InputLabel>
              <TextField 
                 name= "pnEmployeeId"
                 label="pnEmployeeId"
                 variant="outlined"
                 fullWidth
                 required 
                   onChange={(e) => setPnEmployeeId(e.target.value)} 
                   InputLabelProps={{ shrink: true }} 
                   /> 
                 </FormControl>
                  </Grid>
  
            
                 
           
                  <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>LoanId</InputLabel>
              <TextField 
                 name= "loanAppid"
                 label="loanAppid"
                 variant="outlined"
                 fullWidth
                 required 
                   onChange={(e) => setLoanAppid(e.target.value)} 
                   InputLabelProps={{ shrink: true }} 
                   /> 
                
              </FormControl >
                  </Grid>
  
                  <Grid xs={12} sm={6} item  >
                  
                  <FormControl fullWidth>
                 <TextField 
                 name= "dDate"
                 label="dDate"
                 variant="outlined"
                 fullWidth
                 required 
                 type="datetime-local"
                   onChange={(e) => setDDate(e.target.value)} 
                   InputLabelProps={{ shrink: true }}  /> 
                 </FormControl>
                 </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nLoanamount"
                    label="nLoanamount"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setNLoanamount(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nBalanceamount"
                label="nBalanceamount"
                    variant="outlined"
                   
                    fullWidth
                    required
                    onChange={(e) => setNBalanceamount(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nPaidamount"
                   
                    label="nPaidamount"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) =>  setNPaidamount(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nClosureamount"
                   
                    label="nClosureamount"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) =>  setNClosureamount(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nCheckno"
                   
                    label="nCheckno"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) => setNCheckno (e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="dCheckdate"
                   
                    label="dCheckdate"
                    variant="outlined"
                    type='datetime-local'
                    fullWidth
                    
                    required
                    onChange={(e) => setDCheckdate(e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
  
  
                  />
                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="nCheckamount"
                   
                    label="nCheckamount"
                    variant="outlined"
                  
                    InputLabelProps={{ shrink: true }} 
  
                    fullWidth
                    required
                    onChange={(e) =>setNCheckamount(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
  
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="vBankname"
                   
                    label="vBankname"
                    variant="outlined"
                   
                    fullWidth
                    required
                    onChange={(e) => setVBankname(e.target.value)} 
                    
                  />
                  </FormControl>
                  </Grid>
                 
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "vRemarks"
                   
                    label="vRemarks"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setVRemarks(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "cStatus"
                   
                    label="cStatus"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setCStatus(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "intAmt"
                   
                    label="intAmt"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setIntAmt(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>

                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "paymentMode"
                   
                    label="paymentMode"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setPaymentMode(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "loanProcess"
                   
                    label="loanProcess"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setLoanProcess(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "loanInterest"
                   
                    label="loanInterest"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setLoanInterest(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name= "loanName"
                   
                    label="loanName"
                    variant="outlined"
                    
                    fullWidth
                    required
                    onChange={(e) =>setLoanName(e.target.value)} 
  
                  />
                  </FormControl>
                  </Grid>
  
                
          </Grid>
          <Grid container spacing={1} paddingTop={'10px'}>
              
              <Grid item xs ={12} align="right" >
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button onClick={()=>{
  const formData = {
    pnCompanyId: pnCompanyId,
    pnBranchId: pnBranchId,
    pnEmployeeId: pnEmployeeId,
    loanAppid: loanAppid,
    dDate: dDate,
    nLoanamount: nLoanamount,
    nBalanceamount: nBalanceamount,
    nPaidamount: nPaidamount,
    nClosureamount:   nClosureamount,
    nCheckno: nCheckno,
    dCheckdate: dCheckdate,
    nCheckamount: nCheckamount,
    vBankname: vBankname,
    vRemarks:  vRemarks,
    cStatus:  cStatus,
    intAmt:  intAmt,
    paymentMode: paymentMode,
    loanProcess: loanProcess,
    loanInterest:  loanInterest,
    loanName:  loanName,
    paymBranch:{
      PnCompany:{
      "pnbranchId":pnBranchId 
    }
  }
  
  };
  console.log(formData)
  postRequest(ServerConfig.url,LOANPRECLOSERS, formData).then((e)=>{
  console.log(e)
  navigate('/LoanPreCloserTable')
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
  
  