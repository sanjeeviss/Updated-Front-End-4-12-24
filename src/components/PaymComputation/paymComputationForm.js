import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,InputLabel,FormControl,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest,postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMCOMPUTATION } from '../../serverconfiguration/controllers';




export default function ComputationForm() {
  const navigate = useNavigate()
  const [company,setCompany]=useState([])
  const [branch,setBranch] =useState([])
  const [computation,setComputation] =useState([])
  const [pnCompanyId,setPnCompanyId] =useState("")
  const [pnBranchId,setPnBranchId] = useState("")
  const [type,setType] = useState("")
  const [pnEarningsCode,setPnEarningsCode] = useState("")
const [value,setValue]=useState("")
  useEffect(()=>{
  async function getData(){
    const data = await getRequest(ServerConfig.url,PAYMCOMPANIES);
    setCompany (data.data);
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

              <Grid  xs={12}  sm={6} item>
                <FormControl fullWidth> 
              <TextField
            name="pnEarningsCode"
                label="pnEarningsCode"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setPnEarningsCode(e.target.value)} 
                InputLabelProps={{ shrink: true }} 
              />
              </FormControl>
              </Grid>
              <Grid  xs={12}  sm={6} item>
                <FormControl fullWidth> 
              <TextField
            name="value"
                label="value"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setValue(e.target.value)} 
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
type: type,
pnEarningsCode: pnEarningsCode,
value:value,
pnCompany:{
  "pnCompanyId":pnCompanyId 
}
};
console.log(formData)
postRequest(ServerConfig.url,PAYMCOMPUTATION, formData).then((e)=>{
console.log(e)
navigate('/PaymComputationtables')
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
