import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,FormControl,InputLabel
  } from '@mui/material';

  import {inputpaymEarningsForm} from './paymEarnings';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest ,postRequest} from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMEARNING, PAYMEMPEARNING } from '../../serverconfiguration/controllers';

  

  export default function PaymEarnForm() {

    const navigate = useNavigate();

    const[company,setCompany]=useState([])
    const [branch,setBranch]=useState([])
    const[earnings,setEarnings]=useState([])
    const[pnCompanyId,setPnCompanyId]=useState("")
    const[vEarningsCode,setVEarningsCode]=useState("")
    const[vEarningsName,setVEarningsName]=useState("")
    const[cRegular,setCRegular]=useState("")
    const[cPf,setCPf]=useState("")
    const[cEsi,setCEsi]=useState("")
    const[cOt,setCOt]=useState("")
    const[cLop,setCLop]=useState("")
    const[cPt,setCPt]=useState("")
    const[cPrint,setCPrint]=useState("")
    const[payslip,setPayslip]=useState("")
    const[status,setStatus]=useState("")
    const[dOrder,setDOrder]=useState("")
    const[pnBranchId,setPnBranchId]=useState("")
  

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
        <Typography variant='h5' color='S- Light' align='center'>DEPARTMENT</Typography>
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
              name="vEarningsCode"
                  label="vEarningsCode"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setVEarningsCode(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vEarningsName"
                  label="vEarningsName"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setVEarningsName(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="cRegular"
                  label="cRegular"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCRegular(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="cPf"
                  label="cPf"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCPf(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="cEsi"
                  label="cEsi"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCEsi(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="cOt"
                  label="cOt"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCOt(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="cLop"
                  label="cLop"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCLop(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

               

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="cPt"
                  label="cPt"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCPt(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="cPrint"
                  label="cPrint"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCPrint(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="payslip"
                  label="payslip"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setPayslip(e.target.value)} 
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
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="dOrder"
                  label="dOrder"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setDOrder(e.target.value)} 
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
                
                
                <Grid container spacing={1} paddingTop={'10px'}>
            
            <Grid item xs ={12} align="right" >
              <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
const formData = {
  pnCompanyId: pnCompanyId,
  vEarningsCode:vEarningsCode,
  vEarningsName:vEarningsName,
  cRegular:cRegular,
  cPf:cPf,
  cEsi:cEsi,
  cOt:cOt,
  cLop:cLop,
  cPt:cPt,
  cPrint:cPrint,
  payslip:payslip,
  status: status,
  dOrder:dOrder,
  pnBranchId: pnBranchId,
  pnCompany:{
    "pnCompanyId":pnCompanyId 
   
  
    
  }
};
console.log(formData)
postRequest(ServerConfig.url,PAYMEARNING, formData).then((e)=>{
console.log(e)
navigate('/PaymEarnTable')
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