import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMEMPLOYEE, PAYMPF, PAYMSHIFT } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function Sample23() {
const navigate= useNavigate();
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnCompanyId,setpnCompanyId]=useState("")
const [branchId,setBranchId]=useState("")
const [vShiftName,setVshiftName]=useState("")
const [vShiftFrom,setVshiftFrom]=useState("")
const [vShiftTo,setVshiftTo]=useState("")
const [status,setStatus]=useState("")
const [vShiftCategory,setVshiftCategory]=useState("")


useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
  setCompany(data.data);
  const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
    setBranch(data1.data)
  
}
getData();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
const formData = {
        pnCompanyId: pnCompanyId,
        vShiftName:vShiftName,
        vShiftFrom:   vShiftFrom,
        vShiftTo: vShiftTo,
        status: status,
        branchId:branchId,
        vShiftCategory: vShiftCategory,
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
      <Typography variant='h5' color='S- Light' align='center'>Paym Shift</Typography>
      <form>
     
      <Grid container spacing={2} inputlabelprops={{shrink:true}}>
          <Grid item xs={12} sm={6} >
            <FormControl fullWidth>
           
            <InputLabel shrink>Company</InputLabel>
               <select name = "pnCompanyId" 
               onChange={(e)=>{
                setpnCompanyId(e.target.value)
                
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
               name="pnBranchId"
               onChange={(e)=>{
                setBranchId(e.target.value)
              
               }}
               style={{ height: '50px' }}
               inputlabelprops={{ shrink: true }}
               >
                <option value="">Select</option>
                   {
                     
                        branch.filter((e)=>(e.pnCompanyId == pnCompanyId)).map((e)=><option>{e.pnBranchId}</option>)
                   }
               </select>
               </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vShiftName"
                 
                  label="vShiftName"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setVshiftName(e.target.value)} 
                  InputLabelProps={{shrink:true}}
                  
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vShiftFrom"
                 
                  label="vShiftFrom"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setVshiftFrom(e.target.value)} 
                  InputLabelProps={{shrink:true}}
                  
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vShiftTo"
                 
                  label="vShiftTo"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setVshiftTo(e.target.value)} 
                  InputLabelProps={{shrink:true}}
                  
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
                  InputLabelProps={{shrink:true}}
                  
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vShiftCategory"
                 
                  label="vShiftCategory"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setVshiftCategory(e.target.value)} 
                  InputLabelProps={{shrink:true}}
                  
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
        vShiftName:vShiftName,
        vShiftFrom:   vShiftFrom,
        vShiftTo: vShiftTo,
        status: status,
        branchId:branchId,
        vShiftCategory: vShiftCategory,
        pnCompany:{
          "pnCompanyId":pnCompanyId 
        }
};
console.log(formData)
postRequest(ServerConfig.url,PAYMSHIFT,formData).then((e)=>{
console.log(e)
navigate('/PaymshiftTable')
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

