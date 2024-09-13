import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,
    FormControl
  } from '@mui/material';

  import {inputpaymDeductionForm} from './paymDeduction';

  import { useState, useEffect } from 'react';
  import { PAYMEMPLOYEE, LOANENTRY, LOANPOST, PAYMDESIGNATION, PAYMCOMPANIES, PAYMDEDUCTION } from '../../serverconfiguration/controllers';
  import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
  import {InputLabel} from '@mui/material';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import { useNavigate } from 'react-router-dom';

  export default function DeductionForm() {
    const navigate = useNavigate();

    const [designation,setDesignation]=useState([])
    const [company,setCompany]=useState([])
    const [branch,setBranch]=useState([])
    const [pnCompanyId,setPnCompanyId]=useState("")
    const [pnBranchId,setBranchId]=useState("")
    const [vDeductionCode,setVDeductionCode]=useState("")
    const [vDeductionName,setVDeductionName]=useState("")
    const [cRegular,setCRegular]=useState("")
    const [cPrint,setCPrint]=useState("")
    const [status,setStatus]=useState("")
    const [dOrder,setDOrder]=useState("")



    
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
    pnBranchId: pnBranchId,
    vDeductionCode: vDeductionCode,
    vDeductionName: vDeductionName,
    cRegular: cRegular,
    cPrint: cPrint,
    status: status,
    dOrder: dOrder,
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
        <Typography variant='h5' color='S- Light' align='center'>DEDUCTION</Typography>
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
              name="BranchID"
                  label="BranchID"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setBranchId(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vDeductionCode"
                  label="vDeductionCode"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setVDeductionCode(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vDeductionName"
                  label="vDeductionName"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setVDeductionName(e.target.value)} 
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
                <Grid container spacing={1} paddingTop={'10px'}>
            
            <Grid item xs ={12} align="right" >
              <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
const formData = {
  pnCompanyId: pnCompanyId,
  pnBranchId: pnBranchId,
  vDeductionCode: vDeductionCode,
  vDeductionName: vDeductionName,
  cRegular: cRegular,
  cPrint: cPrint,
  status: status,
  dOrder: dOrder,
  pnCompany:{
    "pnCompanyId":pnCompanyId 
  }
};
console.log(formData)
postRequest(ServerConfig.url,PAYMDEDUCTION, formData).then((e)=>{
console.log(e)
navigate('/PaymDeductionTable')
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
 