import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMBANK } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function PaybankForm() {
const navigate= useNavigate();
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [vBankName,setVBankName]=useState([])
const [vBankCode,setVBankCode]=useState("")
const [status,setStatus]=useState("")
const [branchName,setBranchName]=useState("")
const [accountType,setAccountType]=useState([])
const [micrCode,setMicrCode]=useState("")
const [ifscCode,setIfscCode]=useState("")
const [address,setAddress]=useState("")
const [others,setOthers]=useState("")




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
  empcode: employeeCode,
  empName: employeeName,
  vBankName:vBankName ,
  vBankCode:vBankCode ,
  status:status,
  branchName:branchName ,
  accountType:accountType,
  micrCode:micrCode,
  ifscCode:ifscCode ,
  address:address ,
  others: others
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>PaybankForm</Typography>
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
         
                
<Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vBankName"
              
                  label="vBankName"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setVBankName(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="vBankCode"
                 
                  label=" vBankCode"
                  variant="outlined"
                
                  fullWidth
                  required
                  onChange={(e) =>  setVBankCode(e.target.value)} 
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

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="branchName"
                 
                  label="branchName"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setBranchName(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="accountType"
                 
                  label="accountType"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setAccountType(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="micrCode"
                 
                  label="micrCode"
                  variant="outlined"
                 
                  fullWidth
                  required
                  onChange={(e) => setMicrCode(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "ifscCode"
                 
                  label="ifscCode"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setIfscCode(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "address"
                 
                  label="address"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setAddress(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "others"
                 
                  label="others"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setOthers(e.target.value)} 

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
  empcode: employeeCode,
  empName: employeeName,
  vBankName:vBankName ,
  vBankCode:vBankCode ,
  status:status,
  branchName:branchName ,
  accountType:accountType,
  micrCode:micrCode,
  ifscCode:ifscCode ,
  address:address ,
  others: others
};
console.log(formData)
postRequest(ServerConfig.url,PAYMBANK,formData).then((e)=>{
console.log(e)
navigate('/PaymBankTable')
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

